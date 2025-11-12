


import jwt from "jsonwebtoken";
import Staff from "../models/staff.js";

export const staffProtect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.staff = await Staff.findById(decoded.id).select("-password");
      if (!req.staff) return res.status(401).json({ message: "Staff not found" });

      return next();
    }
    res.status(401).json({ message: "Not authorized, token missing" });
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
