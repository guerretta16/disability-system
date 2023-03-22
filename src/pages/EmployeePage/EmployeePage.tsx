import { ApplicationTable } from "../../modules/components/ApplicationTable";
import { PagesProps } from "../../interfaces/types";
import { Loading } from "../../modules/components/Loading";
import styles from "./employeePage.module.css";
const EmployeePage = ({ data, isLoading, mutateOnDelete, mutateOnCreate }: PagesProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <ApplicationTable
        data={data}
        rowsPerPage={6}
        mutateOnDelete={mutateOnDelete}
        mutateOnCreate={mutateOnCreate}
      />
    </div>
  );
};

export default EmployeePage;
