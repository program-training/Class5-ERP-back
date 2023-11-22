import { Request, Response, NextFunction } from "express";

export const tokenArray: string = "token";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"];

  if (!authToken) return res.status(401).json({ error: "Unauthorized" });
  if (!tokenArray.includes(authToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
