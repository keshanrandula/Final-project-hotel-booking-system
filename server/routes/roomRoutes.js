// import express from "express";
// import { addRoom, getRooms } from "../controllers/roomController.js";
// import { staffProtect } from "../middleware/staffMiddleware.js";

// const router = express.Router();

// // Staff must be logged in to add a room
// router.post("/add", staffProtect, addRoom);
// router.get("/", getRooms);
  
// export default router;



////////////

// import express from "express";
// import { addRoom, getRooms } from "../controllers/roomController.js";
// import { upload } from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// router.post("/add", upload.array("images", 5), addRoom);
// router.get("/", getRooms);




// ////////////////////

// router.get("/hotel/:hotelId", async (req, res) => {
//   try {
//     const rooms = await Room.find({ hotelId: req.params.hotelId }).populate("hotel");
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching rooms by hotel" });
//   }
// });


// export default router;



