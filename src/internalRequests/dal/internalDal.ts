import { client } from "../../dbAccess/postgresConnection";
import { insertQGenerator, updateQGenerator } from "../helpers/queryGenerators";
import { productEntriesType } from "../types/productEntriesType";
import queries from "../utils/queries";

export const sendGetAllProductsQuery = async () => {
  try {
    client.connect();
    const data = await client.query(queries.getAllProductsQ);
    client.end();
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendGetProductByIdQuery = async (id: string) => {
  try {
    const data = await client.query(queries.getProductByIdQ + id);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendAddProductQuery = async (
  productEntries: productEntriesType
) => {
  try {
    const query = insertQGenerator(productEntries);
    const data = await client.query(query);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendUpdateProductQuery = async (
  id: string,
  entries: productEntriesType
) => {
  try {
    const query = updateQGenerator(id, entries);
    const data = await client.query(query);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendDeleteProductQuery = async (id: string) => {
  try {
    const deleting = await client.query(
      queries.deleteProductByIdQ + id + "RETURNING *"
    );
    return deleting.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMyProductsQuery = async (by: string) => {
  try {
    const query = `SELECT * FROM products WHERE createdBy ILIKE ${by}`;
    const products = await client.query(query);
    return products.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};
