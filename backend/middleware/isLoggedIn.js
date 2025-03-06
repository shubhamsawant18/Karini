const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "Access denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Error:", err.message);
        return res.status(401).json({ error: "Unauthorized user" });
      }

      req.user = decoded;  // ✅ Attach user data correctly
      next();
    });

  } catch (e) {
    console.log("Token validation error:", e.message);
    return res.status(500).json({ error: "Server error during token validation" });
  }
};

module.exports = validateToken;
