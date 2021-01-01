export {};
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorid: String,
});

module.exports = mongoose.model("Book", bookSchema);
