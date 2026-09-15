import { Router } from "express";
import Sponsor from "../models/Sponsor.js";

const router = Router();

router.get("/", async (req, res) => {
  const sponsors = await Sponsor.find();
  res.json(sponsors);
});

export default router;
