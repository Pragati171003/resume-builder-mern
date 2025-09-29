import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch(err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;