
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RoomList() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [priceRange, setPriceRange] = useState(10000);
//   const [allBookings, setAllBookings] = useState([]); // Store all bookings

//   const navigate = useNavigate();

//   // Fetch all hotels
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:5000/api/hotels");
//         console.log("Hotels data:", res.data);
//         setHotels(res.data);
//       } catch (err) {
//         console.error("Error fetching hotels:", err);
//         setError("Failed to load hotels. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   // Fetch all bookings to check room status
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/bookings");
//         setAllBookings(res.data);
//         console.log("All bookings:", res.data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // Helper function to check if a room is booked
//   const isRoomBooked = (room) => {
//     if (!allBookings || allBookings.length === 0) return false;
    
//     return allBookings.some(booking => {
//       const roomMatch = booking.roomName === room.name || 
//                        booking.roomId === room._id ||
//                        booking.roomName === room._id;
      
//       return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
//     });
//   };

//   // Get room status
//   const getRoomStatus = (room) => {
//     if (room.available === false) {
//       return {
//         status: 'unavailable',
//         label: 'Not Available',
//         badge: '🔴 Not Available',
//         badgeClass: 'bg-gray-100 text-gray-600'
//       };
//     }
    
//     if (isRoomBooked(room)) {
//       return {
//         status: 'booked',
//         label: 'Booked',
//         badge: '🟡 Booked',
//         badgeClass: 'bg-yellow-100 text-yellow-700'
//       };
//     }
    
//     return {
//       status: 'available',
//       label: 'Available',
//       badge: '🟢 Available',
//       badgeClass: 'bg-green-100 text-green-700'
//     };
//   };

//   // Get hotel booking status
//   const getHotelBookingStatus = (hotel) => {
//     if (!hotel.rooms || hotel.rooms.length === 0) {
//       return {
//         status: 'no_rooms',
//         message: 'No Rooms',
//         badge: '⚪ No Rooms',
//         badgeClass: 'bg-gray-100 text-gray-600'
//       };
//     }

//     const roomStatuses = hotel.rooms.map(room => getRoomStatus(room).status);
//     const availableCount = roomStatuses.filter(s => s === 'available').length;
//     const bookedCount = roomStatuses.filter(s => s === 'booked').length;
//     const unavailableCount = roomStatuses.filter(s => s === 'unavailable').length;

//     // Check if all rooms are booked or unavailable
//     if (availableCount === 0) {
//       if (bookedCount > 0 && unavailableCount > 0) {
//         return {
//           status: 'mixed_full',
//           message: 'Fully Booked/Unavailable',
//           badge: '🔴 Fully Booked',
//           badgeClass: 'bg-red-100 text-red-700',
//           counts: { available: 0, booked: bookedCount, unavailable: unavailableCount }
//         };
//       } else if (bookedCount > 0) {
//         return {
//           status: 'full_booking',
//           message: 'Fully Booked',
//           badge: '🔴 Fully Booked',
//           badgeClass: 'bg-red-100 text-red-700',
//           counts: { available: 0, booked: bookedCount, unavailable: 0 }
//         };
//       } else if (unavailableCount > 0) {
//         return {
//           status: 'all_unavailable',
//           message: 'Not Available',
//           badge: '⚪ Not Available',
//           badgeClass: 'bg-gray-100 text-gray-600',
//           counts: { available: 0, booked: 0, unavailable: unavailableCount }
//         };
//       }
//     }

//     // Some rooms available
//     return {
//       status: 'available',
//       message: 'Rooms Available',
//       badge: '🟢 Available',
//       badgeClass: 'bg-green-100 text-green-700',
//       counts: { available: availableCount, booked: bookedCount, unavailable: unavailableCount }
//     };
//   };

