import { Router } from "express";
import Team from "../models/Team.js";

const router = Router();

// GET /api/teams -> todos los equipos
router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// GET /api/teams/groups -> equipos agrupados por grupo (para Clasificaciones)
router.get("/groups", async (req, res) => {
  const teams = await Team.find();
  const groups = {};
  for (const team of teams) {
    if (!groups[team.group]) groups[team.group] = [];
    groups[team.group].push(team);
  }
  Object.keys(groups).forEach((g) => {
    groups[g].sort((a, b) => b.pts - a.pts || b.dg - a.dg);
  });
  res.json(groups);
});

export default router;
