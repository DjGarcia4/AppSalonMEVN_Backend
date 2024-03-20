import Services from "../models/Services.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createService = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Please fill all fields");
    return res.status(400).json({
      msg: error.message,
    });
  }
  try {
    const service = new Services(req.body);
    await service.save();
    res.json({
      msg: "Service created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};
const getService = async (req, res) => {
  const { id } = req.params;
  //Validate a object id
  if (validateObjectId(id, res)) return;
  // Check if the item exists in the array of items
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("No service found", res);
  }
  res.json(service);
};

const updateService = async (req, res) => {
  const { id } = req.params;
  //Validate a object id
  if (validateObjectId(id, res)) return;
  // Check if the item exists in the array of items
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("No service found", res);
  }
  // Update the data
  service.name = req.body.name || service.name;
  service.price = req.body.price || service.price;
  try {
    await service.save();
    res.json({
      msg: "Service updated",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  //Validate a object id
  if (validateObjectId(id, res)) return;
  // Check if the item exists in the array of items
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("No service found", res);
  }
  try {
    await service.deleteOne();
    res.json({ msg: "Service deleted" });
  } catch (error) {
    console.log(error);
  }
};

export { createService, getServices, getService, updateService, deleteService };
