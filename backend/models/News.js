import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, default: "" },
  body: { type: String, default: "" },
  image: { type: String, default: null },
  link: { type: String, default: null },
  source: { type: String, default: "Sport Soccer 2027" },
  isExternal: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model("News", newsSchema);