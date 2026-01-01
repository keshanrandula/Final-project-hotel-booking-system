


// import Hotel from "../models/Hotel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // REGISTER HOTEL
// export const addHotel = async (req, res) => {
//   try {
//     const { name, description, location, amenities, email, password } = req.body;

//     const existingHotel = await Hotel.findOne({ email });
//     if (existingHotel) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const imagePaths = req.files?.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     ) || [];

//     const hotel = new Hotel({
//       name,
//       description,
//       location,
//       amenities: amenities ? amenities.split(",") : [],
//       email,
//       password: hashedPassword,
//       images: imagePaths,
//     });

//     await hotel.save();
//     res.status(201).json({ message: "Hotel registered successfully", hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering hotel", error: error.message });
//   }
// };

// // LOGIN HOTEL
// export const loginHotel = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const hotel = await Hotel.findOne({ email });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     const match = await bcrypt.compare(password, hotel.password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({ message: "Login successful", token, hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

// // GET ALL HOTELS
// export const getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find().select("-password");
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels", error: error.message });
//   }
// };

// // UPDATE HOTEL
// export const updateHotel = async (req, res) => {
//   try {
//     const hotelId = req.params.id;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const { name, description, location, amenities, email } = req.body;

//     if (email && email !== hotel.email) {
//       const exists = await Hotel.findOne({ email });
//       if (exists) return res.status(400).json({ message: "Email already registered" });
//     }

//     let imagePaths = hotel.images;
//     if (req.files?.length > 0) {
//       imagePaths = req.files.map(
//         (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//       );
//     }

//     const updateData = {
//       name: name || hotel.name,
//       description: description || hotel.description,
//       location: location || hotel.location,
//       amenities: amenities ? amenities.split(",") : hotel.amenities,
//       email: email || hotel.email,
//       images: imagePaths,
//     };

//     const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     res.json({ message: "Hotel updated successfully", hotel: updatedHotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating hotel", error: error.message });
//   }
// };

// // DELETE HOTEL
// export const deleteHotel = async (req, res) => {
//   try {
//     const hotelId = req.params.id;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     await Hotel.findByIdAndDelete(hotelId);

//     res.json({ message: "Hotel deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting hotel", error: error.message });
//   }
// };

// // ADD ROOM
// export const addRoom = async (req, res) => {
//   try {
//     const hotelId = req.params.id;
//     const hotel = await Hotel.findById(hotelId);

//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     if (hotel._id.toString() !== req.hotel._id.toString())
//       return res.status(403).json({ message: "Unauthorized" });

//     const { name, type, price, description, available } = req.body;

//     const imagePaths = req.files?.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     ) || [];

//     const newRoom = {
//       name,
//       type,
//       price: Number(price),
//       description,
//       available: available === "true" || available === true,
//       images: imagePaths,
//     };

//     hotel.rooms.push(newRoom);
//     await hotel.save();

//     res.status(201).json({
//       message: "Room added successfully",
//       room: newRoom,
//       totalRooms: hotel.rooms.length,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding room", error: error.message });
//   }
// };


/////////////////////////////////////////////


//  import Hotel from "../models/Hotel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* ================= CREATE HOTEL ================= */
// // REGISTER HOTEL
// export const addHotel = async (req, res) => {
//   try {
//     const { name, description, location, amenities, email, password } = req.body;

//     const existingHotel = await Hotel.findOne({ email });
//     if (existingHotel) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Store relative path to uploads
//     const imagePaths = req.files?.map(
//       (file) => `uploads/${file.filename}`
//     ) || [];

//     const hotel = new Hotel({
//       name,
//       description,
//       location,
//       amenities: amenities ? amenities.split(",").map(a => a.trim()) : [],
//       email,
//       password: hashedPassword,
//       images: imagePaths,
//     });

//     await hotel.save();

