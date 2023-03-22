import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAllEmployees } from "../../../services/EmployeeService";
import { useQuery } from "@tanstack/react-query";
import { ApplicationValues } from "../../../interfaces/types";
import useUserStore from "../../../hooks/userStoreHook";
import styles from "./applicationForm.module.css";
import { Loading } from "../Loading";
const { v4: uuidv4 } = require("uuid");

interface Props {
  createAppMutate: (formData: ApplicationValues) => void
}

const ApplicationForm = ({createAppMutate}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ApplicationValues>();
  const { userInfo } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ["employeesData"],
    queryFn: getAllEmployees,
  });

  const onSubmit: SubmitHandler<ApplicationValues> = (data) => {
    const formData = {
      ...data,
      applicationId: uuidv4(),
    };
    createAppMutate(formData);
  };

  useEffect(() => {
    reset({
      name: "",
      employeeId: userInfo?.rol === "employee" ? userInfo.employeeId : "",
      medicalUnit: "",
      medicalDiagnostic: "",
      doctorName: "",
      endDate: "",
      startDate: "",
      coverageDays: "",
    });
  }, [isSubmitSuccessful, reset, userInfo?.rol, userInfo?.employeeId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          {data.length > 0 && userInfo?.rol === "hr_specialist" ? (
            <>
              <label className={styles.label}>Select an employee</label>
              <select
                className={styles.input}
                {...register("employeeId", {
                  required: true,
                  validate: (value) => value !== "",
                })}
              >
                {data.map((emp: any) => {
                  return (
                    <option key={emp.sysId} value={emp.sysId}>
                      {emp.fullName}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <input
              type="text"
              {...register("employeeId", { value: userInfo?.employeeId })}
              hidden
            />
          )}
          {errors.employeeId && (
            <span className={styles.error}>Employee is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Application name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className={styles.error}>Application name is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Medical unit"
            {...register("medicalUnit", { required: true })}
          />
          {errors.medicalUnit && (
            <span className={styles.error}>Medical unit is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Doctor name"
            {...register("doctorName", { required: true })}
          />
          {errors.doctorName && (
            <span className={styles.error}>Doctor name is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Start date: </label>
          <input
            className={styles.input}
            type="date"
            {...register("startDate", { required: true })}
          />
          {errors.startDate && (
            <span className={styles.error}>Start date is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>End date: </label>
          <input
            className={styles.input}
            type="date"
            {...register("endDate", {
              required: true,
              validate: (value, formValues) => {
                const start = new Date(formValues.startDate);
                const end = new Date(value);
                return end > start;
              },
            })}
          />
          {errors.endDate && (
            <span className={styles.error}>End date is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="number"
            placeholder="Coverage days"
            {...register("coverageDays", { required: true, validate: (value) => (parseInt(value) > 0) })}
          />
          {errors.coverageDays && (
            <span className={styles.error}>Coverage days are required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <textarea
            className={styles.area}
            placeholder="Medical diagnostic"
            {...register("medicalDiagnostic", { required: true })}
          />
          {errors.medicalDiagnostic && (
            <span className={styles.error}>Medical diagnostic is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input className={styles.button} type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
