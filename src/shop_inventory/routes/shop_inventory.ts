import express from "express";
import {
    handleGetProductById
} from "../controllers/productsController";

const router = express.Router();

router.get("/:productId", handleGetProductById);

export default router;
