import {
    getProductByIdFromDb
}from "../dal/productsDal";

export const getProductById = async (id: string) => {
    try {
      const product = await getProductByIdFromDb(id);
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
};