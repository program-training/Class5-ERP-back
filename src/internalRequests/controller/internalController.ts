import { Request, Response } from "express";
import {
  getAllProductsService,
  getProductByIdService,
} from "../service/internalService";
import { handleError } from "../../utils/handleErrors";

export const handleGetAllProductsReq = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetProductByIdReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    return res.send(product);
  } catch (error) {
    handleError(res, error);
  }
};
