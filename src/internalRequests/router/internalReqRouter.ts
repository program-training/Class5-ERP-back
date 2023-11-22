import express from "express";
import {
  handleAddProductReq,
  handleDeleteProductReq,
  handleGetAllProductsReq,
  handleGetProductByIdReq,
  handleUpdateProductReq,
} from "../controller/internalController";
import { requireAuth } from "../../middleware/auth";

const internalRouter = express.Router();

internalRouter.get("/", requireAuth, handleGetAllProductsReq);
internalRouter.get("/:id", requireAuth, handleGetProductByIdReq);
internalRouter.post("/", requireAuth, handleAddProductReq);
internalRouter.put("/:id", requireAuth, handleUpdateProductReq);
internalRouter.delete("/:id", requireAuth, handleDeleteProductReq);

export default internalRouter;
