import Express, { request } from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import {
  getAllContent,
  getAllLists,
  getFilterContent,
  getItemById,
  getRandomContent,
} from "../controllers/contentController.js";

export const contentRoutes = Express.Router();

contentRoutes.get("/", isAuth, expressAsyncHandler(getAllContent));

contentRoutes.get("/lists", isAuth, expressAsyncHandler(getAllLists));

contentRoutes.get("/random", isAuth, expressAsyncHandler(getRandomContent));

contentRoutes.get("/filter", isAuth, expressAsyncHandler(getFilterContent));

contentRoutes.get("/:_id", isAuth, expressAsyncHandler(getItemById));
