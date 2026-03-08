import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js"; 
import staffRoutes from "./routes/staffRoutes.js";
// import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
// /import availabilityRoutes from "./routes/availabilityRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Serve uploads folder as static
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes); 
app.use("/api/staff", staffRoutes);
// app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/availability", availabilityRoutes);
app.use("/api/feedback", feedbackRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
