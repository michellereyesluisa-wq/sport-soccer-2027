import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: Map, of: String, required: true }, // { es: "...", en: "...", fr: "...", zh: "...", pt: "..." }
  image: { type: String, default: null },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model("News", newsSchema);
