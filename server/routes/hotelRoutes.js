

// // import express from "express";
// // import { 
// //   addHotel, 
// //   getHotels, 
// //   loginHotel, 
// //   addRoom, 
// //   updateHotel, 
// //   deleteHotel ,
// //   updateRoom,
// //   deleteRoom
// // } from "../controllers/hotelController.js";
// // import { upload } from "../middleware/uploadMiddleware.js";
// // import { protectHotel } from "../middleware/hotelMiddleware.js";
// // import Hotel from "../models/Hotel.js";

// // const router = express.Router();

// // // ✅ Add new hotel
// // router.post("/add", upload.array("images", 5), addHotel);

// // // ✅ Add room to hotel
// // router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);

// // // ✅ Update hotel profile
// // router.put("/:id", protectHotel, upload.array("images", 5), updateHotel);

// // // ✅ Delete hotel profile
// // router.delete("/:id", protectHotel, deleteHotel);

// // // ✅ Login hotel
// // router.post("/login", loginHotel);

// // // ✅ Get all hotels (public - no auth needed)
// // router.get("/", getHotels);

// // // ✅ Get hotel by ID (protected - but allow accessing own hotel)
// // router.get("/:id", protectHotel, async (req, res) => {
// //   try {
// //     // Check if the requested hotel ID matches the logged-in hotel's ID
// //     if (req.hotel._id.toString() !== req.params.id) {
// //       return res.status(403).json({ 
// //         message: "Access denied. You can only view your own hotel profile." 
// //       });
// //     }

// //     const hotel = await Hotel.findById(req.params.id)
// //       .select("-password") // Exclude password
// //       .populate("rooms"); // Populate rooms if needed

// //     if (!hotel) {
// //       return res.status(404).json({ message: "Hotel not found" });
// //     }

// //     res.json(hotel);
// //   } catch (err) {
// //     console.error("Get hotel error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });
// // ////////////////////////////

// // // ✅ Update room
// // router.put(
// //   "/:hotelId/rooms/:roomId",
// //   protectHotel,
// //   upload.array("images", 5),
// //   updateRoom
// // );

// // // ✅ Delete room
// // router.delete(
// //   "/:hotelId/rooms/:roomId",
// //   protectHotel,
// //   deleteRoom
// // );

// // export default router;

// // // hotelRoutes.js - Add these admin routes
// // router.get('/admin/hotels', protectAdmin, getHotels);
// // router.get('/admin/hotels/:id', protectAdmin, getHotelById);
// // router.put('/admin/hotels/:id', protectAdmin, upload.array('images', 5), updateHotel);
// // router.delete('/admin/hotels/:id', protectAdmin, deleteHotel);
// // router.post('/admin/hotels/:id/rooms', protectAdmin, upload.array('images', 5), addRoom);
// // router.put('/admin/hotels/:hotelId/rooms/:roomId', protectAdmin, upload.array('images', 5), updateRoom);
// // router.delete('/admin/hotels/:hotelId/rooms/:roomId', protectAdmin, deleteRoom);


// ///////////////////////////////////


// // import express from "express";
// // import {
// //   addHotel,
// //   getHotels,
// //   loginHotel,
// //   addRoom,
// //   updateHotel,
// //   deleteHotel,
// //   getHotelById,
// // } from "../controllers/hotelController.js";

// // import { upload } from "../middleware/uploadMiddleware.js";
// // import { protectHotel } from "../middleware/hotelMiddleware.js";
// // import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

// // const router = express.Router();

// // /* ===================== PUBLIC ===================== */
// // router.post("/add", upload.array("images", 5), addHotel);
// // router.post("/login", loginHotel);
// // router.get("/", getHotels);

// // /* ===================== ADMIN ===================== */
// // router.get("/:id", protectAdmin, getHotelById);
// // router.put("/:id", protectAdmin, upload.array("images", 5), updateHotel);
// // router.delete("/:id", protectAdmin, deleteHotel);

