import jwt from "../utils/jwt.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token);
    req.userId = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};
