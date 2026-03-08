
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import axios from "axios";
// import {
//   MagnifyingGlassIcon,
//   CalendarDaysIcon,
//   UserGroupIcon,
//   CheckCircleIcon,
//   StarIcon,
//   ShieldCheckIcon,
//   MapPinIcon,
//   HomeModernIcon
// } from "@heroicons/react/24/outline";

// export default function Home() {
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guests, setGuests] = useState(2);
//   const [destination, setDestination] = useState("");
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchPerformed, setSearchPerformed] = useState(false);
//   const [allBookings, setAllBookings] = useState([]);
  
//   const navigate = useNavigate();

//   // Set default dates
//   useEffect(() => {
//     const today = new Date();
//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);

//     setCheckIn(today.toISOString().split("T")[0]);
//     setCheckOut(tomorrow.toISOString().split("T")[0]);
//   }, []);

//   // Fetch all hotels on component mount
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/hotels");
//         setHotels(res.data);
//         console.log("✅ Hotels loaded:", res.data.length);
//       } catch (err) {
//         console.error("❌ Error fetching hotels:", err);
//       }
//     };

//     fetchHotels();
//   }, []);

//   // Fetch all bookings to check availability
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/bookings");
//         setAllBookings(res.data);
//         console.log("✅ Bookings loaded:", res.data.length);
//       } catch (err) {
//         console.error("❌ Error fetching bookings:", err);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // ==================== CHECK ROOM AVAILABILITY ====================
//   const isRoomAvailable = (room, checkInDate, checkOutDate) => {
//     if (!room.available) return false; // Room marked as unavailable by hotel
    
//     if (!allBookings || allBookings.length === 0) return true;
    
//     const checkInTime = new Date(checkInDate).getTime();
//     const checkOutTime = new Date(checkOutDate).getTime();
    
//     // Check if room has any conflicting bookings
//     const conflictingBooking = allBookings.some(booking => {
//       // Check if booking matches this room
//       const roomMatch = booking.roomId === room._id || 
//                        booking.roomName === room.name ||
//                        booking.roomId?.toString() === room._id?.toString();
      
//       if (!roomMatch) return false;
      
//       // Check if booking is confirmed or paid
//       const isActiveBooking = booking.status === 'confirmed' || 
//                              booking.isPaid === true ||
//                              booking.status === 'pending';
      
//       if (!isActiveBooking) return false;
      
//       // Get booking dates
//       const bookingCheckIn = new Date(booking.checkIn).getTime();
//       const bookingCheckOut = new Date(booking.checkOut).getTime();
      
//       // Check for date overlap
//       const overlap = (checkInTime < bookingCheckOut && checkOutTime > bookingCheckIn);
      
//       return overlap;
//     });
    
//     return !conflictingBooking;
//   };

//   // ==================== GET AVAILABLE ROOMS COUNT FOR HOTEL ====================
//   const getAvailableRoomsCount = (hotel) => {
//     if (!hotel.rooms || hotel.rooms.length === 0) return 0;
    
//     let availableCount = 0;
    
//     hotel.rooms.forEach(room => {
//       if (isRoomAvailable(room, checkIn, checkOut)) {
//         availableCount++;
//       }
//     });
    
//     return availableCount;
//   };

//   // ==================== SEARCH HOTELS ====================
//   const handleSearch = async () => {
//     if (!checkIn || !checkOut) {
//       alert("Please select check-in and check-out dates");
//       return;
//     }
    
//     // Validate dates
//     const checkInDate = new Date(checkIn);
//     const checkOutDate = new Date(checkOut);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (checkInDate < today) {
//       alert("Check-in date cannot be in the past");
//       return;
//     }
    
//     if (checkOutDate <= checkInDate) {
//       alert("Check-out date must be after check-in date");
//       return;
//     }
    
//     setLoading(true);
//     setSearchPerformed(true);
    
//     try {
//       // Filter hotels by destination (if provided)
//       let filtered = [...hotels];
      
//       if (destination.trim()) {
//         filtered = filtered.filter(hotel => 
//           hotel.name?.toLowerCase().includes(destination.toLowerCase()) ||
//           hotel.location?.toLowerCase().includes(destination.toLowerCase())
//         );
//       }
      
