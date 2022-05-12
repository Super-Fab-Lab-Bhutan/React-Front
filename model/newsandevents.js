import mongoose from "mongoose";

const newsandEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.newsandevents ||
  mongoose.model("newsandevents", newsandEventSchema);
