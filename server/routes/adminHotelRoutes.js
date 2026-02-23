// // routes/adminHotelRoutes.js
// import express from "express";
// import { 
//   getHotels, 
//   getHotelById, 
//   updateHotel, 
//   deleteHotel,
//   addRoom,
//   updateRoom,
//   deleteRoom
// } from "../controllers/hotelController.js";
// import { upload } from "../middleware/uploadMiddleware.js";
// import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// // Apply admin protection to all routes
// router.use(protectAdmin);

// // ✅ Get all hotels
// router.get("/hotels", getHotels);

// // ✅ Get specific hotel
// router.get("/hotels/:id", getHotelById);

// // ✅ Update any hotel
// router.put("/hotels/:id", upload.array("images", 5), updateHotel);

// // ✅ Delete any hotel
// router.delete("/hotels/:id", deleteHotel);

// // ✅ Add room to any hotel
// router.post("/hotels/:id/rooms", upload.array("images", 5), addRoom);

// // ✅ Update room in any hotel
// router.put("/hotels/:hotelId/rooms/:roomId", upload.array("images", 5), updateRoom);

// // ✅ Delete room from any hotel
// router.delete("/hotels/:hotelId/rooms/:roomId", deleteRoom);

// export default router;