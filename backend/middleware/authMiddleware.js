const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("⛔ Invalid token");
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const adminOnly = (req, res, next) => {
  console.log("🧪 user in adminOnly:", req.user); // debug line

  if (req.user && req.user.role === "admin") {
    return next();
  }

  console.log("⛔ not admin:", req.user?.role);
  res.status(403).json({ message: "Admin access only" });
};

module.exports = { protect, adminOnly };
