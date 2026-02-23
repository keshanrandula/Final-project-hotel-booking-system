// import Booking from "../models/Booking.js";
// ///////////////////////////////////////////
// import PDFDocument from "pdfkit";

// // ✅ Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     const {
//       hotelName,
//       roomName,
//       roomType,
//       pricePerNight,
//       checkIn,
//       checkOut,
//       guests,
//       customerName,
//       customerEmail,
//       customerPhone,
//       totalAmount,
//     } = req.body;

//     const newBooking = new Booking({
//       hotelName,
//       roomName,
//       roomType,
//       pricePerNight,
//       checkIn,
//       checkOut,
//       guests,
//       customerName,
//       customerEmail,
//       customerPhone,
//       totalAmount,
//     });

//     await newBooking.save();
//     res.status(201).json({ message: "Booking created successfully", booking: newBooking });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ message: "Failed to create booking", error: error.message });
//   }
// };

// // ✅ Get all bookings
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
//   }
// };

// // ✅ Get single booking by ID
// export const getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching booking", error: error.message });
//   }
// };

// // ✅ Delete booking
// export const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     res.json({ message: "Booking deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting booking", error: error.message });
//   }
// };
// ///////////////////////////////////////////////////

// // ✅ Update booking (partial update, no validation error)
// export const updateBooking = async (req, res) => {
//   try {
//     console.log("UPDATE HIT", req.params.id, req.body); // Debug log

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },   // Only update fields sent from frontend
//       { new: true, runValidators: false } // Avoid required fields validation
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     console.error("UPDATE ERROR:", error);
//     res.status(500).json({
//       message: "Failed to update booking",
//       error: error.message,
//     });
//   }
// };

// /////////////////////////////////////////////

// export const generateInvoice = async (req, res) => {
//   const booking = await Booking.findById(req.params.id).populate("user");

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   const doc = new PDFDocument();
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

//   doc.pipe(res);

//   doc.fontSize(22).text("Hotel Booking Invoice", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(14).text(`Booking ID: ${booking._id}`);
//   doc.text(`Customer: ${booking.customerName}`);
//   doc.text(`Email: ${booking.customerEmail}`);
//   doc.moveDown();

//   doc.text(`Hotel: ${booking.hotelName}`);
//   doc.text(`Room: ${booking.roomName} (${booking.roomType})`);
//   doc.text(`Check-in: ${booking.checkIn.toDateString()}`);
//   doc.text(`Check-out: ${booking.checkOut.toDateString()}`);
//   doc.moveDown();

//   doc.fontSize(16).text(`Total Amount: Rs. ${booking.totalAmount}`, {
//     align: "right",
//   });

//   doc.end();
// };
//////////////////////////////////////////

import Booking from "../models/Booking.js";
import PDFDocument from "pdfkit";

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

// ✅ Generate invoice for booking (PDF generation)
export const generateInvoice = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

  doc.pipe(res);

  doc.fontSize(22).text("Hotel Booking Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Booking ID: ${booking._id}`);
  doc.text(`Customer: ${booking.customerName}`);
  doc.text(`Email: ${booking.customerEmail}`);
  doc.moveDown();

  doc.text(`Hotel: ${booking.hotelName}`);
  doc.text(`Room: ${booking.roomName} (${booking.roomType})`);
  doc.text(`Check-in: ${booking.checkIn}`);
  doc.text(`Check-out: ${booking.checkOut}`);
  doc.moveDown();

  doc.fontSize(16).text(`Total Amount: Rs. ${booking.totalAmount}`, { align: "right" });

  doc.end();
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

// ✅ Get booking by ID (fixed missing method)
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Failed to fetch booking", error: error.message });
  }
};

// ✅ Update booking (mark as paid)
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update fields sent from frontend
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

//////////////////////


// ✅ DELETE BOOKING - Add this new method
export const deleteBooking = async (req, res) => {
  try {
    console.log("Attempting to delete booking:", req.params.id);
    
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Booking deleted successfully:", req.params.id);
    res.status(200).json({ 
      message: "Booking deleted successfully",
      booking: deletedBooking 
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ 
      message: "Failed to delete booking", 
      error: error.message 
    });
  }
};