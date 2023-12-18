/* eslint-disable @typescript-eslint/no-explicit-any */
import ServerError from "../../utils/serverErrorClass";
import {
  addQuantityToProductsService,
  getProductByIdService,
  getProductsBySearchService,
  updateProductsById,
} from "../services/productsService";

export const getProductById = async (_parent: any, { productId }: any) => {
  try {
    if (Number.isNaN(+productId)) {
      throw new ServerError(404, "Id must be a number");
    }
    const product = await getProductByIdService(productId);
    return product;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProductBySearch = async (_parent: any, { searchText }: any) => {
  try {
    const products = getProductsBySearchService(searchText);
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateProductQuantity = async (_parent: any, { input }: any) => {
  try {
    const response = await updateProductsById(input);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addQuantityToProducts = async (_parent: any, { input }: any) => {
  try {
    await addQuantityToProductsService(input);
    return "All products has update successfuly";
  } catch (error) {
    console.log(error);
    return error;
  }
};
