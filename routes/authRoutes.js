import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();
//Auth Routes
router.post("/register", register);

export default router;
