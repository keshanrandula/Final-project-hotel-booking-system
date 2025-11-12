import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  roomName: { type: String, required: true },
  roomType: { type: String },
  pricePerNight: { type: Number, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  guests: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
