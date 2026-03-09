
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";

// // export default function HotelList() {
// //   const [hotels, setHotels] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   useEffect(() => {
// //     const fetchHotels = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/hotels");
// //         setHotels(res.data);
// //       } catch (error) {
// //         console.error("Error fetching hotels:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHotels();
// //   }, []);

// //   const filteredHotels = hotels.filter((hotel) =>
// //     hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // Generate random rating for demo (replace with actual data)
// //   const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative">
// //             <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
// //             <div className="absolute inset-0 flex items-center justify-center">
// //               <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
// //             </div>
// //           </div>
// //           <p className="mt-6 text-xl font-medium text-gray-700 animate-pulse">
// //             Discovering amazing hotels...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
// //       {/* Hero Section with Search */}
// //       <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
// //         {/* Animated background pattern */}
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
// //           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
// //         </div>
        
// //         <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
// //           <div className="text-center">
// //             <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
// //               Find Your
// //               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
// //                 Perfect Stay
// //               </span>
// //             </h1>
// //             <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
// //               Discover luxury accommodations with exceptional comfort and world-class amenities
// //             </p>
            
// //             {/* Search Bar */}
// //             <div className="max-w-2xl mx-auto">
// //               <div className="relative group">
// //                 <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
// //                 <div className="relative">
// //                   <input
// //                     type="text"
// //                     placeholder="Search by hotel name or location..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full px-8 py-5 pl-14 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-yellow-300 focus:outline-none text-gray-800 text-lg shadow-xl"
// //                   />
// //                   <svg 
// //                     className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
// //                     fill="none" 
// //                     stroke="currentColor" 
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Wave divider */}
// //         <div className="absolute bottom-0 left-0 right-0">
// //           <svg className="w-full h-12 text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path d="M0 50L60 55.6C120 61.2 240 72.4 360 72.2C480 72 600 61.2 720 55.6C840 50 960 50 1080 55.6C1200 61.2 1320 72.4 1380 77.8L1440 83.4V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" 
// //               fill="currentColor" className="text-gray-50"/>
// //           </svg>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         {/* Stats Bar */}
// //         <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
// //           <div className="flex flex-wrap items-center justify-between gap-4">
// //             <div className="flex items-center gap-3">
// //               <div className="p-3 bg-blue-100 rounded-xl">
// //                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <p className="text-sm text-gray-600">Total Hotels</p>
// //                 <p className="text-2xl font-bold text-gray-800">{filteredHotels.length}</p>
// //               </div>
// //             </div>
            
