

import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,  // Added missing method
  updateBooking,
  generateInvoice,
  deleteBooking, ////////////////////
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings - Create a booking
router.post("/", createBooking);

// GET /api/bookings - Get all bookings
router.get("/", getAllBookings);

// GET /api/bookings/:id - Get a single booking by ID
router.get("/:id", getBookingById);  // Added missing method

// PUT /api/bookings/:id - Update booking (e.g., mark as paid)
router.put("/:id", updateBooking);

// GET /api/bookings/:id/invoice - Generate invoice for booking
router.get("/:id/invoice", generateInvoice);

// DELETE /api/bookings/:id - Delete booking (ADD THIS)
router.delete("/:id", deleteBooking);

//////////////////////////////////////////



export default router;
