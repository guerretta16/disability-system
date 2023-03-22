import { ApplicationValues } from "../interfaces/types";
import {
  client,
  fetchTransformer,
  SPACE_ID,
  ENVIROMENT,
  DEFAULT_LNG
} from "../utils/config";

export const getAllAplicationsByEmployee = async (employeeId: string) => {
  try {
    const applications: any = await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIROMENT))
      .then((enviroment) =>
        enviroment.getPublishedEntries({
          content_type: "application",
          "fields.employeeId.en-US.sys.id": employeeId,
        })
      )
      .then((response) => response);

    const transformedApplication = fetchTransformer(applications.items);
    if (transformedApplication.length > 0) {
      const transformedEmployees = fetchTransformer(
        applications.includes.Entry
      );
      return transformedApplication.map((app: any) => ({
        ...app,
        employee: transformedEmployees.find(
          ({ sysId }: any) => sysId === app.employeeId.sys.id
        ),
      }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
  }
};

export const getAllAplications = async () => {
  try {
    const applications: any = await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIROMENT))
      .then((enviroment) =>
        enviroment.getPublishedEntries({
          content_type: "application",
        })
      )
      .then((response) => response);
    const transformedApplication = fetchTransformer(applications.items);
    if (transformedApplication.length > 0) {
      const transformedEmployees = fetchTransformer(
        applications.includes.Entry
      );
      return transformedApplication.map((app: any) => ({
        ...app,
        employee: transformedEmployees.find(
          ({ sysId }: any) => sysId === app.employeeId.sys.id
        ),
      }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteApplication = async (applicationId: string) => {
  try {
    await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIROMENT))
      .then((enviroment) => enviroment.getEntry(applicationId))
      .then((entry) => {
        entry.unpublish();
      });
  } catch (err) {
    console.error(err);
  }
};

export const createApplication = async (application: ApplicationValues) => {
  try {
    await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIROMENT))
      .then((enviroment) =>
        enviroment.createEntry("application", {
          fields: {
            name: {[DEFAULT_LNG]: application.name},
            applicationId: {[DEFAULT_LNG]: application.applicationId},
            employeeId: {[DEFAULT_LNG]: {sys: {type: "Link", linkType: "Entry", id: application.employeeId}}},
            medicalUnit: {[DEFAULT_LNG]: application.medicalUnit},
            startDate: {[DEFAULT_LNG]: application.startDate},
            endDate: {[DEFAULT_LNG]: application.endDate},
            doctorName: {[DEFAULT_LNG]: application.doctorName},
            medicalDiagnostic: {[DEFAULT_LNG]: application.medicalDiagnostic},
            coverageDays: {[DEFAULT_LNG]: parseInt(application.coverageDays)}
          }
        })
      )
      .then((entry) => {
        entry.publish();
      });
  } catch (err) {
    console.error(err);
  }
};
