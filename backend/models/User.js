import mongoose from "mongoose";

// Usuario registrado para la zona de apuestas.
// IMPORTANTE: nunca se guarda el CURP completo en texto plano en produccion real;
// aqui se guarda un hash simple solo para fines escolares/demo.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  curpHash: { type: String, required: true },
  isAdult: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
