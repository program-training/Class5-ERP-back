import { sendQuery } from "../dal/internalDal";

export const getAllProductsService = async () => {
  try {
    const query = "SELECT * FROM products ";

    const products = await sendQuery(query);
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};
