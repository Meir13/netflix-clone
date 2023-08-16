import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { seedRoutes } from "./routes/seedRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { contentRoutes } from "./routes/contentRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRoutes);
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  })
  .catch((error) => console.log(error));
