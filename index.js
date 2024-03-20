import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";

//Enviroment  variables
dotenv.config();
//Config App
const app = express();
//Read data from body
app.use(express.json());
//Connect to db
db();
//Define Routes
app.use("/api/services", servicesRoutes);
//Define Port
const PORT = process.env.PORT || 4000;
//Run App
app.listen(PORT, () => {
  console.log(colors.blue("The server is running on port:", colors.bold(PORT)));
});
