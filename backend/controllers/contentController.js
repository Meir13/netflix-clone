import Content from "../models/ContentSchema.js";
import List from "../models/ListSchema.js";
import User from "../models/UserSchema.js";

export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.send(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.send("An error occurred while fetching content.");
  }
};

export const getAllLists = async (req, res) => {
  const queryType = req.query.type;
  let lists = [];

  try {
    if (queryType) {
      lists = await List.aggregate([{ $match: { type: queryType } }]);
      lists = await List.populate(lists, "content");
    } else {
      lists = await List.find().populate("content").exec();
    }
    const user = await User.findById(req.user._id);
    if (user) {
      await user.populate("favoritesList");
      lists.unshift({ title: "My favorites", content: user.favoritesList });
    }

    res.send(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.send("An error occurred while fetching lists.");
  }
};

export const getRandomContent = async (req, res) => {
  try {
    const randomContent = await Content.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(randomContent[0]);
  } catch (error) {
    console.error("Error fetching random content:", error);
    res.send("An error occurred while fetching random content.");
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Content.findById(req.params._id);
    res.status(200).send(item);
  } catch (error) {
    console.error("Error fetching item details:" + error);
    res.send("An error occurred while fetching item details.");
  }
};

export const getFilterContent = async (req, res) => {
  const query = req.query.query;

  try {
    let content = await Content.find({
      title: { $regex: query, $options: "i" },
    });

    content = [
      ...content,
      ...(await Content.find({ genre: { $regex: query, $options: "i" } })),
    ];

    const uniqueArr = content.filter(function (item, index) {
      return (
        index ===
        content.findIndex(function (obj) {
          return item.id === obj.id;
        })
      );
    });

    res.send(uniqueArr);
  } catch (error) {
    console.error("Error fetching filter content:" + error);
    res.send("An error occurred while fetching filter content.");
  }
};
