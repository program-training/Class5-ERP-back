import express from "express";
import {
  handleGetAllProductsReq,
  handleGetProductByIdReq,
} from "../controller/internalController";

const internalRouter = express.Router();

internalRouter.get("/", handleGetAllProductsReq);
internalRouter.get("/:id", handleGetProductByIdReq);
internalRouter.post("/");
internalRouter.put("/:id");
internalRouter.delete(":id");

export default internalRouter;
