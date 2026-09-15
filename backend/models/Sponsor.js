import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, default: null },
  tier: { type: String, enum: ["official", "gold", "silver"], default: "official" },
});

export default mongoose.model("Sponsor", sponsorSchema);
