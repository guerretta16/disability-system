import * as contentful from "contentful-management";

export const ENVIROMENT = "edu-2023-03-16";
export const SPACE_ID = "1x6nh131tfpa";
const ACCESS_TOKEN = "CFPAT-uAPDVNXvdUWtTXD8fV367hqElNLCP4ZOJmAhQ8raf8w";
export const DEFAULT_LNG = "en-US";

export const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

export const fetchTransformer = (data: any) =>
  data.map((item: any) =>
    Object.keys(item.fields).reduce(
      (prev, key) => ({
        ...prev,
        [key]: item.fields[key][DEFAULT_LNG],
      }),
      { sysId: item.sys.id }
    )
  );
