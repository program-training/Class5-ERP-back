import express from "express";
import {
  handleAddProductReq,
  handleDeleteProductReq,
  handleGetAllProductsReq,
  handleGetProductByIdReq,
  handleUpdateProductReq,
} from "../controller/internalController";

const internalRouter = express.Router();

internalRouter.get("/", handleGetAllProductsReq);
internalRouter.get("/:id", handleGetProductByIdReq);
internalRouter.post("/", handleAddProductReq);
internalRouter.put("/:id", handleUpdateProductReq);
internalRouter.delete("/:id", handleDeleteProductReq);

export default internalRouter;
