import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  stadium: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  round: { type: String, default: "Fase de grupos" },
  status: { type: String, enum: ["scheduled", "live", "finished"], default: "scheduled" },
  minute: { type: Number, default: 0 },
});

export default mongoose.model("Match", matchSchema);
