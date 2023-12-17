import {
  getMyProductsQuery,
  getProductLogsByIdFromDb,
  sendAddProductQuery,
  sendDeleteProductQuery,
  sendGetAllProductsQuery,
  sendGetProductByIdQuery,
  sendUpdateProductQuery,
  sendUpdateQuantityQuery,
} from "../dal/internalDal";
import { getArrOfObjEntries } from "../helpers/getArrOfObjEntries";
import { AdminProductInterface } from "../interfaces/adminProductINterface";
import jwt, { JwtPayload } from "jsonwebtoken";
import ServerError from "../../utils/serverErrorClass";
import { addProductToRedis, deleteProductRedis, getMyProductsRedis, getProductByIdRedis, getProductsRedis, updateProductRedis } from "../redis/redisProducts";

export const getAllProductsService = async () => {
  try {
    const productsFromRedis = await getProductsRedis();
    if(productsFromRedis?.length !== 0) {
      return productsFromRedis;
    }
    
    const products = await sendGetAllProductsQuery();
    if (!products.length) throw new Error("No products");
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    if (Number.isNaN(+id)) throw new Error("id must be a number");
    const productFromRedis = await getProductByIdRedis(id);

    if(productFromRedis) return productFromRedis;

    const product = await sendGetProductByIdQuery(id);
    if (!product.length) throw new Error("Product not found");

    return product[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addNewProductService = async (
  product: Omit<AdminProductInterface, "id">,
  token: string
) => {
  try {
    const decodedToken = jwt.decode(token);
    const { email } = decodedToken as JwtPayload;
    if (product.name === undefined)
      throw new Error("please provide valid product");
    product.createdBy = email;
    const entries = getArrOfObjEntries(product);
    const newProduct = await sendAddProductQuery(entries);
    await addProductToRedis(newProduct[0] as AdminProductInterface);
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
    await updateProductRedis(updatedProduct[0] as AdminProductInterface);
    return updatedProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductByIdService = async (id: string) => {
  try {    
    const deleting = await sendDeleteProductQuery(id);
    if (!deleting.length) throw new Error("product not found");
    await deleteProductRedis(id);
    return deleting;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMyProductsService = async (token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    const { email } = decodedToken as JwtPayload;
    if (email) {
      const myProductFromRedis = await getMyProductsRedis(email);
      if(myProductFromRedis.length !== 0) return myProductFromRedis;
      const products = await getMyProductsQuery(email);
      return products;
    }
    return [];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateQuantityService = async (id: string, quantity: number) => {
  try {
    const updateProduct = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(sendUpdateQuantityQuery(id, quantity));
      }, 1000);
    });

    return updateProduct;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getQuantityLogsById = async (productId: string | number) => {
  try {
    if (Number.isNaN(+productId))
      throw new ServerError(404, "Id must be a number");

    const productLogs = await getProductLogsByIdFromDb(productId);
    
    return productLogs;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
