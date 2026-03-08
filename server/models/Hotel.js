




import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
  description: String,
  images: [String],
}, { timestamps: true }); 

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  images: [String],
  amenities: [String],
  rating: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  
  
  ownerName: { type: String },        // Owner's full name
  ownerPhone: { type: String },       // Owner's contact number
  hotelPhone: { type: String },
  rooms: [roomSchema],
}, { timestamps: true });



export default mongoose.model("Hotel", hotelSchema);