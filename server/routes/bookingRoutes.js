

import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById, 
  updateBooking,
  generateInvoice,
  deleteBooking, 
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings 
router.post("/", createBooking);

// GET /api/booking
router.get("/", getAllBookings);

// GET /api/bookings/:id
router.get("/:id", getBookingById);  
// PUT /api/bookings/:id 
router.put("/:id", updateBooking);

// GET /api/bookings/:id/invoice 
router.get("/:id/invoice", generateInvoice);

// DELETE /api/bookings/:id 
router.delete("/:id", deleteBooking);





export default router;