//       // Further filter by room availability and guest capacity
//       const hotelsWithAvailability = filtered.filter(hotel => {
//         if (!hotel.rooms || hotel.rooms.length === 0) return false;
        
//         // Check if any room is available for the selected dates
//         const hasAvailableRoom = hotel.rooms.some(room => 
//           isRoomAvailable(room, checkIn, checkOut)
//         );
        
//         return hasAvailableRoom;
//       });
      
//       setFilteredHotels(hotelsWithAvailability);
      
//       console.log("✅ Search results:", {
//         destination,
//         checkIn,
//         checkOut,
//         guests,
//         totalHotels: hotelsWithAvailability.length
//       });
      
//     } catch (err) {
//       console.error("❌ Error searching hotels:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==================== VIEW HOTEL DETAILS ====================
//   const handleViewHotel = (hotelId) => {
//     navigate(`/hotel/${hotelId}`, {
//       state: {
//         checkIn,
//         checkOut,
//         guests
//       }
//     });
//   };

//   // ==================== VIEW ALL ROOMS ====================
//   const handleViewAllRooms = () => {
//     navigate("/rooms", {
//       state: {
//         checkIn,
//         checkOut,
//         guests
//       }
//     });
//   };

//   const features = [
//     {
//       icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
//       title: "Easy Booking",
//       description: "Book your stay in just a few clicks",
//     },
//     {
//       icon: <ShieldCheckIcon className="h-8 w-8 text-white" />,
//       title: "Secure Payments",
//       description: "100% secure payment processing",
//     },
//     {
//       icon: <StarIcon className="h-8 w-8 text-white" />,
//       title: "Best Price",
//       description: "Guaranteed lowest prices",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
//       <Navbar />

//       {/* Hero Section */}
//       <div className="relative py-16 md:py-20">
//         <div className="absolute inset-0 bg-black/50"></div>

//         <div className="relative max-w-7xl mx-auto px-6 text-white z-10 w-full">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
//               Find Your Perfect<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
//                 Stay Anywhere
//               </span>
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-gray-200">
//               Discover thousands of hotels, rooms and experiences at the best prices.
//             </p>
//           </div>

//           {/* Search Box - White background but text inside is dark */}
//           <div className="mt-6 md:mt-10 bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl">
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
//               {/* Destination */}
//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Destination
//                 </label>
//                 <div className="relative">
//                   <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Where to?"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                     className="w-full pl-10 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900"
//                   />
//                 </div>
//               </div>

//               {/* Check-in */}
//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Check-in</label>
//                 <div className="relative">
//                   <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="date"
//                     value={checkIn}
//                     min={new Date().toISOString().split("T")[0]}
//                     onChange={(e) => setCheckIn(e.target.value)}
//                     className="w-full pl-10 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900"
//                   />
//                 </div>
//               </div>

//               {/* Check-out */}
//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Check-out</label>
//                 <div className="relative">
//                   <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="date"
//                     value={checkOut}
//                     min={checkIn}
//                     onChange={(e) => setCheckOut(e.target.value)}
//                     className="w-full pl-10 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900"
//                   />
//                 </div>
//               </div>

//               {/* Guests */}
//               <div className="md:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Guests</label>
//                 <div className="relative">
//                   <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <select
//                     value={guests}
//                     onChange={(e) => setGuests(parseInt(e.target.value))}
//                     className="w-full pl-10 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm md:text-base text-gray-900"
//                   >
//                     {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//                       <option key={num} value={num} className="text-gray-900">
//                         {num} {num === 1 ? "Guest" : "Guests"}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Search Button */}
//               <div className="md:col-span-1 flex items-end">
//                 <button
//                   onClick={handleSearch}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2 text-sm md:text-base"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       <span>Searching...</span>
//                     </>
//                   ) : (
//                     <>
//                       <MagnifyingGlassIcon className="h-5 w-5" />
//                       <span>Search</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Search Results - Now with white text */}
//           {searchPerformed && (
//             <div className="mt-6 md:mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 max-w-4xl border border-white/20">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
//                 <div>
//                   <h3 className="text-white font-semibold text-lg md:text-xl">
//                     {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} Available
//                   </h3>
//                   <p className="text-gray-200 text-sm md:text-base">
//                     {destination ? `in ${destination}` : "Worldwide"} • {checkIn} to {checkOut} • {guests} {guests === 1 ? "Guest" : "Guests"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleViewAllRooms}
//                   className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base"
//                 >
//                   View All Rooms
//                 </button>
//               </div>

