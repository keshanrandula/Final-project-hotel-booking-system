// import Room from "../models/Room.js";
// import Hotel from "../models/Hotel.js";

// // Add Room
// export const addRoom = async (req, res) => {
//   try {
//     const { hotelId, roomNumber, type, price } = req.body;

//     const hotel = await Hotel.findById(hotelId);
//     if (!hotel) return res.status(404).json({ message: "Hotel not found" });

//     const room = await Room.create({
//       hotel: hotelId,
//       roomNumber,
//       type,
//       price,
//     });

//     res.status(201).json({ message: "Room added successfully", room });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all rooms
// export const getRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find().populate("hotel", "name location");
//     res.json(rooms);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


////////



// import Room from "../models/Room.js";
// import Hotel from "../models/Hotel.js";

// export const addRoom = async (req, res) => {
//   try {
//     const { hotelId, roomNumber, category, price } = req.body;

//     const imagePaths = req.files.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     );

//     const room = new Room({
//       hotel: hotelId,
//       roomNumber,
//       category,
//       price,
//       images: imagePaths,
//     });

//     await room.save();
//     res.status(201).json({ message: "Room added successfully", room });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding room", error: error.message });
//   }
// };

// export const getRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find().populate("hotel", "name location");
//     res.json(rooms);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching rooms", error: error.message });
//   }
// };

// //////////////////
// export const getRoomsByHotel = async (req, res) => {
//   try {
//     const { hotelId } = req.params;
//     const rooms = await Room.find({ hotel: hotelId }).populate("hotel", "name location");
//     res.json(rooms);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching rooms", error: error.message });
//   }
// };

//////////////////

// controllers/roomController.js
import Hotel from "../models/Hotel.js";

export const addRoom = async (req, res) => {
  try {
    const { name, type, price, description } = req.body;
    const hotelId = req.params.id;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newRoom = {
      name,
      type,
      price,
      description,
      images,
    };

    hotel.rooms.push(newRoom);
    await hotel.save();

    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
