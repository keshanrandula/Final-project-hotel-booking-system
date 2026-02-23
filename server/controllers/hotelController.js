
import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ===================== REGISTER HOTEL ===================== */
export const addHotel = async (req, res) => {
  try {
    const { name, description, location, amenities, email, password } = req.body;

    const exists = await Hotel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imagePaths = req.files?.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) || [];

    const hotel = await Hotel.create({
      name,
      description,
      location,
      amenities: amenities ? amenities.split(",") : [],
      email,
      password: hashedPassword,
      images: imagePaths,
    });

    res.status(201).json({ message: "Hotel registered", hotel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== LOGIN HOTEL ===================== */
export const loginHotel = async (req, res) => {
  const { email, password } = req.body;

  const hotel = await Hotel.findOne({ email });
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  const match = await bcrypt.compare(password, hotel.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, hotel });
};

/* ===================== GET HOTELS ===================== */
export const getHotels = async (req, res) => {
  const hotels = await Hotel.find().select("-password");
  res.json(hotels);
};

/* ===================== GET HOTEL BY ID ===================== */
export const getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).select("-password");
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
};

/* ===================== UPDATE HOTEL ===================== */
/* UPDATE HOTEL */
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    res.status(500).json({ message: "Hotel update failed" });
  }
};

/* DELETE HOTEL */
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Hotel delete failed" });
  }
};

// /* ===================== ADD ROOM ===================== */
// export const addRoom = async (req, res) => {
//   const hotel = await Hotel.findById(req.params.id);
//   if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//   const isAdmin = !!req.admin;
//   const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

//   if (!isAdmin && !isOwner) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   hotel.rooms.push(req.body);
//   await hotel.save();

//   res.status(201).json({ message: "Room added", rooms: hotel.rooms });
//};

// /* ===================== UPDATE ROOM ===================== */
// export const updateRoom = async (req, res) => {
//   const { hotelId, roomId } = req.params;
//   const hotel = await Hotel.findById(hotelId);

//   if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//   const isAdmin = !!req.admin;
//   const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

//   if (!isAdmin && !isOwner) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   const room = hotel.rooms.id(roomId);
//   if (!room) return res.status(404).json({ message: "Room not found" });

//   Object.assign(room, req.body);
//   await hotel.save();

//   res.json({ message: "Room updated", room });
// };

// /* ===================== DELETE ROOM ===================== */
// export const deleteRoom = async (req, res) => {
//   const { hotelId, roomId } = req.params;
//   const hotel = await Hotel.findById(hotelId);

//   if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//   const isAdmin = !!req.admin;
//   const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

//   if (!isAdmin && !isOwner) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   hotel.rooms.id(roomId).deleteOne();
//   await hotel.save();

//   res.json({ message: "Room deleted" });
// };


/* ===================== GET ALL ROOMS (ADMIN) ===================== */
export const getAllRooms = async (req, res) => {
  try {
    const hotels = await Hotel.find().select("name rooms");
    const rooms = [];

    hotels.forEach((hotel) => {
      hotel.rooms.forEach((room) => {
        rooms.push({
          ...room.toObject(),
          hotelId: hotel._id,
          hotelName: hotel.name,
        });
      });
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching rooms",
      error: error.message,
    });
  }
};

// ... (keep your existing code, but update these functions)

/* ===================== UPDATE ROOM ===================== */
export const updateRoom = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const isAdmin = !!req.admin;
    const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const room = hotel.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Handle image upload if new images are provided
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      req.body.images = [...(room.images || []), ...imagePaths];
    }

    // Update room fields
    Object.assign(room, req.body);
    await hotel.save();

    res.json({ message: "Room updated", room });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Failed to update room", error: error.message });
  }
};

// /* ===================== DELETE ROOM ===================== */
// export const deleteRoom = async (req, res) => {
//   try {
//     const { hotelId, roomId } = req.params;
//     const hotel = await Hotel.findById(hotelId);