//   // Filter hotels based on search
//   const filteredHotels = hotels.filter(hotel => {
//     const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          hotel.location?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   // Handle view rooms
//   const handleViewRooms = (hotel) => {
//     navigate('/hotelroom', { 
//       state: { 
//         hotel,
//         allBookings 
//       } 
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600 text-lg">Loading hotels...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Stay</h1>
//           <p className="text-gray-600 mt-2">Browse hotels and book rooms that suit your needs</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Search Hotels</label>
//               <input
//                 type="text"
//                 placeholder="Search by hotel name or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               />
//             </div>

//             {/* Room Type Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               >
//                 <option value="all">All Types</option>
//                 <option value="single">Single</option>
//                 <option value="double">Double</option>
//                 <option value="twin">Twin</option>
//                 <option value="suite">Suite</option>
//                 <option value="deluxe">Deluxe</option>
//                 <option value="executive">Executive</option>
//               </select>
//             </div>

//             {/* Price Range */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Price: Rs. {priceRange}
//               </label>
//               <input
//                 type="range"
//                 min="500"
//                 max="10000"
//                 step="100"
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(e.target.value)}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 <span>Rs. 500</span>
//                 <span>Rs. 10,000</span>
//               </div>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-end">
//               <p className="text-gray-600">
//                 {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Hotels List */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {filteredHotels.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🏨</div>
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Hotels Found</h3>
//             <p className="text-gray-600">Try adjusting your search criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredHotels.map((hotel) => {
//               const bookingStatus = getHotelBookingStatus(hotel);
              
//               return (
//                 <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                   {/* Hotel Image */}
//                   {hotel.images && hotel.images.length > 0 ? (
//                     <img
//                       src={hotel.images[0]}
//                       alt={hotel.name}
//                       className="w-full h-48 object-cover"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/400x300?text=Hotel+Image";
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}

//                   {/* Hotel Info */}
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bookingStatus.badgeClass}`}>
//                         {bookingStatus.badge}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 mb-2 flex items-center">
//                       📍 {hotel.location}
//                     </p>
                    
//                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                       {hotel.description}
//                     </p>

//                     {/* Hotel Rating */}
//                     <div className="flex items-center mb-3">
//                       <span className="text-yellow-500">⭐</span>
//                       <span className="text-gray-700 ml-1">
//                         {hotel.rating || "No rating yet"}
//                       </span>
//                     </div>

//                     {/* Room Status Summary */}
//                     {bookingStatus.counts ? (
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {bookingStatus.counts.available > 0 && (
//                           <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                             🟢 {bookingStatus.counts.available} Available
//                           </span>
//                         )}
//                         {bookingStatus.counts.booked > 0 && (
//                           <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
//                             🟡 {bookingStatus.counts.booked} Booked
//                           </span>
//                         )}
//                         {bookingStatus.counts.unavailable > 0 && (
//                           <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
//                             🔴 {bookingStatus.counts.unavailable} Unavailable
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="mb-4">
//                         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
//                           ⚪ No rooms available
//                         </span>
//                       </div>
//                     )}

//                     {/* Price Range */}
//                     {hotel.rooms && hotel.rooms.length > 0 && (
//                       <div className="flex justify-between items-center mb-4">
//                         <span className="text-gray-700 font-bold">
//                           From Rs. {Math.min(...hotel.rooms.map(room => room.price))}
//                         </span>
//                       </div>
//                     )}

//                     {/* View Rooms Button */}
//                     <button
//                       onClick={() => handleViewRooms(hotel)}
//                       className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
//                         bookingStatus.status === 'available'
//                           ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
//                           : bookingStatus.status === 'full_booking'
//                             ? 'bg-red-500 hover:bg-red-600 text-white'
//                             : bookingStatus.status === 'all_unavailable'
//                               ? 'bg-gray-400 text-white cursor-not-allowed'
//                               : 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
//                       }`}
//                     >
//                       {bookingStatus.status === 'full_booking' 
//                         ? '🔴 Fully Booked - View Details' 
//                         : bookingStatus.status === 'all_unavailable'
//                           ? '⚪ Not Available'
//                           : 'View Rooms'}
//                     </button>

