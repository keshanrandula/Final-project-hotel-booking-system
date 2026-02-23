// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function HotelRoom() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { hotel } = location.state || {};
  
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [filterType, setFilterType] = useState("all");
//   const [priceRange, setPriceRange] = useState(10000);

//   if (!hotel) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
//           <button 
//             onClick={() => navigate('/rooms')}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
//           >
//             Back to Hotels
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Filter rooms based on type and price
//   const filteredRooms = hotel.rooms?.filter(room => {
//     const matchesType = filterType === "all" || room.type?.toLowerCase() === filterType.toLowerCase();
//     const matchesPrice = room.price <= priceRange;
//     const isAvailable = room.available !== false;
    
//     return matchesType && matchesPrice && isAvailable;
//   }) || [];

//   // Handle book now - navigate to booking page
//   const handleBookNow = (room) => {
//     navigate('/booking', { 
//       state: { 
//         room: room,
//         hotel: hotel
//       } 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <button 
//             onClick={() => navigate('/rooms')}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4"
//           >
//             ← Back to Hotels
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
//           <p className="text-gray-600 mt-2">📍 {hotel.location}</p>
//           <p className="text-gray-500 mt-1">{hotel.description}</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
//           </div>
//         </div>
//       </div>

//       {/* Rooms List */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Available Rooms</h2>
//           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//             {filteredRooms.length} rooms available
//           </span>
//         </div>

//         {filteredRooms.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-lg">
//             <div className="text-4xl mb-3">😔</div>
//             <p className="text-gray-600">No rooms available matching your criteria</p>
//             <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredRooms.map((room, roomIndex) => (
//               <div
//                 key={roomIndex}
//                 className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
//               >
//                 {/* Room Image */}
//                 {room.images && room.images.length > 0 ? (
//                   <img
//                     src={room.images[0]}
//                     alt={room.name}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
//                     <span className="text-gray-500">No Image</span>
//                   </div>
//                 )}

//                 {/* Room Info */}
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
//                     <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                       Available
//                     </span>
//                   </div>
                  
//                   <p className="text-gray-600 mb-1">
//                     <span className="font-medium">Type:</span> {room.type}
//                   </p>
                  
//                   <p className="text-gray-600 mb-3">
//                     <span className="font-medium">Price:</span> 
//                     <span className="text-green-600 font-bold text-lg ml-1">
//                       Rs. {room.price}
//                     </span>
//                     <span className="text-gray-500 text-sm">/night</span>
//                   </p>

//                   {room.description && (
//                     <p className="text-gray-500 text-sm mb-4">
//                       {room.description}
//                     </p>
//                   )}

