const mongoose = require("mongoose");

const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: [String],
  chapters: Number,
  description: String,
  coverImage: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Manga", MangaSchema);
