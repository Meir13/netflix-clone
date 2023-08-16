import mongoose, { Schema } from "mongoose";

const ListSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  genre: { type: String, required: true },
  content: [{ type: Schema.Types.ObjectId, ref: "Content", required: true }],
});

const List = mongoose.model("List", ListSchema);
export default List;