// // /* ===================== HOTEL ===================== */
// // router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);

// // export default router;

// ////////////////////////////////
// // import express from "express";
// // import { 
// //   addHotel, 
// //   getHotels, 
// //   loginHotel, 
// //   addRoom, 
// //   updateHotel, 
// //   deleteHotel,
// //   updateRoom,
// //   deleteRoom,
// //   getHotelById // Make sure this is imported
// // } from "../controllers/hotelController.js";
// // import { upload } from "../middleware/uploadMiddleware.js";
// // import { protectHotel } from "../middleware/hotelMiddleware.js";
// // import { protectAdmin } from "../middleware/adminAuthMiddleware.js"; // Add this import
// // import Hotel from "../models/Hotel.js";

// // const router = express.Router();

// // /* ===================== PUBLIC ROUTES ===================== */
// // // ✅ Add new hotel
// // router.post("/add", upload.array("images", 5), addHotel);

// // // ✅ Login hotel
// // router.post("/login", loginHotel);

// // // ✅ Get all hotels (public - no auth needed)
// // router.get("/", getHotels);

// // /* ===================== HOTEL-OWNER PROTECTED ROUTES ===================== */
// // // ✅ Get hotel by ID (hotel can view their own profile)
// // router.get("/:id", protectHotel, async (req, res) => {
// //   try {
// //     // Check if the requested hotel ID matches the logged-in hotel's ID
// //     if (req.hotel._id.toString() !== req.params.id) {
// //       return res.status(403).json({ 
// //         message: "Access denied. You can only view your own hotel profile." 
// //       });
// //     }

// //     const hotel = await Hotel.findById(req.params.id)
// //       .select("-password")
// //       .populate("rooms");

// //     if (!hotel) {
// //       return res.status(404).json({ message: "Hotel not found" });
// //     }

// //     res.json(hotel);
// //   } catch (err) {
// //     console.error("Get hotel error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });

// // // ✅ Update hotel profile (hotel can update their own profile)
// // router.put("/:id", protectHotel, upload.array("images", 5), updateHotel);

// // // ✅ Delete hotel profile (hotel can delete their own profile)
// // router.delete("/:id", protectHotel, deleteHotel);

// // // ✅ Add room to hotel (hotel can add rooms to their own hotel)
// // router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);

// // // ✅ Update room (hotel can update their own rooms)
// // router.put(
// //   "/:hotelId/rooms/:roomId",
// //   protectHotel,
// //   upload.array("images", 5),
// //   updateRoom
// // );

// // // ✅ Delete room (hotel can delete their own rooms)
// // router.delete(
// //   "/:hotelId/rooms/:roomId",
// //   protectHotel,
// //   deleteRoom
// // );

// // /* ===================== ADMIN PROTECTED ROUTES ===================== */
// // // ✅ Get all hotels (admin can view all)
// // router.get("/admin/all", protectAdmin, getHotels);

// // // ✅ Get specific hotel (admin can view any)
// // router.get("/admin/:id", protectAdmin, getHotelById);

// // // ✅ Update any hotel (admin can update any hotel)
// // router.put("/admin/:id", protectAdmin, upload.array("images", 5), updateHotel);

// // // ✅ Delete any hotel (admin can delete any hotel)
// // router.delete("/admin/:id", protectAdmin, deleteHotel);

// // // ✅ Add room to any hotel (admin can add rooms to any hotel)
// // router.post("/admin/:id/rooms", protectAdmin, upload.array("images", 5), addRoom);

// // // ✅ Update room in any hotel (admin can update any room)
// // router.put(
// //   "/admin/:hotelId/rooms/:roomId",
// //   protectAdmin,
// //   upload.array("images", 5),
// //   updateRoom
// // );

