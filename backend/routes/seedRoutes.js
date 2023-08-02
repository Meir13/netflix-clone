import Express from "express";
import Content from "../models/ContentSchema.js";
import User from "../models/UserSchema.js";
import { data } from "../data.js";

export const seedRoutes = Express.Router();

seedRoutes.get("/", async (req, res) => {
  try {
    await Content.deleteMany({});
    await User.deleteMany({});

    const createdContent = await Content.insertMany(data.content);
    const createdUsers = await User.insertMany(data.users);

    res.send({ content: createdContent, users: createdUsers });
  } catch (error) {
    console.log("failed to create " + error);
  }
});
