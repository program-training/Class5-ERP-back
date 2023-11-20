import express from "express";
import {
    handleGetProductById,
    handleGetProductsBySearch,
    handleUpdateProducts
} from "../controllers/productsController";

const router = express.Router();

router.get("/:productId", handleGetProductById);

router.get("/", handleGetProductsBySearch);

router.post("/updateInventory", handleUpdateProducts);

export default router;
