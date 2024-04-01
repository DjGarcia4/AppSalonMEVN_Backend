import express from "express";
import {
  createAppointment,
  getAppointmentById,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createAppointment)
  .get(authMiddleware, getAppointmentById);

export default router;
