const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    description: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Videos", videoSchema);
