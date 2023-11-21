import {
  sendAddProductQuery,
  sendDeleteProductQuery,
  sendGetAllProductsQuery,
  sendGetProductByIdQuery,
  sendUpdateProductQuery,
} from "../dal/internalDal";
import { getArrOfObjEntries } from "../helpers/getArrOfObjEntries";
import { insertQGenerator } from "../helpers/queryGenerators";
import { AdminProductInterface } from "../interfaces/adminProductINterface";

export const getAllProductsService = async () => {
  try {
    const products = await sendGetAllProductsQuery();
    if (!products.length) throw new Error("No products");
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    if (Number.isNaN(Number(id))) throw new Error("id must be a number");

    const product = await sendGetProductByIdQuery(id);
    if (!product.length) throw new Error("Product not found");

    return product;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addNewProductService = async (
  product: Omit<AdminProductInterface, "id">
) => {
  try {
    const entries = getArrOfObjEntries(product);
    const newProduct = await sendAddProductQuery(entries);
    return newProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProductService = async (
  id: string,
  update: Omit<AdminProductInterface, "id">
) => {
  try {
    const entries = getArrOfObjEntries(update);
    const updatedProduct = await sendUpdateProductQuery(id, entries);
    return updatedProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductByIdService = async (id: string) => {
  try {
    const deleting = await sendDeleteProductQuery(id);
    if (!deleting.length) throw new Error("product not found");
    return deleting;
  } catch (error) {
    return Promise.reject(error);
  }
};
