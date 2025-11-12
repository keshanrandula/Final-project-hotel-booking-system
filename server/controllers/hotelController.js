
// import Hotel from "../models/Hotel.js";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // ✅ Register a new hotel
// export const addHotel = async (req, res) => {
//   try {
//     const { name, description, location, amenities, email, password } = req.body;

//     // Check if email already exists
//     const existingHotel = await Hotel.findOne({ email });
//     if (existingHotel) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Handle image uploads
//     const imagePaths = req.files.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     );

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

// // ✅ Login a hotel
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

//     const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({ message: "Login successful", token, hotel });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

// // ✅ Get all hotels
// export const getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find();
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels", error: error.message });
//   }
// };


// // ✅ Add a room to the hotel
// // ✅ Add a room to the hotel
// export const addRoom = async (req, res) => {
//   try {
//     const hotelId = req.params.id;
//     const { name, type, price, description, available } = req.body;

//     // Verify hotel exists and belongs to logged-in hotel
//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     // Check if the logged-in hotel is the same as the hotel being updated
//     if (hotel._id.toString() !== req.hotel._id.toString()) {
//       return res.status(403).json({ message: "Not authorized to add rooms to this hotel" });
//     }

//     // Handle image uploads
//     const imagePaths = req.files ? req.files.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     ) : [];

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
//       hotel: {
//         id: hotel._id,
//         name: hotel.name,
//         totalRooms: hotel.rooms.length
//       }
//     });
//   } catch (error) {
//     console.error("Add room error:", error);
//     res.status(500).json({ message: "Error adding room", error: error.message });
//   }
// };


//////////////////

import Hotel from "../models/Hotel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register a new hotel
export const addHotel = async (req, res) => {
  try {
    const { name, description, location, amenities, email, password } = req.body;

    // Check if email already exists
    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image uploads
    const imagePaths = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

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

// ✅ Login a hotel
export const loginHotel = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hotel = await Hotel.findOne({ email });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const isMatch = await bcrypt.compare(password, hotel.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token, hotel });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// ✅ Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
};

// ✅ Update hotel profile
export const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { name, description, location, amenities, email } = req.body;

    // Verify hotel exists and belongs to logged-in hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the logged-in hotel is the same as the hotel being updated
    if (hotel._id.toString() !== req.hotel._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this hotel" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== hotel.email) {
      const existingHotel = await Hotel.findOne({ email });
      if (existingHotel) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    // Handle image uploads if new images are provided
    let imagePaths = hotel.images;
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    // Update hotel fields
    const updateData = {
      name: name || hotel.name,
      description: description || hotel.description,
      location: location || hotel.location,
      amenities: amenities ? amenities.split(",") : hotel.amenities,
      email: email || hotel.email,
      images: imagePaths,
    };

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ 
      message: "Hotel updated successfully", 
      hotel: updatedHotel 
    });
  } catch (error) {
    console.error("Update hotel error:", error);
    res.status(500).json({ message: "Error updating hotel", error: error.message });
  }
};

// ✅ Delete hotel profile
export const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;

    // Verify hotel exists and belongs to logged-in hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the logged-in hotel is the same as the hotel being deleted
    if (hotel._id.toString() !== req.hotel._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this hotel" });
    }

    await Hotel.findByIdAndDelete(hotelId);

    res.json({ 
      message: "Hotel deleted successfully" 
    });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ message: "Error deleting hotel", error: error.message });
  }
};

// ✅ Add a room to the hotel
export const addRoom = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { name, type, price, description, available } = req.body;

    // Verify hotel exists and belongs to logged-in hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Check if the logged-in hotel is the same as the hotel being updated
    if (hotel._id.toString() !== req.hotel._id.toString()) {
      return res.status(403).json({ message: "Not authorized to add rooms to this hotel" });
    }

    // Handle image uploads
    const imagePaths = req.files ? req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) : [];

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
      hotel: {
        id: hotel._id,
        name: hotel.name,
        totalRooms: hotel.rooms.length
      }
    });
  } catch (error) {
    console.error("Add room error:", error);
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
};