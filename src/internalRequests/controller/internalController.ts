import { Request, Response } from "express";
import { getAllProductsService } from "../service/internalService";
import { handleError } from "../../utils/handleErrors";

export const handleGetAllProductsReq = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};