//                     {/* Full Booking Message */}
//                     {bookingStatus.status === 'full_booking' && (
//                       <p className="text-red-600 text-xs mt-2 text-center">
//                         All rooms are currently booked. Please check back later.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Booking Statistics */}
//       {allBookings.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="bg-blue-50 rounded-lg p-4">
//             <p className="text-sm text-blue-700">
//               📊 Total Bookings: {allBookings.length} | 
//               Confirmed: {allBookings.filter(b => b.isPaid).length} | 
//               Pending: {allBookings.filter(b => !b.isPaid).length}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//////////////////////////most work code///////////////////
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RoomList() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [priceRange, setPriceRange] = useState(10000);
//   const [allBookings, setAllBookings] = useState([]);

//   const navigate = useNavigate();

//   // Fetch all hotels
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:5000/api/hotels");
//         console.log("✅ Hotels loaded:", res.data);
//         setHotels(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching hotels:", err);
//         setError("Failed to load hotels. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   // Fetch all bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/bookings");
//         setAllBookings(res.data);
//         console.log("✅ Bookings loaded:", res.data);
//       } catch (err) {
//         console.error("❌ Error fetching bookings:", err);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // Check if room is booked
//   const isRoomBooked = (room) => {
//     if (!allBookings || allBookings.length === 0) return false;
    
//     return allBookings.some(booking => {
//       const roomMatch = booking.roomId === room._id || 
//                        booking.roomName === room.name ||
//                        booking.roomId?.toString() === room._id?.toString();
      
//       return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
//     });
//   };

//   // Get room status
//   const getRoomStatus = (room) => {
//     if (room.available === false) {
//       return {
//         status: 'unavailable',
//         label: 'Not Available',
//         badge: '🔴 Not Available',
//         badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200'
//       };
//     }
    
//     if (isRoomBooked(room)) {
//       return {
//         status: 'booked',
//         label: 'Booked',
//         badge: '🟡 Booked',
//         badgeClass: 'bg-yellow-100 text-yellow-700 border border-yellow-200'
//       };
//     }
    
//     return {
//       status: 'available',
//       label: 'Available',
//       badge: '🟢 Available',
//       badgeClass: 'bg-green-100 text-green-700 border border-green-200'
//     };
//   };

//   // Get hotel status
//   const getHotelStatus = (hotel) => {
//     if (!hotel.rooms || hotel.rooms.length === 0) {
//       return {
//         badge: '⚪ No Rooms',
//         badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
//         availableCount: 0,
//         bookedCount: 0,
//         totalRooms: 0
//       };
//     }

//     const availableCount = hotel.rooms.filter(r => getRoomStatus(r).status === 'available').length;
//     const bookedCount = hotel.rooms.filter(r => getRoomStatus(r).status === 'booked').length;
//     const unavailableCount = hotel.rooms.filter(r => getRoomStatus(r).status === 'unavailable').length;

//     if (availableCount === 0 && bookedCount > 0) {
//       return {
//         badge: '🔴 Fully Booked',
//         badgeClass: 'bg-red-100 text-red-700 border border-red-200',
//         availableCount,
//         bookedCount,
//         unavailableCount,
//         totalRooms: hotel.rooms.length
//       };
//     }

//     if (availableCount > 0) {
//       return {
//         badge: '🟢 Available',
//         badgeClass: 'bg-green-100 text-green-700 border border-green-200',
//         availableCount,
//         bookedCount,
//         unavailableCount,
//         totalRooms: hotel.rooms.length
//       };
//     }

//     return {
//       badge: '⚪ Not Available',
//       badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
//       availableCount,
//       bookedCount,
//       unavailableCount,
//       totalRooms: hotel.rooms.length
//     };
//   };

