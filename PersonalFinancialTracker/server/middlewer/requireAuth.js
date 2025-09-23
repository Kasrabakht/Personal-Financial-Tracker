import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;            // you set this in signToken()
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}