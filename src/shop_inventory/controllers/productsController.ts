import { Request, Response } from "express";
import {handleError} from "../../utils/handleErrors";
import {
    getProductById
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