import express from "express";
import { handleGetAllProductsReq } from "../controller/internalController";

const internalRouter = express.Router();

internalRouter.get("/", handleGetAllProductsReq);

export default internalRouter;
