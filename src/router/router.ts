import express, { Request, Response } from "express";
import productsRouter from "../shop_inventory/routes/shop_inventory";
import routerAuth from "../auth/router/routerAuth";

const router = express.Router();

router.use("/users", routerAuth);
router.use("/shop_inventory", productsRouter);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
