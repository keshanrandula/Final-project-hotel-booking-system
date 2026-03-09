

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