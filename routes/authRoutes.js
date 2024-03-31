import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  register,
  verifyAccount,
  login,
  user,
} from "../controllers/authController.js";

const router = express.Router();
//Auth Routes
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);

//Vip Area - JWT required
router.get("/user", authMiddleware, user);

export default router;
