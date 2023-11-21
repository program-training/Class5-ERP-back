import { sendQuery } from "../dal/internalDal";
import queries from "../utils/queries";

export const getAllProductsService = async () => {
  try {
    const products = await sendQuery(queries.getAllProductsQ);
    if (!products.length) throw new Error("No products");

    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    if (Number.isNaN(Number(id))) throw new Error("id must be a number");

    const product = await sendQuery(queries.getProductByIdQ + id);
    if (!product.length) throw new Error("Product not found");

    return product;
  } catch (error) {
    return Promise.reject(error);
  }
};
