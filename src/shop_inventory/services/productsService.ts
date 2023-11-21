import {
    getProductByIdFromDb,
    getProductsBySearchFromDb,
    getProductsByIdFromDb
}from "../dal/productsDal";
import { ShopProductInterface } from "../interfaces/shopProductInterface";
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

  }catch (error) {
    return Promise.reject(error);
  }
}


const exportIdsToArray = (products:UpdateProductInterface[]) => {
  const ids = products.map(product => product.productId);
  return ids;
}

const checkQuantity = (productsToUpdate:UpdateProductInterface[],
                       productsToUpdateFromDb:ShopProductInterface[]) => {
    for(let i = 0; i < productsToUpdate.length; i++){
      const productToUpdate = productsToUpdate[i];
      const productFromDb = productsToUpdateFromDb.find(item => item.id === productToUpdate.productId);
      ////// im here!!!!
      // console.log(productToUpdate);
      // console.log(productFromDb);
      
      if(productFromDb!.quantity - productToUpdate.requiredQuantity < 0){
          throw new Error(`not enaugh quantity \nid:${productFromDb?.id} \nname:${productFromDb?.name} \nquantity:${productFromDb?.quantity}`);
      }
    }
}