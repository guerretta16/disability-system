import {
  client,
  fetchTransformer,
  SPACE_ID,
  ENVIROMENT,
} from "../utils/config";

export const loginService = async (username: string, password: string) => {
  const user: any = await client
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENVIROMENT))
    .then((enviroment) =>
      enviroment.getPublishedEntries({
        content_type: "user",
        "fields.username": username,
        "fields.password": password,
      })
    )
    .then((response) => response);
  const transformedUser = fetchTransformer(user.items);
  if (transformedUser.length > 0) {
    const transformedEmployees = fetchTransformer(user.includes.Entry);
    return transformedUser.map((user: any) => ({
      ...user,
      employee: transformedEmployees.find(
        ({ sysId }: any) => sysId === user.employeeId.sys.id
      ),
    }));
  } else {
    return [];
  }
};
