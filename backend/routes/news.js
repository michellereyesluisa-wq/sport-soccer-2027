import { Router } from "express";
import News from "../models/News.js";

const router = Router();

router.get("/", async (req, res) => {
  const news = await News.find().sort({ publishedAt: -1 });
  res.json(news);
});

router.post("/", async (req, res) => {
  const created = await News.create(req.body);
  res.status(201).json(created);
});

export default router;
