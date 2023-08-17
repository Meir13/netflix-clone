import Express, { request } from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import {
  getAllContent,
  getAllLists,
  getRandomContent,
} from "../controllers/contentController.js";

export const contentRoutes = Express.Router();

contentRoutes.get("/", isAuth, expressAsyncHandler(getAllContent));

contentRoutes.get("/lists", isAuth, expressAsyncHandler(getAllLists));

contentRoutes.get("/random", isAuth, expressAsyncHandler(getRandomContent));
