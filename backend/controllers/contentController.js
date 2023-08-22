import Content from "../models/ContentSchema.js";
import List from "../models/ListSchema.js";

export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.send(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).send("An error occurred while fetching content.");
  }
};

export const getAllLists = async (req, res) => {
  const queryType = req.query.type;
  let lists = [];
  try {
    // const lists = await List.find().populate("content").exec();
    if (queryType) {
      lists = await List.aggregate([{ $match: { type: queryType } }]);
      lists = await List.populate(lists, "content");
    } else {
      lists = await List.find().populate("content").exec();
    }
    res.send(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).send("An error occurred while fetching lists.");
  }
};

export const getRandomContent = async (req, res) => {
  try {
    const randomContent = await Content.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(randomContent[0]);
  } catch (error) {
    console.error("Error fetching random content:", error);
    res.status(500).send("An error occurred while fetching random content.");
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Content.findById(req.params._id);
    res.status(200).send(item);
  } catch (error) {
    console.error("Error fetching item details:" + error);
    res.status(500).send("An error occurred while fetching item details.");
  }
};
