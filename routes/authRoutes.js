import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  register,
  verifyAccount,
  login,
  user,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();
//Auth Routes
router.post("/register", register);
router.get("/verify/:token", verifyAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router
  .route("/forgot-password/:token")
  .get(verifyPasswordResetToken)
  .post(updatePassword);
//Vip Area - JWT required
router.get("/user", authMiddleware, user);

export default router;
