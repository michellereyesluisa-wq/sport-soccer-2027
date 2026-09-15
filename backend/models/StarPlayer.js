import mongoose from "mongoose";

const starPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  iso: { type: String, required: true }, // codigo ISO para la bandera real (flagcdn.com)
  goals: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("StarPlayer", starPlayerSchema);