//     res.status(201).json({ message: "Hotel registered successfully", hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering hotel", error: error.message });
//   }
// };
// /* ================= LOGIN HOTEL ================= */
// export const loginHotel = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const hotel = await Hotel.findOne({ email });
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     const isMatch = await bcrypt.compare(password, hotel.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: hotel._id, role: "hotel" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       hotel: {
//         id: hotel._id,
//         name: hotel.name,
//         email: hotel.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= GET ALL HOTELS ================= */
// export const getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find().select("-password");
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= GET HOTEL BY ID ================= */
// export const getHotelById = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id).select("-password");
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // /* ================= UPDATE HOTEL ================= */
// // export const updateHotel = async (req, res) => {
// //   try {
// //     const updatedHotel = await Hotel.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         ...req.body,
// //         images: req.files?.map((file) => file.path),
// //       },
// //       { new: true }
// //     ).select("-password");

// //     res.status(200).json(updatedHotel);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };


// export const updateHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     hotel.name = req.body.name || hotel.name;
//     hotel.description = req.body.description || hotel.description;
//     hotel.location = req.body.location || hotel.location;
//     hotel.amenities = req.body.amenities
//       ? req.body.amenities.split(",").map(a => a.trim())
//       : hotel.amenities;

//     // ✅ ONLY update images if new ones uploaded
//     if (req.files && req.files.length > 0) {
//       hotel.images = req.files.map(file => file.path);
//     }

//     const updatedHotel = await hotel.save();
//     res.status(200).json(updatedHotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= DELETE HOTEL ================= */
// export const deleteHotel = async (req, res) => {
//   try {
//     await Hotel.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Hotel deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= ADD ROOM ================= */
// export const addRoom = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     const room = {
//       name: req.body.name,
//       type: req.body.type,
//       price: req.body.price,
//       description: req.body.description,
//       available: true,
//       images: req.files?.map((file) => file.path),
//     };

//     hotel.rooms.push(room);
//     await hotel.save();

//     res.status(201).json({ message: "Room added successfully", room });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



/////////////////////////////////////





// import Hotel from "../models/Hotel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // REGISTER HOTEL
// export const addHotel = async (req, res) => {
//   try {
//     const { name, description, location, amenities, email, password } = req.body;

//     const existingHotel = await Hotel.findOne({ email });
//     if (existingHotel) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const imagePaths = req.files?.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     ) || [];

//     const hotel = new Hotel({
//       name,
//       description,
//       location,
//       amenities: amenities ? amenities.split(",") : [],
//       email,
//       password: hashedPassword,
//       images: imagePaths,
//     });

//     await hotel.save();
//     res.status(201).json({ message: "Hotel registered successfully", hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering hotel", error: error.message });
//   }
// };

// // LOGIN HOTEL
// export const loginHotel = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const hotel = await Hotel.findOne({ email });
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     const match = await bcrypt.compare(password, hotel.password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({ message: "Login successful", token, hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

// // GET ALL HOTELS
// export const getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find().select("-password");
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels", error: error.message });
//   }
// };

// // UPDATE HOTEL
// export const updateHotel = async (req, res) => {
//   try {
//     const hotelId = req.params.id;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const { name, description, location, amenities, email } = req.body;

//     if (email && email !== hotel.email) {
//       const exists = await Hotel.findOne({ email });
//       if (exists) return res.status(400).json({ message: "Email already registered" });
//     }

//     let imagePaths = hotel.images;
//     if (req.files?.length > 0) {
//       imagePaths = req.files.map(
//         (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//       );
//     }

//     const updateData = {
//       name: name || hotel.name,
//       description: description || hotel.description,
//       location: location || hotel.location,
//       amenities: amenities ? amenities.split(",") : hotel.amenities,
//       email: email || hotel.email,
//       images: imagePaths,
//     };

//     const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     res.json({ message: "Hotel updated successfully", hotel: updatedHotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating hotel", error: error.message });
//   }
// };

// // DELETE HOTEL
// export const deleteHotel = async (req, res) => {
//   try {
//     const hotelId = req.params.id;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     await Hotel.findByIdAndDelete(hotelId);

//     res.json({ message: "Hotel deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting hotel", error: error.message });
//   }
// };

// // ADD ROOM
// export const addRoom = async (req, res) => {
//   try {
//     const hotelId = req.params.id;
//     const hotel = await Hotel.findById(hotelId);

//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });
//     if (hotel._id.toString() !== req.hotel._id.toString())
//       return res.status(403).json({ message: "Unauthorized" });

//     const { name, type, price, description, available } = req.body;

//     const imagePaths = req.files?.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     ) || [];

//     const newRoom = {
//       name,
//       type,
//       price: Number(price),
//       description,
//       available: available === "true" || available === true,
//       images: imagePaths,
//     };

//     hotel.rooms.push(newRoom);
//     await hotel.save();

//     res.status(201).json({
//       message: "Room added successfully",
//       room: newRoom,
//       totalRooms: hotel.rooms.length,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding room", error: error.message });
//   }
// };


// // UPDATE ROOM
// export const updateRoom = async (req, res) => {
//   try {
//     const { hotelId, roomId } = req.params;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     // Authorization check
//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const room = hotel.rooms.id(roomId);
//     if (!room) return res.status(404).json({ message: "Room not found" });

//     const { name, type, price, description, available } = req.body;

//     // Update fields
//     room.name = name ?? room.name;
//     room.type = type ?? room.type;
//     room.price = price ?? room.price;
//     room.description = description ?? room.description;
//     room.available =
//       available !== undefined ? available === "true" || available === true : room.available;

//     // Update images if new ones uploaded
//     if (req.files && req.files.length > 0) {
//       room.images = req.files.map(
//         (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//       );
//     }

//     await hotel.save();

//     res.json({ message: "Room updated successfully", room });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating room", error: error.message });
//   }
// };


// // DELETE ROOM
// export const deleteRoom = async (req, res) => {
//   try {
//     const { hotelId, roomId } = req.params;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     // Authorization check
//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const room = hotel.rooms.id(roomId);
//     if (!room) return res.status(404).json({ message: "Room not found" });

//     room.deleteOne();
//     await hotel.save();

//     res.json({ message: "Room deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting room", error: error.message });
//   }
// };

// // Add this function to your hotelController.js if it doesn't exist
// export const getHotelById = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id).select("-password");
    
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
    
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


////////////////////////////////////////////////////////////////

import Hotel from "../models/Hotel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER HOTEL
export const addHotel = async (req, res) => {
  try {
    const { name, description, location, amenities, email, password } = req.body;

    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imagePaths = req.files?.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) || [];

    const hotel = new Hotel({
      name,
      description,
      location,
      amenities: amenities ? amenities.split(",") : [],
      email,
      password: hashedPassword,
      images: imagePaths,
    });

    await hotel.save();
    res.status(201).json({ message: "Hotel registered successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Error registering hotel", error: error.message });
  }
};

// LOGIN HOTEL
export const loginHotel = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hotel = await Hotel.findOne({ email });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const match = await bcrypt.compare(password, hotel.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, hotel });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// GET ALL HOTELS
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().select("-password");
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
};

// GET HOTEL BY ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).select("-password");
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel", error: error.message });
  }
};

