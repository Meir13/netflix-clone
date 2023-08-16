import Express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import {
  getAllContent,
  getAllLists,
} from "../controllers/contentController.js";

export const contentRoutes = Express.Router();

contentRoutes.get("/", isAuth, expressAsyncHandler(getAllContent));

contentRoutes.get("/lists", isAuth, expressAsyncHandler(getAllLists));
