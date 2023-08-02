import { mongoose, Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profilePicture: {
      type: String,
      required: true,
      default: "https://i.pravatar.cc/300",
    },

    isAdmin: { type: Boolean, required: true, default: false },

    watchList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    favoritesList: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  },

  { timeStamps: true }
);

const User = mongoose.model("UserSchema", UserSchema);
export default User;
