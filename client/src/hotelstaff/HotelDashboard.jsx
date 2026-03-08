

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function HotelDashboard() {
//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [stats, setStats] = useState({
//     totalRooms: 0,
//     availableRooms: 0,
//     bookedRooms: 0,
//     totalBookings: 0
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const hotelId = localStorage.getItem("hotelId");

//   useEffect(() => {
//     const fetchHotelData = async () => {
//       if (!token || !hotelId) {
//         navigate("/login");
//         return;
//       }

//       try {
//         setLoading(true);
//         const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHotel(res.data);
        
//         // Calculate statistics
//         const rooms = res.data.rooms || [];
//         const totalRooms = rooms.length;
//         const availableRooms = rooms.filter(room => room.available !== false).length;
//         const bookedRooms = totalRooms - availableRooms;
        
//         setStats({
//           totalRooms,
//           availableRooms,
//           bookedRooms,
//           totalBookings: 0 // You can fetch this from your bookings API
//         });
//       } catch (err) {
//         console.error("Error fetching hotel:", err.response?.data || err.message);
//         alert("Session expired or error fetching hotel.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("hotelId");
//         navigate("/hotellogin");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotelData();
//   }, [token, hotelId, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("hotelId");
//     navigate("/hotellogin");
//   };

//   const handleProfileMenuToggle = () => {
//     setShowProfileMenu(!showProfileMenu);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading hotel dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!hotel) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Hotel Not Found</h2>
//           <p className="text-gray-600 mb-4">Unable to load hotel information.</p>
//           <button
//             onClick={() => navigate("/hotellogin")}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header with Profile Icon */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo/Brand */}
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">HotelHub</h1>
//               <span className="ml-4 text-sm text-gray-500">Dashboard</span>
//             </div>

//             {/* Profile Section */}
//             <div className="flex items-center space-x-4">
//               {/* Add Room Button */}
//               <button
//                 onClick={() => navigate("/addroom")}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Room
//               </button>

//               {/* View Rooms Button */}
//               <button
//                 onClick={() => navigate("/rooms")}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//                 View Rooms
//               </button>

//               {/* Profile Icon */}
//               <div className="relative">
//                 <button
//                   onClick={handleProfileMenuToggle}
//                   className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition duration-150 ease-in-out"
//                 >
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                     <span className="text-white font-semibold text-sm">
//                       {hotel.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <span className="text-gray-700 font-medium hidden sm:block">
//                     {hotel.name}
//                   </span>
//                   <svg 
//                     className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Profile Dropdown Menu */}
//                 {showProfileMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{hotel.name}</p>
//                       <p className="text-xs text-gray-500 truncate">{hotel.email}</p>
//                     </div>
                    
//                     <button
//                       onClick={() => navigate("/edithotelprofile")}
//                       className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       Profile Settings
//                     </button>
                    
//                     <button
//                       onClick={() => navigate("/bookings")}
//                       className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                       </svg>
//                       View Bookings
//                     </button>
                    
//                     <div className="border-t border-gray-100">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                       >
//                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Dashboard Content */}
//       <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome back, {hotel.name}!
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage your hotel, rooms, and bookings from one place.
//           </p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Rooms</p>
//                 <p className="text-2xl font-semibold text-gray-900">{stats.totalRooms}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
//             <div className="flex items-center">
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Available Rooms</p>
//                 <p className="text-2xl font-semibold text-gray-900">{stats.availableRooms}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
//             <div className="flex items-center">
//               <div className="bg-red-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Booked Rooms</p>
//                 <p className="text-2xl font-semibold text-gray-900">{stats.bookedRooms}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
//             <div className="flex items-center">
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Bookings</p>
//                 <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Hotel Profile Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Hotel Information */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Profile</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Hotel Name</label>
//                   <p className="text-lg font-semibold text-gray-900">{hotel.name}</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                   <p className="text-lg text-gray-900">{hotel.email}</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
//                   <p className="text-lg text-gray-900">{hotel.location || "Not specified"}</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
//                   <p className="text-lg text-gray-900">{hotel.rating || "Not rated yet"}</p>
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
//                   <p className="text-gray-900">{hotel.description || "No description provided"}</p>
//                 </div>
                
//                 {hotel.amenities && hotel.amenities.length > 0 && (
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-600 mb-2">Amenities</label>
//                     <div className="flex flex-wrap gap-2">
//                       {hotel.amenities.map((amenity, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
//                         >
//                           {amenity}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Hotel Images */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotel Images</h3>
            
//             {hotel.images && hotel.images.length > 0 ? (
//               <div className="grid grid-cols-2 gap-4">
//                 {hotel.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`Hotel view ${idx + 1}`}
//                     className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
//                     }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 bg-gray-100 rounded-lg">
//                 <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <p className="text-gray-500">No images uploaded yet</p>
//               </div>
//             )}
            
//             <button
//               onClick={() => navigate("/edit-hotel")}
//               className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
//             >
//               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               Edit Hotel Profile
//             </button>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 bg-white rounded-xl shadow-md p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <button
//               onClick={() => navigate("/addroom")}
//               className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
//             >
//               <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               <p className="font-medium text-gray-700">Add New Room</p>
//               <p className="text-sm text-gray-500">Create a new room listing</p>
//             </button>

//             <button
//               onClick={() => navigate("/rooms")}
//               className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
//             >
//               <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//               <p className="font-medium text-gray-700">Manage Rooms</p>
//               <p className="text-sm text-gray-500">View and edit all rooms</p>
//             </button>

//             <button
//               onClick={() => navigate("/bookings")}
//               className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
//             >
//               <svg className="w-8 h-8 text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//               </svg>
//               <p className="font-medium text-gray-700">View Bookings</p>
//               <p className="text-sm text-gray-500">Check reservations</p>
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HotelDashboard() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    totalBookings: 0
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!token || !hotelId) {
        navigate("/hotellogin");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotel(res.data);
        
        // Calculate statistics
        const rooms = res.data.rooms || [];
        const totalRooms = rooms.length;
        const availableRooms = rooms.filter(room => room.available !== false).length;
        const bookedRooms = totalRooms - availableRooms;
        
        // Fetch bookings count (optional)
        try {
          const bookingsRes = await axios.get(`http://localhost:5000/api/bookings/hotel/${hotelId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStats({
            totalRooms,
            availableRooms,
            bookedRooms,
            totalBookings: bookingsRes.data.length || 0
          });
        } catch (bookingErr) {
          console.error("Error fetching bookings:", bookingErr);
          setStats({
            totalRooms,
            availableRooms,
            bookedRooms,
            totalBookings: 0
          });
        }
      } catch (err) {
        console.error("Error fetching hotel:", err.response?.data || err.message);
        alert("Session expired or error fetching hotel.");
        localStorage.removeItem("token");
        localStorage.removeItem("hotelId");
        navigate("/hotellogin");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [token, hotelId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hotelId");
    navigate("/hotellogin");
  };

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Navigation handlers for room and booking management
  const handleRoomManagement = () => {
    navigate("/roommanage");
  };

  const handleBookingManagement = () => {
    navigate("/hotel/bookingmanagement");
  };

  const handleAddRoom = () => {
    navigate("/addroom");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotel dashboard...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load hotel information.</p>
          <button
            onClick={() => navigate("/hotellogin")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Profile Icon */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ParadiseLankaStay</h1>
              <span className="ml-4 text-sm text-gray-500">Dashboard</span>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              {/* Add Room Button */}
              <button
                onClick={handleAddRoom}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Room
              </button>

              {/* Room Management Button - NEW */}
              <button
                onClick={handleRoomManagement}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Manage Rooms
              </button>

              {/* Booking Management Button - NEW */}
              <button
                onClick={handleBookingManagement}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Bookings
              </button>

              {/* Profile Icon */}
              <div className="relative">
                <button
                  onClick={handleProfileMenuToggle}
                  className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition duration-150 ease-in-out"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {hotel.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium hidden sm:block">
                    {hotel.name}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{hotel.name}</p>
                      <p className="text-xs text-gray-500 truncate">{hotel.email}</p>
                    </div>
                    
                    <button
                      onClick={() => navigate("/edithotelprofile")}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </button>
                    
                    {/* Updated: Navigate to hotelbookingmanage */}
                    <button
                      onClick={handleBookingManagement}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      View Bookings
                    </button>
                    
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {hotel.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your hotel, rooms, and bookings from one place.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRooms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Rooms</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.availableRooms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Booked Rooms</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bookedRooms}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Hotel Name</label>
                  <p className="text-lg font-semibold text-gray-900">{hotel.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-lg text-gray-900">{hotel.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                  <p className="text-lg text-gray-900">{hotel.location || "Not specified"}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                  <p className="text-lg text-gray-900">{hotel.rating || "Not rated yet"}</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                  <p className="text-gray-900">{hotel.description || "No description provided"}</p>
                </div>
                
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hotel Images */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotel Images</h3>
            
            {hotel.images && hotel.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {hotel.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Hotel view ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-100 rounded-lg">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No images uploaded yet</p>
              </div>
            )}
            
            <button
              onClick={() => navigate("/edithotelprofile")}
              className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Hotel Profile
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleAddRoom}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
            >
              <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="font-medium text-gray-700">Add New Room</p>
              <p className="text-sm text-gray-500">Create a new room listing</p>
            </button>

            <button
              onClick={handleRoomManagement}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
            >
              <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="font-medium text-gray-700">Manage Rooms</p>
              <p className="text-sm text-gray-500">View and edit all rooms</p>
            </button>

            <button
              onClick={handleBookingManagement}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
            >
              <svg className="w-8 h-8 text-purple-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-gray-700">View Bookings</p>
              <p className="text-sm text-gray-500">Check reservations</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