//   // Filter hotels
//   const filteredHotels = hotels.filter(hotel => {
//     return hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//            hotel.location?.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   // Handle view rooms
//   const handleViewRooms = (hotel) => {
//     navigate('/hotelroom', { 
//       state: { 
//         hotel,
//         allBookings 
//       } 
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600 text-lg">Loading hotels...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Stay</h1>
//           <p className="text-gray-600 mt-2">Browse hotels and book rooms that suit your needs</p>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Search Hotels</label>
//               <input
//                 type="text"
//                 placeholder="Search by hotel name..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               />
//             </div>

//             {/* Room Type Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               >
//                 <option value="all">All Types</option>
//                 <option value="single">Single</option>
//                 <option value="double">Double</option>
//                 <option value="twin">Twin</option>
//                 <option value="suite">Suite</option>
//               </select>
//             </div>

//             {/* Price Range */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Price: Rs. {priceRange}
//               </label>
//               <input
//                 type="range"
//                 min="500"
//                 max="10000"
//                 step="100"
//                 value={priceRange}
//                 onChange={(e) => setPriceRange(e.target.value)}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-xs text-gray-500">
//                 <span>Rs. 500</span>
//                 <span>Rs. 10,000</span>
//               </div>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-end">
//               <p className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
//                 {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Hotels Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {filteredHotels.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🏨</div>
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Hotels Found</h3>
//             <p className="text-gray-600">Try adjusting your search criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredHotels.map((hotel) => {
//               const status = getHotelStatus(hotel);
              
//               return (
//                 <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                   {/* Hotel Image */}
//                   {hotel.images && hotel.images.length > 0 ? (
//                     <img
//                       src={hotel.images[0]}
//                       alt={hotel.name}
//                       className="w-full h-48 object-cover"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/400x300?text=Hotel";
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}

//                   {/* Hotel Info */}
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badgeClass}`}>
//                         {status.badge}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 mb-2 flex items-center">
//                       📍 {hotel.location || 'Location not specified'}
//                     </p>
                    
//                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                       {hotel.description || 'No description available'}
//                     </p>

//                     {/* Rating */}
//                     <div className="flex items-center mb-3">
//                       <span className="text-yellow-500">⭐</span>
//                       <span className="text-gray-700 ml-1">
//                         {hotel.rating ? hotel.rating.toFixed(1) : 'No rating yet'}
//                       </span>
//                     </div>

//                     {/* Room Stats */}
//                     {hotel.rooms && hotel.rooms.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {status.availableCount > 0 && (
//                           <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
//                             🟢 {status.availableCount} Available
//                           </span>
//                         )}
//                         {status.bookedCount > 0 && (
//                           <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200">
//                             🟡 {status.bookedCount} Booked
//                           </span>
//                         )}
//                         {status.unavailableCount > 0 && (
//                           <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium border border-gray-200">
//                             🔴 {status.unavailableCount} Unavailable
//                           </span>
//                         )}
//                       </div>
//                     )}

//                     {/* Price */}
//                     {hotel.rooms && hotel.rooms.length > 0 && (
//                       <div className="flex justify-between items-center mb-4">
//                         <p className="text-gray-700 font-bold">
//                           From Rs. {Math.min(...hotel.rooms.map(r => r.price))}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                           {hotel.rooms.length} room{hotel.rooms.length > 1 ? 's' : ''}
//                         </p>
//                       </div>
//                     )}

//                     {/* View Button */}
//                     <button
//                       onClick={() => handleViewRooms(hotel)}
//                       disabled={status.availableCount === 0}
//                       className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
//                         status.availableCount > 0
//                           ? 'bg-blue-500 hover:bg-blue-600 text-white'
//                           : status.badge.includes('Fully Booked')
//                             ? 'bg-red-500 text-white cursor-not-allowed'
//                             : 'bg-gray-400 text-white cursor-not-allowed'
//                       }`}
//                     >
//                       {status.availableCount > 0 
//                         ? `View Rooms (${status.availableCount} available)` 
//                         : status.badge.includes('Fully Booked')
//                           ? '🔴 Fully Booked'
//                           : '⚪ No Rooms Available'}
//                     </button>

