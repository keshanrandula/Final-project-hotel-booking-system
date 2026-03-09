

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
