import User from "../models/UserSchema.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";

export const signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid username or password" });
};

export const signUp = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  try {
    const user = await newUser.save();
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error) {
    res.send({ message: "Error creating user" });
  }
};

export const addToFavorites = async (req, res) => {
  const userId = req.user._id;
  const contentId = req.body.contentId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const index = user.favoritesList.indexOf(contentId);
    if (index === -1) {
      await user.favoritesList.push(contentId);
    } else {
      await user.favoritesList.splice(index, 1);
    }

    await user.save();
    await user.populate("favoritesList");
    res
      .status(200)
      .send({ title: "My favorites", content: user.favoritesList });
  } catch (error) {
    res.status(500).send({ message: "" + error.message });
  }
};
