import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
   updateBooking,
   //////////////////////////////////
  
  
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);       // POST /api/bookings
router.get("/", getAllBookings);       // GET /api/bookings

// GET /api/bookings/:id
router.delete("/:id", deleteBooking);  // DELETE /api/bookings/:id


router.put("/:id", updateBooking);

//////////////////////////




////////////////////////////////////




export default router;

