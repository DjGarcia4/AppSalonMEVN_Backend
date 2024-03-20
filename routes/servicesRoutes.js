import express from "express";
import {
  getServices,
  createService,
  getService,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";

const router = express.Router();

router.route("/").get(getServices).post(createService);

router.route("/:id").get(getService).put(updateService).delete(deleteService);

export default router;
