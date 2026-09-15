import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  iso: { type: String, required: true }, // codigo ISO 3166-1 alpha-2, usado para la bandera real (flagcdn.com)
  group: { type: String, required: true },
  pj: { type: Number, default: 0 },
  dg: { type: Number, default: 0 },
  pts: { type: Number, default: 0 },
});

export default mongoose.model("Team", teamSchema);
