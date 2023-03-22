import { PagesProps } from "../../interfaces/types";
import { ApplicationTable } from "../../modules/components/ApplicationTable";
import { Loading } from "../../modules/components/Loading";
import styles from './hrSpecialist.module.css';

const HrSpecialistPage = ({
  data,
  isLoading,
  mutateOnDelete,
  mutateOnCreate
}: PagesProps) => {
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

export default HrSpecialistPage;