// UPDATE HOTEL
export const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Authorization check - only admin or hotel owner can update
    if (req.user?.role !== "admin" && hotel._id.toString() !== req.hotel?._id?.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, description, location, amenities, email } = req.body;

    if (email && email !== hotel.email) {
      const exists = await Hotel.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already registered" });
    }

    let imagePaths = hotel.images;
    if (req.files?.length > 0) {
      imagePaths = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const updateData = {
      name: name || hotel.name,
      description: description || hotel.description,
      location: location || hotel.location,
      amenities: amenities ? amenities.split(",") : hotel.amenities,
      email: email || hotel.email,
      images: imagePaths,
    };

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Error updating hotel", error: error.message });
  }
};

// DELETE HOTEL
export const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Authorization check - only admin or hotel owner can delete
    if (req.user?.role !== "admin" && hotel._id.toString() !== req.hotel?._id?.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Hotel.findByIdAndDelete(hotelId);
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hotel", error: error.message });
  }
};

// ADD ROOM
export const addRoom = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Authorization check
    if (req.user?.role !== "admin" && hotel._id.toString() !== req.hotel?._id?.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, type, price, description, available } = req.body;

    const imagePaths = req.files?.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) || [];

    const newRoom = {
      name,
      type,
      price: Number(price),
      description,
      available: available === "true" || available === true,
      images: imagePaths,
    };

    hotel.rooms.push(newRoom);
    await hotel.save();

    res.status(201).json({
      message: "Room added successfully",
      room: newRoom,
      totalRooms: hotel.rooms.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
};

// UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Authorization check
    if (req.user?.role !== "admin" && hotel._id.toString() !== req.hotel?._id?.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const room = hotel.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { name, type, price, description, available } = req.body;

    // Update fields
    room.name = name ?? room.name;
    room.type = type ?? room.type;
    room.price = price ?? room.price;
    room.description = description ?? room.description;
    room.available =
      available !== undefined ? available === "true" || available === true : room.available;

    // Update images if new ones uploaded
    if (req.files && req.files.length > 0) {
      room.images = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    await hotel.save();
    res.json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error: error.message });
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res) => {
  try {
    const { hotelId, roomId } = req.params;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Authorization check
    if (req.user?.role !== "admin" && hotel._id.toString() !== req.hotel?._id?.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const room = hotel.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.deleteOne();
    await hotel.save();

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
};

// GET ALL ROOMS (Admin)
export const getAllRooms = async (req, res) => {
  try {
    const hotels = await Hotel.find().select("name rooms");
    const allRooms = [];
    
    hotels.forEach(hotel => {
      hotel.rooms.forEach(room => {
        allRooms.push({
          ...room.toObject(),
          hotelId: hotel._id,
          hotelName: hotel.name
        });
      });
    });
    
    res.json(allRooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
};