import express from "express";
import { handleUserRegistration } from "../controller/authController";

const router = express.Router();

// router.post("/signin", handleLogin);
router.post("/signup", handleUserRegistration);

export default router;
