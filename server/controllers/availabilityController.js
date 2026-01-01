// import Booking from "../models/Booking.js";
// import Room from "../models/Room.js"; // ඔබට Room model එකක් අවශ්‍ය වේවි

// // ✅ Check room availability
// export const checkAvailability = async (req, res) => {
//   try {
//     const { checkIn, checkOut, roomType, guests } = req.query;

//     // 1. Find all bookings that overlap with requested dates
//     const overlappingBookings = await Booking.find({
//       $or: [
//         // Check-in date falls within existing booking
//         { 
//           checkIn: { $lte: checkIn },
//           checkOut: { $gt: checkIn }
//         },
//         // Check-out date falls within existing booking
//         { 
//           checkIn: { $lt: checkOut },
//           checkOut: { $gte: checkOut }
//         },
//         // Requested dates cover existing booking
//         {
//           checkIn: { $gte: checkIn },
//           checkOut: { $lte: checkOut }
//         }
//       ]
//     });

//     // 2. Get booked room IDs
//     const bookedRoomIds = overlappingBookings.map(booking => booking.roomId);

//     // 3. Find available rooms (not in bookedRoomIds)
//     const query = { _id: { $nin: bookedRoomIds } };

//     if (roomType && roomType !== 'all') {
//       query.type = roomType;
//     }
    
//     if (guests) {
//       query.maxGuests = { $gte: parseInt(guests) };
//     }

//     const availableRooms = await Room.find(query)
//       .populate('hotel', 'name location rating images')
//       .sort({ price: 1 });

//     res.status(200).json({
//       success: true,
//       count: availableRooms.length,
//       data: availableRooms
//     });

//   } catch (error) {
//     console.error("Error checking availability:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };