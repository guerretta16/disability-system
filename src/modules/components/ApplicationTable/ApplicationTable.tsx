import React, { useState } from "react";
import useTable from "../../../hooks/useTable";
import styles from "./applicationTable.module.css";
import { Pagination } from "../Pagination";
import {
  Application,
  ApplicationTableProps,
  ApplicationValues,
  InputValues,
} from "../../../interfaces/types";
import Swal from "sweetalert2";
import { ApplicationForm } from "../ApplicationForm";
import { Modal } from "../Modal";
import { motion } from "framer-motion";
import { Loading } from "../Loading";

const ApplicationTable = ({
  data,
  rowsPerPage,
  mutateOnDelete,
  mutateOnCreate,
}: ApplicationTableProps) => {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { slice, range } = useTable({ data, page, rowsPerPage });
  const [inputValues, setInputValues] = useState<InputValues>({
    filterBy: "",
    start: "",
    end: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const filterArray = (inputs: InputValues, arr: Application[]) => {
    let results: Application[] = arr;
    if (inputs.filterBy !== "") {
      results = results.filter(
        (p: Application) =>
          p.name.includes(inputs.filterBy) ||
          p.employee.fullName.includes(inputs.filterBy) ||
          p.doctorName.includes(inputs.filterBy) ||
          p.medicalDiagnostic.includes(inputs.filterBy)
      );
    }
    if (inputs.start !== "") {
      let start = new Date(inputs.start);
      results = results.filter((p: Application) => {
        let startTwo = new Date(p.startDate);
        return startTwo >= start;
      });
    }
    if (inputs.end !== "") {
      let end = new Date(inputs.end);
      results = results.filter((p: Application) => {
        let endTwo = new Date(p.endDate);
        return endTwo <= end;
      });
    }
    return results;
  };

  const deleteAlert = (name: string, applicationId: string) => {
     Swal.fire({
      title: `Do you want to delete the application: ${name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateOnDelete.mutate(applicationId);
        Swal.fire("Delete!", "", "success");
      }
    });
  }

  const handleCloseModal = () => setIsOpen(false);

  const createAppMutate = (formData: ApplicationValues) => {
    mutateOnCreate.mutate(formData);
    setIsOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {isOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <ApplicationForm createAppMutate={createAppMutate} />
        </Modal>
      )}
      <div className={styles.tableTop}>
        <button onClick={() => setIsOpen(true)} className={styles.button}>
          Create an Application
        </button>
        <div className={styles.topInfo}>
          <input
            className={styles.input}
            type="text"
            name="filterBy"
            placeholder="Filter by name, employee or doctor name"
            onChange={handleChange}
          />
          <div className={styles.dateFilter}>
            <div className={styles.group}>
              <label className={styles.label}>Start date</label>
              <input
                className={styles.input}
                type="date"
                name="start"
                onChange={handleChange}
              />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>End date</label>
              <input
                className={styles.input}
                type="date"
                name="end"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Medical Unit</th>
              <th className={styles.tableHeader}>Start Date</th>
              <th className={styles.tableHeader}>End Date</th>
              <th className={styles.tableHeader}>Employee</th>
              <th className={styles.tableHeader}>Doctor</th>
              <th className={styles.tableHeader}>Medical Diagnostic</th>
              <th className={styles.tableHeader}>Coverage Days</th>
              <th className={styles.tableHeader}>Option</th>
            </tr>
          </thead>
          <tbody>
            {filterArray(inputValues, slice).map((el: Application) => (
              <tr className={styles.tableRowItems} key={el.sysId}>
                <td className={styles.tableCell}>{el.name}</td>
                <td className={styles.tableCell}>{el.medicalUnit}</td>
                <td className={styles.tableCell}>{el.startDate}</td>
                <td className={styles.tableCell}>{el.endDate}</td>
                <td className={styles.tableCell}>{el.employee.fullName}</td>
                <td className={styles.tableCell}>{el.doctorName}</td>
                <td className={styles.tableCell}>{el.medicalDiagnostic}</td>
                <td className={styles.tableCell}>{el.coverageDays}</td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.tableButton}
                    onClick={() => deleteAlert(el.name, el.sysId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination range={range} slice={slice} setPage={setPage} page={page} />
    </motion.div>
  );
};

export default ApplicationTable;
