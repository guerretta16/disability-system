import { Navigate } from "react-router-dom";
import useUserStore from "../../../hooks/userStoreHook";
import { EmployeePage } from "../../../pages/EmployeePage";
import { HrSpecialistPage } from "../../../pages/HrSpecialistPage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import {
  getAllAplications,
  getAllAplicationsByEmployee,
  deleteApplication,
  createApplication,
} from "../../../services/ApplicationService";
import { ApplicationValues } from "../../../interfaces/types";

const ProtectedComponent = () => {
  const { userInfo } = useUserStore();
  const queryClient = useQueryClient();

  const getQueryApplication = () => {
    if (userInfo !== null) {
      return userInfo.rol === "employee"
        ? getAllAplicationsByEmployee(userInfo.employeeId)
        : userInfo.rol === "hr_specialist" && getAllAplications();
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["applicationData"],
    queryFn: getQueryApplication,
  });

  const mutateOnDelete = useMutation({
    mutationFn: (applicationId: string) => deleteApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["applicationData"]);
    },
  });

  const mutateOnCreate = useMutation({
    mutationFn: (formData: ApplicationValues) => createApplication(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["applicationData"]);
      toast.success("Application created!", {position:"top-right"});
    },
  });

  if (userInfo === null) {
    return <Navigate to="/" replace />;
  } else {
    let component = null;
    switch (userInfo.rol) {
      case "employee":
        component = (
          <>
            {
              <EmployeePage
                data={data}
                isLoading={isLoading}
                mutateOnDelete={mutateOnDelete}
                mutateOnCreate={mutateOnCreate}
              />
            }
          </>
        );
        break;
      case "hr_specialist":
        component = (
          <>
            {
              <HrSpecialistPage
                data={data}
                isLoading={isLoading}
                mutateOnDelete={mutateOnDelete}
                mutateOnCreate={mutateOnCreate}
              />
            }
          </>
        );
        break;
    }
    return component;
  }
};

export default ProtectedComponent;
