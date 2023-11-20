import { Request, Response } from "express";
import {handleError} from "../../utils/handleErrors";
import {
    getProductById,
    getProductsBySearch,
    updateProductsById
}from "../services/productsService";

export const handleGetProductById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await getProductById(productId);
      res.send(product);
    } catch (error) {
      handleError(res, error);
    }
  };

export const handleGetProductsBySearch = async (req: Request, res: Response) => {
  try{
    const query = req.query;
    const searchText = query.searchText as string;
    const products = await getProductsBySearch(searchText);
    res.send(products);
  }catch (error) {
    handleError(res, error);
  }
}

export const handleUpdateProducts = async (req: Request, res: Response) => {
  try{
    const productsToUpdate = req.body;
    updateProductsById(productsToUpdate);
        
  }catch (error) {
    handleError(res, error);
  }
}