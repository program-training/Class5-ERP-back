import { Request, Response } from "express";
import {
  addNewProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
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

export const handleAddProductReq = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const insertProduct = await addNewProductService(product);
    return res.send(insertProduct);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUpdateProductReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await updateProductService(id, data);
    return res.send(updatedProduct);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleDeleteProductReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleting = await deleteProductByIdService(id);
    return res.send(`product ${deleting[0].name} deleted successfully`);
  } catch (error) {
    handleError(res, error);
  }
};
