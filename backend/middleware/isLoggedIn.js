const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  try {
    // Ensure token exists
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, please log in first" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find the user (excluding password)
    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user data to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
