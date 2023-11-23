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
    let products = await getProductsBySearchFromDb(searchText);
    products = products.filter(product => product.quantity > 0);
    return products;
  }catch (error) {
    return Promise.reject(error);
  }
}

export const updateProductsById = async (productsToUpdate: UpdateProductInterface[], action:'-'|'+') => {
  const ids = exportIdsToArray(productsToUpdate);
  
  try {
    const productsToUpdateFromDb = await getProductsByIdFromDb(ids);
    if(action === '-'){
      checkQuantity(productsToUpdate, productsToUpdateFromDb);
    }
    await updateProductsInDb(productsToUpdate, action);
  }catch (error) {
    return Promise.reject(error);
  }
}