//                   {/* Room Features */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                       <span>🛏️ {room.type}</span>
//                       <span>👥 {room.type === 'Single' ? '1' : '2'} Guest</span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => handleBookNow(room)}
//                     className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HotelRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state || {};
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [allBookings, setAllBookings] = useState([]); // NEW: Store all bookings
  const [loading, setLoading] = useState(false);

  // NEW: Fetch all bookings to check which rooms are booked
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/bookings");
        setAllBookings(res.data);
        console.log("All bookings:", res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  // NEW: Helper function to check if a room is booked
  const isRoomBooked = (room) => {
    if (!allBookings || allBookings.length === 0) return false;
    
    // Check if there's any booking for this room
    return allBookings.some(booking => {
      // Match by room name or room ID
      const roomMatch = booking.roomName === room.name || 
                       booking.roomId === room._id ||
                       booking.roomName === room._id;
      
      // Consider only paid/booked rooms
      return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
    });
  };

  // NEW: Get room status with proper labels and styling
  const getRoomStatus = (room) => {
    // Case 1: Hotel marked as unavailable
    if (room.available === false) {
      return {
        status: 'unavailable',
        label: 'Not Available',
        badge: '🔴 Not Available',
        badgeClass: 'bg-gray-100 text-gray-600',
        buttonDisabled: true,
        buttonText: 'Not Available',
        buttonClass: 'bg-gray-300 text-gray-500 cursor-not-allowed'
      };
    }
    
    // Case 2: Room is booked
    if (isRoomBooked(room)) {
      return {
        status: 'booked',
        label: 'Booked',
        badge: '🟡 Booked',
        badgeClass: 'bg-yellow-100 text-yellow-700',
        buttonDisabled: true,
        buttonText: 'Already Booked',
        buttonClass: 'bg-yellow-300 text-yellow-700 cursor-not-allowed'
      };
    }
    
    // Case 3: Room is available
    return {
      status: 'available',
      label: 'Available',
      badge: '🟢 Available',
      badgeClass: 'bg-green-100 text-green-700',
      buttonDisabled: false,
      buttonText: 'Book Now',
      buttonClass: 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
    };
  };

  // Filter rooms based on type, price, and availability
  const filteredRooms = hotel.rooms?.filter(room => {
    const matchesType = filterType === "all" || room.type?.toLowerCase() === filterType.toLowerCase();
    const matchesPrice = room.price <= priceRange;
    const status = getRoomStatus(room);
    
    // Show all rooms (available, booked, unavailable) but with proper status
    return matchesType && matchesPrice;
  }) || [];

  // Handle book now - navigate to booking page
  const handleBookNow = (room) => {
    navigate('/booking', { 
      state: { 
        room: room,
        hotel: hotel
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hotels
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <p className="text-gray-600 mt-2">📍 {hotel.location}</p>
          <p className="text-gray-500 mt-1">{hotel.description}</p>
          
          {/* NEW: Booking Statistics */}
          <div className="mt-4 flex gap-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              🟢 Available: {hotel.rooms?.filter(r => getRoomStatus(r).status === 'available').length || 0}
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              🟡 Booked: {hotel.rooms?.filter(r => getRoomStatus(r).status === 'booked').length || 0}
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              🔴 Unavailable: {hotel.rooms?.filter(r => r.available === false).length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="deluxe">Deluxe</option>
                <option value="executive">Executive</option>
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
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-center">
            Loading booking information...
          </div>
        </div>
      )}

      {/* Rooms List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rooms at {hotel.name}</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredRooms.length} rooms found
          </span>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-4xl mb-3">😔</div>
            <p className="text-gray-600">No rooms matching your criteria</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room, roomIndex) => {
              const status = getRoomStatus(room);
              
              return (
                <div
                  key={roomIndex}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Room Image */}
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}

                  {/* Room Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badgeClass}`}>
                        {status.badge}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Type:</span> {room.type}
                    </p>
                    
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium">Price:</span> 
                      <span className="text-green-600 font-bold text-lg ml-1">
                        Rs. {room.price}
                      </span>
                      <span className="text-gray-500 text-sm">/night</span>
                    </p>

                    {room.description && (
                      <p className="text-gray-500 text-sm mb-4">
                        {room.description}
                      </p>
                    )}

                    {/* Room Features */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>🛏️ {room.type}</span>
                        <span>👥 {room.type === 'Single' ? '1' : '2'} Guest</span>
                      </div>
                    </div>

                    {/* Status Message */}
                    {status.status === 'booked' && (
                      <p className="text-yellow-600 text-sm mb-3 bg-yellow-50 p-2 rounded">
                        ⚠️ This room is currently booked. Please check back later.
                      </p>
                    )}
                    
                    {status.status === 'unavailable' && (
                      <p className="text-gray-500 text-sm mb-3 bg-gray-50 p-2 rounded">
                        ⚠️ Room temporarily unavailable for maintenance.
                      </p>
                    )}

                    {/* Book Button */}
                    <button
                      onClick={() => status.status === 'available' && handleBookNow(room)}
                      disabled={status.buttonDisabled}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                        status.status === 'available' 
                          ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                          : status.status === 'booked'
                            ? 'bg-yellow-300 text-yellow-700 cursor-not-allowed'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {status.buttonText}
                    </button>
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