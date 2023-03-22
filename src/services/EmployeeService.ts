import { client, fetchTransformer, SPACE_ID, ENVIROMENT } from "../utils/config";

export const getAllEmployees = async () => {
    const employees = await client
      .getSpace(SPACE_ID)
      .then((space) => space.getEnvironment(ENVIROMENT))
      .then((enviroment) =>
        enviroment.getPublishedEntries({ content_type: "employee" })
      )
      .then((response) => response);
      return fetchTransformer(employees.items);   
  };
  