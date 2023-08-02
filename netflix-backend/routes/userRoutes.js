import Express from "express";
import expressAsyncHandler from "express-async-handler";
import { signIn, signUp } from "../controllers/userController.js";

const userRoutes = Express.Router();

userRoutes.post("/signin", expressAsyncHandler(signIn));

userRoutes.post("/signup", expressAsyncHandler(signUp));

export default userRoutes;
