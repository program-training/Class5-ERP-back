import { client } from "../../dbAccess/postgresConnection";

export const sendQuery = async (query: string) => {
  try {
    const data = await client.query(query);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