//                     {/* Full Booking Message */}
//                     {status.badge.includes('Fully Booked') && (
//                       <p className="text-red-600 text-xs mt-2 text-center bg-red-50 p-2 rounded-lg">
//                         All rooms are currently booked. Please check back later.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Debug Info - Only visible in development */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <details className="bg-gray-100 rounded-lg p-4">
//             <summary className="font-semibold text-gray-700 cursor-pointer">
//               🔧 Debug Info
//             </summary>
//             <div className="mt-2 text-sm">
//               <p>Total Hotels: {hotels.length}</p>
//               <p>Total Bookings: {allBookings.length}</p>
              
//               {/* Samadi hotel specific */}
//               {hotels.map(hotel => {
//                 if (hotel.name?.toLowerCase().includes('samadi')) {
//                   return (
//                     <div key={hotel._id} className="mt-2 p-2 bg-yellow-50 rounded">
//                       <p className="font-bold">{hotel.name}:</p>
//                       <p>Rooms: {hotel.rooms?.length}</p>
//                       {hotel.rooms?.map(room => (
//                         <div key={room._id} className="ml-2 text-xs">
//                           - {room.name}: {getRoomStatus(room).label}
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           </details>
//         </div>
//       )}
//     </div>
//   );
// }
// ////////////////////////////////////new add code/////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Add your Navbar/Footer imports (update paths if needed)
import Navbar from "./components/Navbar";
import Footer from"./components/Footer";

