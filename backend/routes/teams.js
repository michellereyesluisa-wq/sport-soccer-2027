import { Router } from "express";
import Team from "../models/Team.js";
import { requireAdmin } from "./admin.js";

const router = Router();

router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.get("/groups", async (req, res) => {
  const teams = await Team.find();
  const groups = {};
  for (const team of teams) {
    if (!groups[team.group]) groups[team.group] = [];
    groups[team.group].push(team);
  }
  Object.keys(groups).forEach((g) => groups[g].sort((a, b) => b.pts - a.pts || b.dg - a.dg));
  res.json(groups);
});

router.post("/", requireAdmin, async (req, res) => {
  const { teamId, name, iso, group, pj, dg, pts } = req.body;
  if (!teamId || !name || !iso || !group) return res.status(400).json({ error: "missing_fields" });
  try {
    const created = await Team.create({ teamId, name, iso, group, pj: pj || 0, dg: dg || 0, pts: pts || 0 });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "could_not_create", detail: err.message });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  const { name, iso, group, pj, dg, pts } = req.body;
  const updated = await Team.findByIdAndUpdate(req.params.id, { name, iso, group, pj, dg, pts }, { new: true });
  if (!updated) return res.status(404).json({ error: "not_found" });
  res.json(updated);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const deleted = await Team.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "not_found" });
  res.json({ ok: true });
});

export default router;