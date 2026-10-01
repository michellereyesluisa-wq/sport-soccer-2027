import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return res.status(500).json({ ok: false, error: "ADMIN_PASSWORD no configurado en el servidor" });
  if (password === real) return res.json({ ok: true });
  return res.status(401).json({ ok: false, error: "wrong_password" });
});

export function requireAdmin(req, res, next) {
  const given = req.header("x-admin-password");
  const real = process.env.ADMIN_PASSWORD;
  if (!real || given !== real) return res.status(401).json({ error: "not_authorized" });
  next();
}

export default router;