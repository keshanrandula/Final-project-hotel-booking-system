import Booking from "../models/Booking.js";

// ✅ Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      hotelName,
      roomName,
      roomType,
      pricePerNight,
      checkIn,
      checkOut,
      guests,
      customerName,
      customerEmail,
      customerPhone,
      totalAmount,
    } = req.body;

    const newBooking = new Booking({
      hotelName,
      roomName,
      roomType,
      pricePerNight,
      checkIn,
      checkOut,
      guests,
      customerName,
      customerEmail,
      customerPhone,
      totalAmount,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// ✅ Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ✅ Get single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

// ✅ Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};
