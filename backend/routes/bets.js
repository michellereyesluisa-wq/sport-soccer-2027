import { Router } from "express";
import crypto from "crypto";
import User from "../models/User.js";

const router = Router();

const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;

function calculateAgeFromCurp(curp) {
  const yy = parseInt(curp.substring(4, 6), 10);
  const mm = parseInt(curp.substring(6, 8), 10);
  const dd = parseInt(curp.substring(8, 10), 10);
  const currentYearFull = new Date().getFullYear();
  const currentYear2 = currentYearFull % 100;
  const century = yy > currentYear2 ? 1900 : 2000;
  const birthDate = new Date(century + yy, mm - 1, dd);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

// POST /api/bets/verify-curp  { curp }
// Valida formato + edad. No almacena el CURP en texto plano: solo un hash,
// y unicamente si se quiere dejar registro de acceso.
router.post("/verify-curp", async (req, res) => {
  const { curp } = req.body;
  if (!curp || !CURP_REGEX.test(curp.toUpperCase())) {
    return res.status(400).json({ isAdult: false, error: "invalid_format" });
  }
  const age = calculateAgeFromCurp(curp.toUpperCase());
  const isAdult = age >= 18;

  try {
    const curpHash = crypto.createHash("sha256").update(curp.toUpperCase()).digest("hex");
    await User.findOneAndUpdate(
      { curpHash },
      { curpHash, isAdult, username: curpHash.slice(0, 10), passwordHash: "n/a" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (e) {
    // Si Mongo no esta disponible, igual respondemos con el resultado de la validacion
  }

  res.json({ isAdult, age });
});

export default router;
