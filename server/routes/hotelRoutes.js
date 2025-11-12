


// import express from "express";
// import { addHotel, getHotels, loginHotel, addRoom } from "../controllers/hotelController.js";
// import { upload } from "../middleware/uploadMiddleware.js";
// import { protectHotel } from "../middleware/hotelMiddleware.js";
// import Hotel from "../models/Hotel.js";

// const router = express.Router();

// // ✅ Add new hotel
// router.post("/add", upload.array("images", 5), addHotel);

// // ✅ Add room to hotel
// router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);

// // ✅ Login hotel
// router.post("/login", loginHotel);

// // ✅ Get all hotels (public - no auth needed)
// router.get("/", getHotels);

// // ✅ Get hotel by ID (protected - but allow accessing own hotel)
// router.get("/:id", protectHotel, async (req, res) => {
//   try {
//     // Check if the requested hotel ID matches the logged-in hotel's ID
//     if (req.hotel._id.toString() !== req.params.id) {
//       return res.status(403).json({ 
//         message: "Access denied. You can only view your own hotel profile." 
//       });
//     }

//     const hotel = await Hotel.findById(req.params.id)
//       .select("-password") // Exclude password
//       .populate("rooms"); // Populate rooms if needed

//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     res.json(hotel);
//   } catch (err) {
//     console.error("Get hotel error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// export default router;


///////////////////

import express from "express";
import { 
  addHotel, 
  getHotels, 
  loginHotel, 
  addRoom, 
  updateHotel, 
  deleteHotel 
} from "../controllers/hotelController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protectHotel } from "../middleware/hotelMiddleware.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// ✅ Add new hotel
router.post("/add", upload.array("images", 5), addHotel);

// ✅ Add room to hotel
router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);

// ✅ Update hotel profile
router.put("/:id", protectHotel, upload.array("images", 5), updateHotel);

// ✅ Delete hotel profile
router.delete("/:id", protectHotel, deleteHotel);

// ✅ Login hotel
router.post("/login", loginHotel);

// ✅ Get all hotels (public - no auth needed)
router.get("/", getHotels);

// ✅ Get hotel by ID (protected - but allow accessing own hotel)
router.get("/:id", protectHotel, async (req, res) => {
  try {
    // Check if the requested hotel ID matches the logged-in hotel's ID
    if (req.hotel._id.toString() !== req.params.id) {
      return res.status(403).json({ 
        message: "Access denied. You can only view your own hotel profile." 
      });
    }

    const hotel = await Hotel.findById(req.params.id)
      .select("-password") // Exclude password
      .populate("rooms"); // Populate rooms if needed

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (err) {
    console.error("Get hotel error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