//               {/* Hotel Cards */}
//               {filteredHotels.length > 0 ? (
//                 <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
//                   {filteredHotels.slice(0, 3).map((hotel) => {
//                     const availableRooms = getAvailableRoomsCount(hotel);
                    
//                     return (
//                       <div
//                         key={hotel._id}
//                         className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//                         onClick={() => handleViewHotel(hotel._id)}
//                       >
//                         {/* Hotel Image */}
//                         {hotel.images && hotel.images.length > 0 ? (
//                           <img
//                             src={hotel.images[0]}
//                             alt={hotel.name}
//                             className="w-full h-36 md:h-40 object-cover"
//                             onError={(e) => {
//                               e.target.src = "https://via.placeholder.com/400x300?text=Hotel";
//                             }}
//                           />
//                         ) : (
//                           <div className="w-full h-36 md:h-40 bg-gray-200 flex items-center justify-center">
//                             <HomeModernIcon className="h-12 w-12 text-gray-400" />
//                           </div>
//                         )}
                        
//                         <div className="p-3 md:p-4">
//                           <div className="flex justify-between items-start">
//                             <h4 className="font-bold text-gray-800 text-sm md:text-base">{hotel.name}</h4>
//                             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//                               {availableRooms} {availableRooms === 1 ? "room" : "rooms"} left
//                             </span>
//                           </div>
//                           <p className="text-gray-600 text-xs md:text-sm flex items-center mt-1">
//                             <MapPinIcon className="h-3 w-3 mr-1" />
//                             {hotel.location || "Location not specified"}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
//                             <span className="text-xs md:text-sm text-gray-600 ml-1">
//                               {hotel.rating ? hotel.rating.toFixed(1) : "4.5"}
//                             </span>
//                           </div>
//                           <button className="mt-3 w-full bg-blue-600 text-white text-xs md:text-sm py-2 rounded-lg hover:bg-blue-700 transition">
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="text-center py-6 md:py-8">
//                   <p className="text-white text-base md:text-lg">No hotels available for your search criteria</p>
//                   <p className="text-gray-200 text-sm md:text-base mt-2">Try different dates or destination</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Features Section - With dark background and white text */}
//       <div className="py-12 md:py-16 bg-gradient-to-r from-gray-800 to-gray-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
//             Why Choose HotelEase?
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all border border-white/20"
//               >
//                 <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
//                 <p className="text-sm md:text-base text-gray-200">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Popular Destinations - With dark background and white text */}
//       <div className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
//             Popular Destinations
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             {["Colombo", "Kandy", "Galle", "Nuwara Eliya"].map((city, index) => {
//               const cityHotels = hotels.filter(h => 
//                 h.location?.toLowerCase().includes(city.toLowerCase())
//               ).length;
              
//               return (
//                 <div
//                   key={index}
//                   className="relative h-40 md:h-48 rounded-xl overflow-hidden cursor-pointer group"
//                   onClick={() => {
//                     setDestination(city);
//                     handleSearch();
//                   }}
//                 >
//                   <img
//                     src={`https://source.unsplash.com/400x300/?${city},srilanka`}
//                     alt={city}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
//                     <div>
//                       <h3 className="text-white font-bold text-lg">{city}</h3>
//                       <p className="text-gray-200 text-sm">{cityHotels} hotels</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


///////
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  MapPinIcon,
  HomeModernIcon,
  WifiIcon,
  SparklesIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [destination, setDestination] = useState("");
  const [hotels, setHotels] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [recentRooms, setRecentRooms] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  
  const navigate = useNavigate();

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setCheckIn(today.toISOString().split("T")[0]);
    setCheckOut(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Fetch all hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hotels");
        setHotels(res.data);
        
        // Get featured hotels (first 4 hotels or hotels with images)
        const featured = res.data.filter(h => h.images && h.images.length > 0).slice(0, 4);
        setFeaturedHotels(featured);
        
        console.log("✅ Hotels loaded:", res.data.length);
      } catch (err) {
        console.error("❌ Error fetching hotels:", err);
      }
    };

    fetchHotels();
  }, []);

  // Fetch all bookings to check availability
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setAllBookings(res.data);
        console.log("✅ Bookings loaded:", res.data.length);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // Fetch recent rooms from all hotels
  useEffect(() => {
    const fetchRecentRooms = () => {
      if (hotels.length === 0) return;
      
      const allRooms = [];
      
      hotels.forEach(hotel => {
        if (hotel.rooms && hotel.rooms.length > 0) {
          hotel.rooms.forEach(room => {
            allRooms.push({
              ...room,
              hotelName: hotel.name,
              hotelId: hotel._id,
              hotelImage: hotel.images && hotel.images.length > 0 ? hotel.images[0] : null,
              location: hotel.location
            });
          });
        }
      });
      
      // Get latest rooms (first 6)
      const recent = allRooms.slice(0, 6);
      setRecentRooms(recent);
    };
    
    fetchRecentRooms();
  }, [hotels]);

  // ==================== CHECK ROOM AVAILABILITY ====================
  const isRoomAvailable = (room, checkInDate, checkOutDate) => {
    if (!room.available) return false;
    
    if (!allBookings || allBookings.length === 0) return true;
    
    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();
    
    const conflictingBooking = allBookings.some(booking => {
      const roomMatch = booking.roomId === room._id || 
                       booking.roomName === room.name ||
                       booking.roomId?.toString() === room._id?.toString();
      
      if (!roomMatch) return false;
      
      const isActiveBooking = booking.status === 'confirmed' || 
                             booking.isPaid === true ||
                             booking.status === 'pending';
      
      if (!isActiveBooking) return false;
      
      const bookingCheckIn = new Date(booking.checkIn).getTime();
      const bookingCheckOut = new Date(booking.checkOut).getTime();
      
      const overlap = (checkInTime < bookingCheckOut && checkOutTime > bookingCheckIn);
      
      return overlap;
    });
    
    return !conflictingBooking;
  };

  // ==================== GET AVAILABLE ROOMS COUNT FOR HOTEL ====================
  const getAvailableRoomsCount = (hotel) => {
    if (!hotel.rooms || hotel.rooms.length === 0) return 0;
    
    let availableCount = 0;
    
    hotel.rooms.forEach(room => {
      if (isRoomAvailable(room, checkIn, checkOut)) {
        availableCount++;
      }
    });
    
    return availableCount;
  };

  // ==================== SEARCH HOTELS ====================
  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      alert("Check-in date cannot be in the past");
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date");
      return;
    }
    
    setLoading(true);
    setSearchPerformed(true);
    
    try {
      let filtered = [...hotels];
      
      if (destination.trim()) {
        filtered = filtered.filter(hotel => 
          hotel.name?.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.location?.toLowerCase().includes(destination.toLowerCase())
        );
      }
      
      const hotelsWithAvailability = filtered.filter(hotel => {
        if (!hotel.rooms || hotel.rooms.length === 0) return false;
        
        const hasAvailableRoom = hotel.rooms.some(room => 
          isRoomAvailable(room, checkIn, checkOut)
        );
        
        return hasAvailableRoom;
      });
      
      setFilteredHotels(hotelsWithAvailability);
      
    } catch (err) {
      console.error("❌ Error searching hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== VIEW HOTEL DETAILS ====================
  const handleViewHotel = (hotelId) => {
    navigate(`/hotel/${hotelId}`, {
      state: {
        checkIn,
        checkOut,
        guests
      }
    });
  };

  // ==================== VIEW ROOM DETAILS ====================
  const handleViewRoom = (hotelId, roomId) => {
    navigate(`/hotel/${hotelId}`, {
      state: {
        selectedRoomId: roomId,
        checkIn,
        checkOut,
        guests
      }
    });
  };

  // ==================== VIEW ALL ROOMS ====================
  const handleViewAllRooms = () => {
    navigate("/rooms", {
      state: {
        checkIn,
        checkOut,
        guests
      }
    });
  };

  const features = [
    {
      icon: <CheckCircleIcon className="h-8 w-8 text-blue-600" />,
      title: "Easy Booking",
      description: "Book your stay in just a few clicks",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
      title: "Secure Payments",
      description: "100% secure payment processing",
    },
    {
      icon: <StarIcon className="h-8 w-8 text-blue-600" />,
      title: "Best Price",
      description: "Guaranteed lowest prices",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Stay Anywhere
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Discover thousands of hotels, rooms and experiences at the best prices. 
              Book with confidence and enjoy your dream vacation.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Destination */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <div className="relative">
                  <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1 flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-5 w-5" />
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {searchPerformed && (
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-5xl border border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-white font-semibold text-xl">
                    {filteredHotels.length} {filteredHotels.length === 1 ? "Hotel" : "Hotels"} Available
                  </h3>
                  <p className="text-blue-100">
                    {destination ? `in ${destination}` : "Worldwide"} • {checkIn} to {checkOut} • {guests} {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
                <button
                  onClick={handleViewAllRooms}
                  className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  View All Rooms
                </button>
              </div>

              {/* Hotel Cards */}
              {filteredHotels.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHotels.slice(0, 3).map((hotel) => {
                    const availableRooms = getAvailableRoomsCount(hotel);
                    
                    return (
                      <div
                        key={hotel._id}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                        onClick={() => handleViewHotel(hotel._id)}
                      >
                        {hotel.images && hotel.images.length > 0 ? (
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                            }}
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Hotel"
                            className="w-full h-40 object-cover"
                          />
                        )}
                        
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800">{hotel.name}</h4>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {availableRooms} {availableRooms === 1 ? "room" : "rooms"}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <MapPinIcon className="h-3 w-3 mr-1 text-blue-500" />
                            {hotel.location || "Location not specified"}
                          </p>
                          <div className="flex items-center mt-2">
                            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {hotel.rating ? hotel.rating.toFixed(1) : "4.5"}
                            </span>
                          </div>
                          <button className="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white text-lg">No hotels available for your search criteria</p>
                  <p className="text-blue-100 mt-2">Try different dates or destination</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Why Choose ParadiseLankaStay?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We provide the best experience for travelers 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Hotels</h2>
              <p className="text-gray-600 mt-2">Hand-picked hotels for your next stay</p>
            </div>
            <Link
              to="/rooms"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.length > 0 ? featuredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleViewHotel(hotel._id)}
              >
                <div className="relative h-48 overflow-hidden">
                  {hotel.images && hotel.images.length > 0 ? (
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Hotel"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-semibold text-blue-600">Featured</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1 text-blue-500" />
                    {hotel.location || "Sri Lanka"}
                  </p>
                  <div className="flex items-center mt-3">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {hotel.rating ? hotel.rating.toFixed(1) : "4.5"} · {hotel.rooms?.length || 0} rooms
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              // Skeleton loading
              [1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Rooms */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Recent Rooms</h2>
              <p className="text-gray-600 mt-2">Latest rooms added to our collection</p>
            </div>
            <Link
              to="/rooms"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRooms.length > 0 ? recentRooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-blue-200"
                onClick={() => handleViewRoom(room.hotelId, room._id)}
              >
                <div className="relative h-48 overflow-hidden">
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Room"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {room.type || "Room"}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{room.name}</h3>
                    <span className="text-blue-600 font-bold">Rs. {room.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1 text-blue-500" />
                    {room.hotelName} · {room.location || "Sri Lanka"}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {room.description || "Experience comfort and luxury in this beautiful room."}
                  </p>
                  <button className="w-full bg-blue-50 text-blue-600 text-sm py-2 rounded-lg hover:bg-blue-100 transition font-medium">
                    View Details
                  </button>
                </div>
              </div>
            )) : (
              // Skeleton loading
              [1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Most searched destinations in Sri Lanka
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Colombo", image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", count: 24 },
              { name: "Kandy", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", count: 18 },
              { name: "Galle", image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", count: 15 },
              { name: "Nuwara Eliya", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", count: 12 }
            ].map((city, index) => {
              const cityHotels = hotels.filter(h => 
                h.location?.toLowerCase().includes(city.name.toLowerCase())
              ).length;
              
              return (
                <div
                  key={index}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => {
                    setDestination(city.name);
                    handleSearch();
                  }}
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-600/20 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-1">{city.name}</h3>
                      <p className="text-blue-100">{cityHotels || city.count} hotels</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-blue-600 font-semibold">Explore →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of happy travelers who found their perfect stay with us
          </p>
          <button
            onClick={() => navigate("/rooms")}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Browse All Hotels
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}