// //             <div className="flex gap-3">
// //               <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-md hover:shadow-xl">
// //                 Popular
// //               </button>
// //               <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
// //                 Price: Low to High
// //               </button>
// //               <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
// //                 Top Rated
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {filteredHotels.length === 0 ? (
// //           <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
// //             <div className="text-8xl mb-6 animate-bounce">🏨</div>
// //             <h3 className="text-3xl font-bold text-gray-800 mb-3">No hotels found</h3>
// //             <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
// //             <button 
// //               onClick={() => setSearchTerm("")}
// //               className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
// //             >
// //               Clear Search
// //             </button>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //             {filteredHotels.map((hotel, index) => {
// //               const imageUrl =
// //                 hotel.images && hotel.images.length > 0
// //                   ? hotel.images[0].startsWith("http")
// //                     ? hotel.images[0]
// //                     : `http://localhost:5000${hotel.images[0]}`
// //                   : null;

// //               const rating = getRandomRating();
// //               const price = Math.floor(Math.random() * 200) + 80;

// //               return (
// //                 <div
// //                   key={hotel._id}
// //                   className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
// //                   style={{ animationDelay: `${index * 100}ms` }}
// //                 >
// //                   {/* Image Container */}
// //                   <div className="relative h-56 overflow-hidden">
// //                     {imageUrl ? (
// //                       <img
// //                         src={imageUrl}
// //                         alt={hotel.name}
// //                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //                       />
// //                     ) : (
// //                       <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
// //                         <span className="text-4xl">🏨</span>
// //                       </div>
// //                     )}
                    
// //                     {/* Rating Badge */}
// //                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
// //                       <div className="flex items-center gap-1">
// //                         <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
// //                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
// //                         </svg>
// //                         <span className="font-bold text-gray-800">{rating}</span>
// //                       </div>
// //                     </div>

// //                     {/* Price Tag */}
// //                     <div className="absolute -bottom-6 left-6 right-6">
// //                       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all">
// //                         <div className="flex items-center justify-between">
// //                           <span className="text-sm font-medium">Starting from</span>
// //                           <span className="text-2xl font-bold">${price}</span>
// //                         </div>
// //                         <span className="text-xs opacity-75">per night</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Content */}
// //                   <div className="p-6 pt-10">
// //                     <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
// //                       {hotel.name}
// //                     </h2>
                    
// //                     <div className="flex items-center text-gray-600 mb-4">
// //                       <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                       </svg>
// //                       <p className="text-sm text-gray-600">{hotel.location}</p>
// //                     </div>

// //                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
// //                       {hotel.description}
// //                     </p>

// //                     {/* Amenities Preview */}
// //                     <div className="flex flex-wrap gap-2 mb-5">
// //                       {["WiFi", "Pool", "Spa"].map((amenity, i) => (
// //                         <span
// //                           key={i}
// //                           className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium flex items-center gap-1"
// //                         >
// //                           <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
// //                           {amenity}
// //                         </span>
// //                       ))}
// //                     </div>

// //                     {/* View Rooms Button */}
// //                     <Link
// //                       to={`/hotel/${hotel._id}`}
// //                       className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl relative overflow-hidden group/btn"
// //                     >
// //                       <span className="relative z-10">View Rooms & Book</span>
// //                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// /////////////////
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function HotelList() {
//   const navigate = useNavigate();
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [allBookings, setAllBookings] = useState([]); // NEW: Store all bookings
//   const [checkingBookings, setCheckingBookings] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Fetch hotels
//         const hotelsRes = await axios.get("http://localhost:5000/api/hotels");
//         setHotels(hotelsRes.data);
        
//         // Fetch all bookings to check which rooms are booked
//         await fetchAllBookings();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // NEW: Fetch all bookings
//   const fetchAllBookings = async () => {
//     try {
//       setCheckingBookings(true);
//       const res = await axios.get("http://localhost:5000/api/bookings");
//       setAllBookings(res.data);
//       console.log("All bookings loaded:", res.data.length);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setCheckingBookings(false);
//     }
//   };

//   const filteredHotels = hotels.filter((hotel) =>
//     hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // NEW: Check if a room is booked
//   const isRoomBooked = (room) => {
//     if (!allBookings || allBookings.length === 0) return false;
    
//     // Check if there's any booking for this room
//     return allBookings.some(booking => {
//       // Match by room name and hotel name
//       const roomMatch = booking.roomName === room.name;
//       const hotelMatch = booking.hotelName === room.hotelName || 
//                         (room.hotelName && booking.hotelName === room.hotelName);
      
//       // Consider only paid/booked rooms
//       return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
//     });
//   };

//   // NEW: Get room booking status
//   const getRoomBookingStatus = (room) => {
//     if (isRoomBooked(room)) {
//       return {
//         isBooked: true,
//         label: 'Already Booked',
//         buttonText: 'Already Booked',
//         buttonClass: 'bg-yellow-300 text-yellow-700 cursor-not-allowed',
//         badge: '🟡 Booked',
//         badgeClass: 'bg-yellow-100 text-yellow-700'
//       };
//     }
    
//     // Room is available
//     return {
//       isBooked: false,
//       label: 'Available',
//       buttonText: 'Book Now',
//       buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700',
//       badge: '🟢 Available',
//       badgeClass: 'bg-green-100 text-green-700'
//     };
//   };

//   // Handle book now button click
//   const handleBookNow = (hotel, room = null) => {
//     const selectedRoom = room || (hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0] : null);
    
//     if (!selectedRoom) {
//       alert("No rooms available for this hotel");
//       return;
//     }

//     // Check if room is already booked
//     if (isRoomBooked(selectedRoom)) {
//       alert("This room is already booked. Please select another room.");
//       return;
//     }

//     navigate('/booking', { 
//       state: { 
//         hotel: hotel,
//         room: selectedRoom
//       } 
//     });
//   };

//   // Get room image URL
//   const getRoomImageUrl = (room) => {
//     if (room.images && room.images.length > 0) {
//       const imageUrl = room.images[0];
//       if (imageUrl.startsWith("http")) {
//         return imageUrl;
//       } else {
//         return `http://localhost:5000${imageUrl}`;
//       }
//     }
//     return "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
//   };

//   // Get hotel image URL
//   const getHotelImageUrl = (hotel) => {
//     if (hotel.images && hotel.images.length > 0) {
//       const imageUrl = hotel.images[0];
//       if (imageUrl.startsWith("http")) {
//         return imageUrl;
//       } else {
//         return `http://localhost:5000${imageUrl}`;
//       }
//     }
//     return "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
//   };

//   // Generate random rating for demo
//   const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//           <p className="mt-6 text-xl font-medium text-gray-700 animate-pulse">
//             Discovering amazing hotels...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Hero Section with Search */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
//           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
//         </div>
        
//         <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
//               Find Your
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
//                 Perfect Stay
//               </span>
//             </h1>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
//               Discover luxury accommodations with exceptional comfort and world-class amenities
//             </p>
            
//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search by hotel name or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full px-8 py-5 pl-14 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-yellow-300 focus:outline-none text-gray-800 text-lg shadow-xl"
//                   />
//                   <svg 
//                     className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Wave divider */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg className="w-full h-12 text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M0 50L60 55.6C120 61.2 240 72.4 360 72.2C480 72 600 61.2 720 55.6C840 50 960 50 1080 55.6C1200 61.2 1320 72.4 1380 77.8L1440 83.4V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" 
//               fill="currentColor" className="text-gray-50"/>
//           </svg>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Stats Bar */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Hotels</p>
//                 <p className="text-2xl font-bold text-gray-800">{filteredHotels.length}</p>
//               </div>
//             </div>
            
//             {/* NEW: Booking Status Indicator */}
//             {checkingBookings && (
//               <div className="flex items-center gap-2 text-sm text-blue-600">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                 <span>Checking availability...</span>
//               </div>
//             )}
            
//             <div className="flex gap-3">
//               <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-md hover:shadow-xl">
//                 Popular
//               </button>
//               <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
//                 Price: Low to High
//               </button>
//               <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
//                 Top Rated
//               </button>
//             </div>
//           </div>
//         </div>

//         {filteredHotels.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
//             <div className="text-8xl mb-6 animate-bounce">🏨</div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-3">No hotels found</h3>
//             <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
//             <button 
//               onClick={() => setSearchTerm("")}
//               className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
//             >
//               Clear Search
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {filteredHotels.map((hotel, index) => {
//               const hotelImageUrl = getHotelImageUrl(hotel);
//               const rating = getRandomRating();

//               return (
//                 <div
//                   key={hotel._id}
//                   className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   {/* Hotel Image Container */}
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src={hotelImageUrl}
//                       alt={hotel.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
//                       }}
//                     />
                    
//                     {/* Rating Badge */}
//                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
//                       <div className="flex items-center gap-1">
//                         <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                         </svg>
//                         <span className="font-bold text-gray-800">{rating}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-6">
//                     <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
//                       {hotel.name}
//                     </h2>
                    
//                     <div className="flex items-center text-gray-600 mb-4">
//                       <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       <p className="text-sm text-gray-600">{hotel.location || "Location not specified"}</p>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {hotel.description || "No description available"}
//                     </p>

//                     {/* Rooms Section */}
//                     {hotel.rooms && hotel.rooms.length > 0 ? (
//                       <div className="mb-5 border-t pt-4">
//                         <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//                           <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                           </svg>
//                           Available Rooms ({hotel.rooms.length})
//                         </p>
//                         <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
//                           {hotel.rooms.map((room, idx) => {
//                             const bookingStatus = getRoomBookingStatus(room);
                            
//                             return (
//                               <div key={room._id || idx} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
//                                 <div className="flex gap-3">
//                                   {/* Room Image */}
//                                   <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                                     <img
//                                       src={getRoomImageUrl(room)}
//                                       alt={room.name}
//                                       className="w-full h-full object-cover"
//                                       onError={(e) => {
//                                         e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100&h=100&fit=crop";
//                                       }}
//                                     />
//                                   </div>
                                  
//                                   {/* Room Details */}
//                                   <div className="flex-1">
//                                     <div className="flex justify-between items-start">
//                                       <div>
//                                         <p className="font-medium text-gray-800 text-sm">{room.name}</p>
//                                         <p className="text-xs text-gray-500">{room.type || "Standard"}</p>
//                                       </div>
//                                       <div className="text-right">
//                                         <p className="text-blue-600 font-bold text-sm">Rs. {room.price}</p>
//                                         <p className="text-xs text-gray-400">per night</p>
//                                       </div>
//                                     </div>
                                    
//                                     {/* NEW: Booking Status Badge */}
//                                     <div className="mt-1">
//                                       <span className={`text-xs px-2 py-0.5 rounded-full ${bookingStatus.badgeClass}`}>
//                                         {bookingStatus.badge}
//                                       </span>
//                                     </div>
                                    
//                                     {/* Book Button - Changes based on status */}
//                                     <button
//                                       onClick={() => !bookingStatus.isBooked && handleBookNow(hotel, room)}
//                                       disabled={bookingStatus.isBooked}
//                                       className={`mt-2 w-full text-xs py-2 rounded-lg transition-all ${
//                                         bookingStatus.isBooked
//                                           ? 'bg-yellow-300 text-yellow-700 cursor-not-allowed'
//                                           : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
//                                       }`}
//                                     >
//                                       {bookingStatus.buttonText}
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="mb-5 border-t pt-4 text-center text-gray-500 text-sm">
//                         No rooms available
//                       </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="space-y-3 mt-4">
//                       {/* Main Book Now Button - Only shows if there are available rooms */}
//                       {hotel.rooms && hotel.rooms.length > 0 && (
//                         <button
//                           onClick={() => handleBookNow(hotel)}
//                           className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
//                         >
//                           Book Now
//                         </button>
//                       )}

//                       {/* View Details Link */}
//                       <Link
//                         to={`/hotel/${hotel._id}`}
//                         className="block w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-all hover:underline"
//                       >
//                         View Details →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


///////////////////
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function HotelList() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBookings, setAllBookings] = useState([]);
  const [checkingBookings, setCheckingBookings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hotelsRes = await axios.get("http://localhost:5000/api/hotels");
        setHotels(hotelsRes.data);
        await fetchAllBookings();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setCheckingBookings(true);
      const res = await axios.get("http://localhost:5000/api/bookings");
      setAllBookings(res.data);
      console.log("All bookings loaded:", res.data.length);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setCheckingBookings(false);
    }
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isRoomBooked = (room) => {
    if (!allBookings || allBookings.length === 0) return false;
    
    return allBookings.some(booking => {
      const roomMatch = booking.roomName === room.name;
      return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
    });
  };

  const getRoomBookingStatus = (room) => {
    if (isRoomBooked(room)) {
      return {
        isBooked: true,
        label: 'Already Booked',
        buttonText: 'Already Booked',
        buttonClass: 'bg-yellow-300 text-yellow-700 cursor-not-allowed',
        badge: 'Booked',
        badgeClass: 'bg-yellow-100 text-yellow-700'
      };
    }
    
    return {
      isBooked: false,
      label: 'Available',
      buttonText: 'Book Now',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      badge: 'Available',
      badgeClass: 'bg-blue-100 text-blue-700'
    };
  };

  const handleBookNow = (hotel, room = null) => {
    const selectedRoom = room || (hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0] : null);
    
    if (!selectedRoom) {
      alert("No rooms available for this hotel");
      return;
    }

    if (isRoomBooked(selectedRoom)) {
      alert("This room is already booked. Please select another room.");
      return;
    }

    navigate('/booking', { 
      state: { 
        hotel: hotel,
        room: selectedRoom
      } 
    });
  };

  const getRoomImageUrl = (room) => {
    if (room.images && room.images.length > 0) {
      const imageUrl = room.images[0];
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      } else {
        return `http://localhost:5000${imageUrl}`;
      }
    }
    return "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
  };

  const getHotelImageUrl = (hotel) => {
    if (hotel.images && hotel.images.length > 0) {
      const imageUrl = hotel.images[0];
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      } else {
        return `http://localhost:5000${imageUrl}`;
      }
    }
    return "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
  };

  const getRandomRating = () => (Math.random() * (5 - 3.5) + 3.5).toFixed(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-6 text-xl font-medium text-gray-700 animate-pulse">
            Discovering amazing hotels...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section with Search - Changed to blue gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Perfect Stay
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
              Discover luxury accommodations with exceptional comfort and world-class amenities
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by hotel name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-8 py-5 pl-14 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-blue-500 focus:outline-none text-gray-800 text-lg shadow-xl"
                  />
                  <svg 
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L60 55.6C120 61.2 240 72.4 360 72.2C480 72 600 61.2 720 55.6C840 50 960 50 1080 55.6C1200 61.2 1320 72.4 1380 77.8L1440 83.4V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" 
              fill="currentColor" className="text-blue-50"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Hotels</p>
                <p className="text-2xl font-bold text-gray-800">{filteredHotels.length}</p>
              </div>
            </div>
            
            {checkingBookings && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Checking availability...</span>
              </div>
            )}
            
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-md hover:shadow-xl">
                Popular
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
                Price: Low to High
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-md hover:shadow-xl border border-gray-200">
                Top Rated
              </button>
            </div>
          </div>
        </div>

        {filteredHotels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="text-8xl mb-6 animate-bounce">🏨</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No hotels found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredHotels.map((hotel, index) => {
              const hotelImageUrl = getHotelImageUrl(hotel);
              const rating = getRandomRating();

              return (
                <div
                  key={hotel._id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Hotel Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotelImageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop";
                      }}
                    />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="font-bold text-gray-800">{rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {hotel.name}
                    </h2>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600">{hotel.location || "Location not specified"}</p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {hotel.description || "No description available"}
                    </p>

                    {/* Rooms Section */}
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                      <div className="mb-5 border-t pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Available Rooms ({hotel.rooms.length})
                        </p>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                          {hotel.rooms.map((room, idx) => {
                            const bookingStatus = getRoomBookingStatus(room);
                            
                            return (
                              <div key={room._id || idx} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                                <div className="flex gap-3">
                                  {/* Room Image */}
                                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                      src={getRoomImageUrl(room)}
                                      alt={room.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100&h=100&fit=crop";
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Room Details */}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium text-gray-800 text-sm">{room.name}</p>
                                        <p className="text-xs text-gray-500">{room.type || "Standard"}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-blue-600 font-bold text-sm">Rs. {room.price}</p>
                                        <p className="text-xs text-gray-400">per night</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-1">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${bookingStatus.badgeClass}`}>
                                        {bookingStatus.badge}
                                      </span>
                                    </div>
                                    
                                    <button
                                      onClick={() => !bookingStatus.isBooked && handleBookNow(hotel, room)}
                                      disabled={bookingStatus.isBooked}
                                      className={`mt-2 w-full text-xs py-2 rounded-lg transition-all ${
                                        bookingStatus.isBooked
                                          ? 'bg-blue-300 text-blue-700 cursor-not-allowed'
                                          : 'bg-blue-600 text-white hover:bg-blue-700'
                                      }`}
                                    >
                                      {bookingStatus.buttonText}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-5 border-t pt-4 text-center text-gray-500 text-sm">
                        No rooms available
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-4">
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <button
                          onClick={() => handleBookNow(hotel)}
                          className="w-full text-center bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                        >
                          Book Now
                        </button>
                      )}

                      <Link
                        to={`/hotel/${hotel._id}`}
                        className="block w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-all hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}