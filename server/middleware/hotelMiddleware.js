import jwt from "jsonwebtoken";
import Hotel from "../models/Hotel.js";

export const protectHotel = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hotel = await Hotel.findById(decoded.id).select("-password");
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    req.hotel = hotel; // ✅ set hotel for next
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
