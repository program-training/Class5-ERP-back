import express, { Request, Response } from "express";
import productsRouter from "../shop_inventory/routes/shop_inventory";

const router = express.Router();

// router.post("/register", handleUserRegistration);
// router.post("/login", handleLogin);

router.use("/shop_inventory", productsRouter);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
