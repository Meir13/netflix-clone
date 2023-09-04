import Express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addToFavorites,
  signIn,
  signUp,
} from "../controllers/userController.js";
import { isAuth } from "../utils.js";

export const userRoutes = Express.Router();

userRoutes.post("/signin", expressAsyncHandler(signIn));

userRoutes.post("/signup", expressAsyncHandler(signUp));

userRoutes.post("/addToFavorites", isAuth, expressAsyncHandler(addToFavorites));