//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     const isAdmin = !!req.admin;
//     const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

//     if (!isAdmin && !isOwner) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     // Check if room has any active bookings
//     const Booking = mongoose.model('Booking');
//     const activeBookings = await Booking.findOne({
//       roomId: roomId,
//       status: { $in: ['confirmed', 'pending'] },
//       checkOut: { $gt: new Date() }
//     });

//     if (activeBookings) {
//       return res.status(400).json({ 
//         message: "Cannot delete room with active bookings" 
//       });
//     }

//     hotel.rooms.id(roomId).deleteOne();
//     await hotel.save();

//     res.json({ message: "Room deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting room:", error);
//     res.status(500).json({ message: "Failed to delete room", error: error.message });
//   }
// };

////////////////////////////////
/* ===================== ADD ROOM ===================== */
export const addRoom = async (req, res) => {
  try {
    console.log("\n=== ADD ROOM DEBUG ===");
    console.log("1. Request params:", req.params);
    console.log("2. Hotel ID from URL:", req.params.id);
    console.log("3. Request body:", req.body);
    console.log("4. Files:", req.files?.length || 0);
    
    const hotelId = req.params.id;
    
    // Check if hotelId is valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      console.log("❌ Invalid MongoDB ID format:", hotelId);
      return res.status(400).json({ 
        message: "Invalid hotel ID format" 
      });
    }

    // Find hotel by ID
    const hotel = await Hotel.findById(hotelId);
    
    if (!hotel) {
      console.log("❌ Hotel not found in database. ID:", hotelId);
      
      // List all hotels to debug
      const allHotels = await Hotel.find({}).select("_id name");
      console.log("Available hotels in DB:", allHotels.map(h => ({
        id: h._id.toString(),
        name: h.name
      })));
      
      return res.status(404).json({ 
        message: "Hotel not found" 
      });
    }

    console.log("✅ Hotel found:", hotel.name);
    console.log("Hotel ID in DB:", hotel._id.toString());
    console.log("Hotel ID from request:", hotelId);
    console.log("Match:", hotel._id.toString() === hotelId);

    // Check authorization
    const isAdmin = !!req.admin;
    const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Process uploaded images
    const imagePaths = req.files?.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) || [];

    // Create room object
    const roomData = {
      name: req.body.name,
      type: req.body.type,
      price: Number(req.body.price),
      description: req.body.description || "",
      available: req.body.available === 'true' || req.body.available === true,
      images: imagePaths
    };

    console.log("📝 Room data to add:", roomData);

    // Add room to hotel
    hotel.rooms.push(roomData);
    await hotel.save();

    console.log("✅ Room added successfully. Total rooms:", hotel.rooms.length);
    console.log("=== END DEBUG ===\n");

    res.status(201).json({ 
      message: "Room added successfully", 
      rooms: hotel.rooms 
    });
  } catch (error) {
    console.error("❌ Error adding room:", error);
    res.status(500).json({ 
      message: "Failed to add room", 
      error: error.message 
    });
  }
};

//////////////////////////////////////////////////////

/* ===================== DELETE ROOM ===================== */
export const deleteRoom = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;
    
    console.log("Attempting to delete room:", { hotelId, roomId });
    
    // Find hotel by ID
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      console.log("Hotel not found:", hotelId);
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check authorization
    const isAdmin = !!req.admin;
    const isOwner = req.hotel && hotel._id.toString() === req.hotel._id.toString();

    if (!isAdmin && !isOwner) {
      console.log("Unauthorized delete attempt");
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Find the room by ID
    const room = hotel.rooms.id(roomId);
    if (!room) {
      console.log("Room not found:", roomId);
      return res.status(404).json({ message: "Room not found" });
    }

    // Remove the room using pull (more reliable than deleteOne)
    hotel.rooms.pull({ _id: roomId });
    await hotel.save();

    console.log("Room deleted successfully:", roomId);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ 
      message: "Failed to delete room", 
      error: error.message 
    });
  }
};