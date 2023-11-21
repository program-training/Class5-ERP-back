import {
    getProductByIdFromDb,
    getProductsBySearchFromDb,
    getProductsByIdFromDb,
    updateProductsInDb
}from "../dal/productsDal";
import { exportIdsToArray, checkQuantity } from "../helpers/helpers";
import { UpdateProductInterface } from "../interfaces/updateProductInterface";

export const getProductById = async (id: string) => {
    try {
      const product = await getProductByIdFromDb(id);
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
};

export const getProductsBySearch = async (searchText: string) => {
  try {
    const products = await getProductsBySearchFromDb(searchText);
    return products;
  }catch (error) {
    return Promise.reject(error);
  }
}

export const updateProductsById = async (productsToUpdate: UpdateProductInterface[]) => {
  const ids = exportIdsToArray(productsToUpdate);
  
  try {
    const productsToUpdateFromDb = await getProductsByIdFromDb(ids);
    checkQuantity(productsToUpdate, productsToUpdateFromDb);
    await updateProductsInDb(productsToUpdate);
  }catch (error) {
    return Promise.reject(error);
  }
}
