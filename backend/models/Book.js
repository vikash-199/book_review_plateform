const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  image: String,
  ratings: [Number],
  averageRating: Number,
});
module.exports = mongoose.model("Book", bookSchema);
