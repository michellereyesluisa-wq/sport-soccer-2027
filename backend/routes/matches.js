import { Router } from "express";
import Match from "../models/Match.js";

const router = Router();

// GET /api/matches -> todos los partidos (calendario)
router.get("/", async (req, res) => {
  const matches = await Match.find().sort({ date: 1 });
  res.json(matches);
});

// GET /api/matches/live -> partidos del dia en curso
router.get("/live", async (req, res) => {
  const matches = await Match.find({ status: "live" });
  res.json(matches);
});

export default router;
