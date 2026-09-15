import { Router } from "express";
import StarPlayer from "../models/StarPlayer.js";

const router = Router();

// GET /api/star-players -> top 5 jugadores del ultimo partido
router.get("/", async (req, res) => {
  const players = await StarPlayer.find().sort({ updatedAt: -1 }).limit(5);
  res.json(players);
});

export default router;
