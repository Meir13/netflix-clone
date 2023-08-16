import Express from "express";
import Content from "../models/ContentSchema.js";
import User from "../models/UserSchema.js";
import { data, genres, listMovieNames, listSeriesNames } from "../data.js";
import List from "../models/ListSchema.js";

export const seedRoutes = Express.Router();

seedRoutes.get("/", async (req, res) => {
  try {
    await Content.deleteMany({});
    await User.deleteMany({});
    await List.deleteMany({});

    const createdContent = await Content.insertMany(data.content);
    const createdUsers = await User.insertMany(data.users);

    seedLists(listMovieNames, "movies");
    seedLists(listSeriesNames, "series");

    res.send({ content: createdContent, users: createdUsers });
  } catch (error) {
    console.log("failed to create " + error);
  }
});

const seedLists = async (lists, type) => {
  for (let i = 0; i < lists.length; i++) {
    const newList = await Content.aggregate([
      { $match: { isSeries: type !== "movies" ? true : false } },
      { $sample: { size: 8 } },
    ]);

    const listObject = new List({
      title: lists[i],
      type: type,
      genre: genres[i],
      content: newList.map((e) => e._id),
    });

    await listObject.save();
  }
};