// // // ✅ Delete room from any hotel (admin can delete any room)
// // router.delete(
// //   "/admin/:hotelId/rooms/:roomId",
// //   protectAdmin,
// //   deleteRoom
// // );

// // export default router;

// ///////////////////////////////////////////////////////////


// import express from "express";
// import { 
//   addHotel, 
//   getHotels, 
//   loginHotel, 
//   addRoom, 
//   updateHotel, 
//   deleteHotel,
//   updateRoom,
//   deleteRoom,
//   getHotelById,
//   getAllRooms
// } from "../controllers/hotelController.js";
// import { upload } from "../middleware/uploadMiddleware.js";
// import { protectHotel } from "../middleware/hotelMiddleware.js";
// import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// /* ===================== PUBLIC ROUTES ===================== */
// router.post("/add", upload.array("images", 5), addHotel);
// router.post("/login", loginHotel);
// router.get("/", getHotels);
// router.get("/:id", getHotelById); // Public access to view hotel details

// /* ===================== HOTEL-OWNER PROTECTED ROUTES ===================== */
// router.put("/:id/update", protectHotel, upload.array("images", 5), updateHotel);
// router.delete("/:id/delete", protectHotel, deleteHotel);
// router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);
// router.put("/:hotelId/rooms/:roomId", protectHotel, upload.array("images", 5), updateRoom);
// router.delete("/:hotelId/rooms/:roomId", protectHotel, deleteRoom);

// /* ===================== ADMIN PROTECTED ROUTES ===================== */
// router.get("/admin/all", protectAdmin, getHotels);
// router.get("/admin/rooms/all", protectAdmin, getAllRooms);
// router.get("/admin/:id", protectAdmin, getHotelById);
// router.put("/admin/:id", protectAdmin, upload.array("images", 5), updateHotel);
// router.delete("/admin/:id", protectAdmin, deleteHotel);
// router.post("/admin/:id/rooms", protectAdmin, upload.array("images", 5), addRoom);
// router.put("/admin/:hotelId/rooms/:roomId", protectAdmin, upload.array("images", 5), updateRoom);
// router.delete("/admin/:hotelId/rooms/:roomId", protectAdmin, deleteRoom);

// export default router;


//////////////////////////////

import express from "express";
import { 
  addHotel, 
  getHotels, 
  loginHotel, 
  addRoom, 
  updateHotel, 
  deleteHotel,
  updateRoom,
  deleteRoom,
  getHotelById,
  getAllRooms
} from "../controllers/hotelController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protectHotel } from "../middleware/hotelMiddleware.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();


router.post("/add", upload.array("images", 5), addHotel);
router.post("/login", loginHotel);
router.get("/", getHotels);
router.get("/:id", getHotelById); 

/* HOTEL-OWNER PROTECTED ROUTES  */
router.put("/:id/update", protectHotel, upload.array("images", 5), updateHotel);
router.delete("/:id/delete", protectHotel, deleteHotel);
router.post("/:id/rooms", protectHotel, upload.array("images", 5), addRoom);
router.put("/:hotelId/rooms/:roomId", protectHotel, upload.array("images", 5), updateRoom);
router.delete("/:hotelId/rooms/:roomId", protectHotel, deleteRoom);

/* ===================== ADMIN PROTECTED ROUTES ===================== */
router.get("/admin/all", protectAdmin, getHotels);
router.get("/admin/rooms/all", protectAdmin, getAllRooms);
router.get("/admin/:id", protectAdmin, getHotelById);
router.put("/admin/:id", protectAdmin, upload.array("images", 5), updateHotel);
router.delete("/admin/:id", protectAdmin, deleteHotel);
router.post("/admin/:id/rooms", protectAdmin, upload.array("images", 5), addRoom);
router.put("/admin/:hotelId/rooms/:roomId", protectAdmin, upload.array("images", 5), updateRoom);
router.delete("/admin/:hotelId/rooms/:roomId", protectAdmin, deleteRoom);

export default router;