// ✅ React Icons
import { FaHotel, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

export default function RoomList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [allBookings, setAllBookings] = useState([]);

  const navigate = useNavigate();

  // Fetch all hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/hotels");
        console.log("✅ Hotels loaded:", res.data);
        setHotels(res.data);
      } catch (err) {
        console.error("❌ Error fetching hotels:", err);
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setAllBookings(res.data);
        console.log("✅ Bookings loaded:", res.data);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // Check if room is booked
  const isRoomBooked = (room) => {
    if (!allBookings || allBookings.length === 0) return false;

    return allBookings.some((booking) => {
      const roomMatch =
        booking.roomId === room._id ||
        booking.roomName === room.name ||
        booking.roomId?.toString() === room._id?.toString();

      return roomMatch && (booking.isPaid === true || booking.status === "confirmed");
    });
  };

  // Get room status
  const getRoomStatus = (room) => {
    if (room.available === false) {
      return {
        status: "unavailable",
        label: "Not Available",
        badge: "Not Available",
        badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
      };
    }

    if (isRoomBooked(room)) {
      return {
        status: "booked",
        label: "Booked",
        badge: "Booked",
        badgeClass: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      };
    }

    return {
      status: "available",
      label: "Available",
      badge: "Available",
      badgeClass: "bg-green-100 text-green-700 border border-green-200",
    };
  };

  // Get hotel status
  const getHotelStatus = (hotel) => {
    if (!hotel.rooms || hotel.rooms.length === 0) {
      return {
        badge: "No Rooms",
        badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
        availableCount: 0,
        bookedCount: 0,
        totalRooms: 0,
      };
    }

    const availableCount = hotel.rooms.filter((r) => getRoomStatus(r).status === "available").length;
    const bookedCount = hotel.rooms.filter((r) => getRoomStatus(r).status === "booked").length;
    const unavailableCount = hotel.rooms.filter((r) => getRoomStatus(r).status === "unavailable").length;

    if (availableCount === 0 && bookedCount > 0) {
      return {
        badge: "Fully Booked",
        badgeClass: "bg-red-100 text-red-700 border border-red-200",
        availableCount,
        bookedCount,
        unavailableCount,
        totalRooms: hotel.rooms.length,
      };
    }

    if (availableCount > 0) {
      return {
        badge: "Available",
        badgeClass: "bg-green-100 text-green-700 border border-green-200",
        availableCount,
        bookedCount,
        unavailableCount,
        totalRooms: hotel.rooms.length,
      };
    }

    return {
      badge: "Not Available",
      badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
      availableCount,
      bookedCount,
      unavailableCount,
      totalRooms: hotel.rooms.length,
    };
  };

  // Filter hotels
  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle view rooms
  const handleViewRooms = (hotel) => {
    navigate("/hotelroom", {
      state: {
        hotel,
        allBookings,
      },
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading hotels...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Stay</h1>
            <p className="text-gray-600 mt-2">Browse hotels and book rooms that suit your needs</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Hotels</label>
                <input
                  type="text"
                  placeholder="Search by hotel name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Room Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="twin">Twin</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price: Rs. {priceRange}
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Rs. 500</span>
                  <span>Rs. 10,000</span>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                  {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 flex justify-center">
                <FaHotel className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Hotels Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => {
                const status = getHotelStatus(hotel);

                return (
                  <div
                    key={hotel._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Hotel Image */}
                    {hotel.images && hotel.images.length > 0 ? (
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=Hotel";
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}

                    {/* Hotel Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badgeClass}`}>
                          {status.badge}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-2 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        {hotel.location || "Location not specified"}
                      </p>

                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {hotel.description || "No description available"}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-700 ml-1">
                          {hotel.rating ? hotel.rating.toFixed(1) : "No rating yet"}
                        </span>
                      </div>

                      {/* Room Stats */}
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {status.availableCount > 0 && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200 inline-flex items-center">
                              <BsCircleFill className="text-green-500 mr-1" /> {status.availableCount} Available
                            </span>
                          )}
                          {status.bookedCount > 0 && (
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200 inline-flex items-center">
                              <BsCircleFill className="text-yellow-500 mr-1" /> {status.bookedCount} Booked
                            </span>
                          )}
                          {status.unavailableCount > 0 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium border border-gray-200 inline-flex items-center">
                              <BsCircleFill className="text-red-500 mr-1" /> {status.unavailableCount} Unavailable
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price */}
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-gray-700 font-bold">
                            From Rs. {Math.min(...hotel.rooms.map((r) => r.price))}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {hotel.rooms.length} room{hotel.rooms.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      )}

                      {/* View Button */}
                      <button
                        onClick={() => handleViewRooms(hotel)}
                        disabled={status.availableCount === 0}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                          status.availableCount > 0
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : status.badge.includes("Fully Booked")
                            ? "bg-red-500 text-white cursor-not-allowed"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        {status.availableCount > 0
                          ? `View Rooms (${status.availableCount} available)`
                          : status.badge.includes("Fully Booked")
                          ? "Fully Booked"
                          : "No Rooms Available"}
                      </button>

                      {/* Full Booking Message */}
                      {status.badge.includes("Fully Booked") && (
                        <p className="text-red-600 text-xs mt-2 text-center bg-red-50 p-2 rounded-lg">
                          All rooms are currently booked. Please check back later.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Debug Info - Only visible in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <details className="bg-gray-100 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">🔧 Debug Info</summary>
              <div className="mt-2 text-sm">
                <p>Total Hotels: {hotels.length}</p>
                <p>Total Bookings: {allBookings.length}</p>

                {/* Samadi hotel specific */}
                {hotels.map((hotel) => {
                  if (hotel.name?.toLowerCase().includes("samadi")) {
                    return (
                      <div key={hotel._id} className="mt-2 p-2 bg-yellow-50 rounded">
                        <p className="font-bold">{hotel.name}:</p>
                        <p>Rooms: {hotel.rooms?.length}</p>
                        {hotel.rooms?.map((room) => (
                          <div key={room._id} className="ml-2 text-xs">
                            - {room.name}: {getRoomStatus(room).label}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </details>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}