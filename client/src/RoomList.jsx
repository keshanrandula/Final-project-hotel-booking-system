

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export default function RoomList() {
// //   const [hotels, setHotels] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [selectedHotel, setSelectedHotel] = useState(null);
// //   const [selectedRoom, setSelectedRoom] = useState(null);
// //   const [bookingForm, setBookingForm] = useState({
// //     checkIn: "",
// //     checkOut: "",
// //     guests: 1,
// //     customerName: "",
// //     customerEmail: "",
// //     customerPhone: ""
// //   });
// //   const [showBookingModal, setShowBookingModal] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterType, setFilterType] = useState("all");
// //   const [priceRange, setPriceRange] = useState(10000);
// //   const [expandedHotelId, setExpandedHotelId] = useState(null);
// //   const [bookingLoading, setBookingLoading] = useState(false);

// //   const navigate = useNavigate();

// //   // Fetch all hotels with their rooms
// //   useEffect(() => {
// //     const fetchHotels = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get("http://localhost:5000/api/hotels");
// //         console.log("Hotels data:", res.data);
// //         setHotels(res.data);
// //       } catch (err) {
// //         console.error("Error fetching hotels:", err);
// //         setError("Failed to load hotels. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHotels();
// //   }, []);

// //   // Filter hotels based on search
// //   const filteredHotels = hotels.filter(hotel => {
// //     const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          hotel.location?.toLowerCase().includes(searchTerm.toLowerCase());
// //     return matchesSearch;
// //   });

// //   // Filter rooms based on type and price
// //   const getFilteredRooms = (rooms) => {
// //     if (!rooms) return [];
    
// //     return rooms.filter(room => {
// //       const matchesType = filterType === "all" || room.type?.toLowerCase() === filterType.toLowerCase();
// //       const matchesPrice = room.price <= priceRange;
// //       const isAvailable = room.available !== false;
      
// //       return matchesType && matchesPrice && isAvailable;
// //     });
// //   };

// //   // Toggle hotel expansion (show/hide rooms)
// //   const toggleHotelExpansion = (hotelId) => {
// //     if (expandedHotelId === hotelId) {
// //       setExpandedHotelId(null);
// //     } else {
// //       setExpandedHotelId(hotelId);
// //     }
// //   };

// //   // Handle room booking
// //   const handleBookRoom = (room, hotel) => {
// //     setSelectedRoom(room);
// //     setSelectedHotel(hotel);
// //     setBookingForm({
// //       checkIn: "",
// //       checkOut: "",
// //       guests: 1,
// //       customerName: "",
// //       customerEmail: "",
// //       customerPhone: ""
// //     });
// //     setShowBookingModal(true);
// //   };

// //   // Handle booking form changes
// //   const handleBookingChange = (e) => {
// //     const { name, value } = e.target;
// //     setBookingForm(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   // Calculate total amount
// //   const calculateTotalAmount = (price, checkIn, checkOut) => {
// //     if (!checkIn || !checkOut) return price;
// //     const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
// //     return price * (nights || 1);
// //   };

// //   // Calculate nights
// //   const calculateNights = (checkIn, checkOut) => {
// //     if (!checkIn || !checkOut) return 1;
// //     return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
// //   };

// //   // Submit booking to your backend
// //   const handleBookingSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!bookingForm.checkIn || !bookingForm.checkOut || !bookingForm.customerName || 
// //         !bookingForm.customerEmail || !bookingForm.customerPhone) {
// //       alert("Please fill in all required fields");
// //       return;
// //     }

// //     if (new Date(bookingForm.checkIn) >= new Date(bookingForm.checkOut)) {
// //       alert("Check-out date must be after check-in date");
// //       return;
// //     }

// //     try {
// //       setBookingLoading(true);

// //       // Prepare booking data according to your backend model
// //       const bookingData = {
// //         hotelName: selectedHotel.name,
// //         roomName: selectedRoom.name,
// //         roomType: selectedRoom.type,
// //         pricePerNight: selectedRoom.price,
// //         checkIn: bookingForm.checkIn,
// //         checkOut: bookingForm.checkOut,
// //         guests: parseInt(bookingForm.guests),
// //         customerName: bookingForm.customerName,
// //         customerEmail: bookingForm.customerEmail,
// //         customerPhone: bookingForm.customerPhone,
// //         totalAmount: calculateTotalAmount(selectedRoom.price, bookingForm.checkIn, bookingForm.checkOut)
// //       };

// //       console.log("Sending booking data:", bookingData);

// //       // Make API call to your backend
// //       const response = await axios.post("http://localhost:5000/api/bookings", bookingData);
      
// //       if (response.status === 201) {
// //         const savedBooking = response.data.booking;
        
// //         alert(`🎉 Booking confirmed!\n\nBooking Reference: ${savedBooking._id}\n${selectedRoom.name} at ${selectedHotel.name}\nCheck-in: ${bookingForm.checkIn}\nCheck-out: ${bookingForm.checkOut}\nTotal: Rs. ${savedBooking.totalAmount}\n\nA confirmation has been sent to ${bookingForm.customerEmail}`);
        
// //         // Reset form and close modal
// //         setShowBookingModal(false);
// //         setSelectedRoom(null);
// //         setSelectedHotel(null);
// //         setBookingForm({
// //           checkIn: "",
// //           checkOut: "",
// //           guests: 1,
// //           customerName: "",
// //           customerEmail: "",
// //           customerPhone: ""
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Booking error:", err);
// //       const errorMessage = err.response?.data?.message || "Failed to process booking. Please try again.";
// //       alert(`Booking failed: ${errorMessage}`);
// //     } finally {
// //       setBookingLoading(false);
// //     }
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
// //           <p className="mt-4 text-gray-600 text-lg">Loading hotels...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 py-6">
// //           <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Stay</h1>
// //           <p className="text-gray-600 mt-2">Browse hotels and book rooms that suit your needs</p>
// //         </div>
// //       </div>

// //       {/* Search and Filters */}
// //       <div className="bg-white border-b">
// //         <div className="max-w-7xl mx-auto px-4 py-4">
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //             {/* Search */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Search Hotels</label>
// //               <input
// //                 type="text"
// //                 placeholder="Search by hotel name or location..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //               />
// //             </div>

// //             {/* Room Type Filter */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
// //               <select
// //                 value={filterType}
// //                 onChange={(e) => setFilterType(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //               >
// //                 <option value="all">All Types</option>
// //                 <option value="single">Single</option>
// //                 <option value="double">Double</option>
// //                 <option value="twin">Twin</option>
// //                 <option value="suite">Suite</option>
// //                 <option value="deluxe">Deluxe</option>
// //                 <option value="executive">Executive</option>
// //               </select>
// //             </div>

// //             {/* Price Range */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Max Price: Rs. {priceRange}
// //               </label>
// //               <input
// //                 type="range"
// //                 min="500"
// //                 max="10000"
// //                 step="100"
// //                 value={priceRange}
// //                 onChange={(e) => setPriceRange(e.target.value)}
// //                 className="w-full"
// //               />
// //               <div className="flex justify-between text-xs text-gray-500">
// //                 <span>Rs. 500</span>
// //                 <span>Rs. 10,000</span>
// //               </div>
// //             </div>

// //             {/* Results Count */}
// //             <div className="flex items-end">
// //               <p className="text-gray-600">
// //                 {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="max-w-7xl mx-auto px-4 py-4">
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
// //             {error}
// //           </div>
// //         </div>
// //       )}

// //       {/* Hotels List */}
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         {filteredHotels.length === 0 ? (
// //           <div className="text-center py-12">
// //             <div className="text-6xl mb-4">🏨</div>
// //             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Hotels Found</h3>
// //             <p className="text-gray-600">Try adjusting your search criteria</p>
// //           </div>
// //         ) : (
// //           <div className="space-y-6">
// //             {filteredHotels.map((hotel) => {
// //               const availableRooms = getFilteredRooms(hotel.rooms);
// //               const isExpanded = expandedHotelId === hotel._id;
              
// //               return (
// //                 <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
// //                   {/* Hotel Header - Always Visible */}
// //                   <div className="p-6">
// //                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
// //                       {/* Hotel Info */}
// //                       <div className="flex-1">
// //                         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
// //                           {/* Hotel Images */}
// //                           {hotel.images && hotel.images.length > 0 && (
// //                             <div className="flex-shrink-0">
// //                               <img
// //                                 src={hotel.images[0]}
// //                                 alt={hotel.name}
// //                                 className="w-20 h-20 object-cover rounded-lg"
// //                                 onError={(e) => {
// //                                   e.target.src = "https://via.placeholder.com/100x100?text=Hotel";
// //                                 }}
// //                               />
// //                             </div>
// //                           )}
                          
// //                           <div>
// //                             <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
// //                             <p className="text-gray-600 mt-1">
// //                               📍 {hotel.location} • ⭐ {hotel.rating || "No rating yet"}
// //                             </p>
// //                             <p className="text-gray-500 text-sm mt-2 line-clamp-2">{hotel.description}</p>
                            
// //                             {/* Hotel Amenities */}
// //                             {hotel.amenities && hotel.amenities.length > 0 && (
// //                               <div className="flex flex-wrap gap-1 mt-2">
// //                                 {hotel.amenities.slice(0, 4).map((amenity, index) => (
// //                                   <span
// //                                     key={index}
// //                                     className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
// //                                   >
// //                                     {amenity}
// //                                   </span>
// //                                 ))}
// //                                 {hotel.amenities.length > 4 && (
// //                                   <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
// //                                     +{hotel.amenities.length - 4} more
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* Action Buttons */}
// //                       <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
// //                         <div className="text-center sm:text-right">
// //                           <p className="text-green-600 font-semibold text-lg">
// //                             {availableRooms.length} room{availableRooms.length !== 1 ? 's' : ''} available
// //                           </p>
// //                           <p className="text-gray-500 text-sm">
// //                             From Rs. {Math.min(...availableRooms.map(room => room.price)) || 0}
// //                           </p>
// //                         </div>
                        
// //                         <button
// //                           onClick={() => toggleHotelExpansion(hotel._id)}
// //                           className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
// //                             isExpanded 
// //                               ? 'bg-gray-500 hover:bg-gray-600 text-white' 
// //                               : 'bg-blue-500 hover:bg-blue-600 text-white'
// //                           }`}
// //                         >
// //                           {isExpanded ? 'Hide Rooms' : 'View Rooms'}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Expandable Rooms Section */}
// //                   {isExpanded && (
// //                     <div className="border-t border-gray-200">
// //                       {/* More Hotel Images */}
// //                       {hotel.images && hotel.images.length > 1 && (
// //                         <div className="p-6 border-b border-gray-200">
// //                           <h3 className="font-semibold text-gray-700 mb-3">Hotel Gallery</h3>
// //                           <div className="flex gap-4 overflow-x-auto pb-2">
// //                             {hotel.images.slice(1).map((img, idx) => (
// //                               <img
// //                                 key={idx}
// //                                 src={img}
// //                                 alt={`${hotel.name} view ${idx + 2}`}
// //                                 className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
// //                                 onError={(e) => {
// //                                   e.target.src = "https://via.placeholder.com/300x200?text=Hotel+Image";
// //                                 }}
// //                               />
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {/* Available Rooms */}
// //                       <div className="p-6">
// //                         <div className="flex justify-between items-center mb-6">
// //                           <h3 className="text-xl font-semibold text-gray-800">
// //                             Available Rooms at {hotel.name}
// //                           </h3>
// //                           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
// //                             {availableRooms.length} rooms
// //                           </span>
// //                         </div>

// //                         {availableRooms.length === 0 ? (
// //                           <div className="text-center py-8 bg-gray-50 rounded-lg">
// //                             <div className="text-4xl mb-3">😔</div>
// //                             <p className="text-gray-600">No rooms available matching your criteria</p>
// //                             <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
// //                           </div>
// //                         ) : (
// //                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                             {availableRooms.map((room, roomIndex) => (
// //                               <div
// //                                 key={roomIndex}
// //                                 className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white"
// //                               >
// //                                 {/* Room Image */}
// //                                 {room.images && room.images.length > 0 ? (
// //                                   <img
// //                                     src={room.images[0]}
// //                                     alt={room.name}
// //                                     className="w-full h-48 object-cover rounded-t-lg"
// //                                     onError={(e) => {
// //                                       e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
// //                                     }}
// //                                   />
// //                                 ) : (
// //                                   <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
// //                                     <span className="text-gray-500">No Image</span>
// //                                   </div>
// //                                 )}

// //                                 {/* Room Info */}
// //                                 <div className="p-4">
// //                                   <div className="flex justify-between items-start mb-2">
// //                                     <h4 className="font-semibold text-lg text-gray-800">{room.name}</h4>
// //                                     <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
// //                                       Available
// //                                     </span>
// //                                   </div>
                                  
// //                                   <p className="text-gray-600 mb-1">
// //                                     <span className="font-medium">Type:</span> {room.type}
// //                                   </p>
                                  
// //                                   <p className="text-gray-600 mb-3">
// //                                     <span className="font-medium">Price:</span> 
// //                                     <span className="text-green-600 font-bold text-lg ml-1">
// //                                       Rs. {room.price}
// //                                     </span>
// //                                     <span className="text-gray-500 text-sm">/night</span>
// //                                   </p>

// //                                   {room.description && (
// //                                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">
// //                                       {room.description}
// //                                     </p>
// //                                   )}

// //                                   {/* Room Features */}
// //                                   <div className="flex items-center justify-between mb-4">
// //                                     <div className="flex items-center space-x-4 text-sm text-gray-500">
// //                                       <span>🛏️ {room.type}</span>
// //                                       <span>👥 {room.type === 'Single' ? '1' : '2'} Guest</span>
// //                                     </div>
// //                                   </div>

// //                                   <button
// //                                     onClick={() => handleBookRoom(room, hotel)}
// //                                     className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
// //                                   >
// //                                     Book Now
// //                                   </button>
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>

// //       {/* Booking Modal */}
// //       {showBookingModal && selectedRoom && selectedHotel && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="p-6">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h2 className="text-2xl font-bold text-gray-800">Book Your Room</h2>
// //                 <button
// //                   onClick={() => setShowBookingModal(false)}
// //                   className="text-gray-500 hover:text-gray-700 text-2xl"
// //                   disabled={bookingLoading}
// //                 >
// //                   ×
// //                 </button>
// //               </div>

// //               {/* Room and Hotel Info */}
// //               <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //                 <h3 className="font-semibold text-lg">{selectedRoom.name}</h3>
// //                 <p className="text-gray-600">{selectedHotel.name} • {selectedRoom.type}</p>
// //                 <p className="text-green-600 font-bold text-xl mt-1">Rs. {selectedRoom.price} / night</p>
// //               </div>

// //               {/* Booking Form */}
// //               <form onSubmit={handleBookingSubmit} className="space-y-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Check-in Date *
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="checkIn"
// //                       value={bookingForm.checkIn}
// //                       onChange={handleBookingChange}
// //                       min={new Date().toISOString().split('T')[0]}
// //                       required
// //                       disabled={bookingLoading}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Check-out Date *
// //                     </label>
// //                     <input
// //                       type="date"
// //                       name="checkOut"
// //                       value={bookingForm.checkOut}
// //                       onChange={handleBookingChange}
// //                       min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
// //                       required
// //                       disabled={bookingLoading}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Number of Guests *
// //                   </label>
// //                   <select
// //                     name="guests"
// //                     value={bookingForm.guests}
// //                     onChange={handleBookingChange}
// //                     required
// //                     disabled={bookingLoading}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                   >
// //                     {[1, 2, 3, 4, 5, 6].map(num => (
// //                       <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Full Name *
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="customerName"
// //                       value={bookingForm.customerName}
// //                       onChange={handleBookingChange}
// //                       placeholder="Enter your full name"
// //                       required
// //                       disabled={bookingLoading}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                     />
// //                   </div>
                  
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Email *
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="customerEmail"
// //                       value={bookingForm.customerEmail}
// //                       onChange={handleBookingChange}
// //                       placeholder="Enter your email"
// //                       required
// //                       disabled={bookingLoading}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Phone Number *
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     name="customerPhone"
// //                     value={bookingForm.customerPhone}
// //                     onChange={handleBookingChange}
// //                     placeholder="Enter your phone number"
// //                     required
// //                     disabled={bookingLoading}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50"
// //                   />
// //                 </div>

// //                 {/* Booking Summary */}
// //                 {bookingForm.checkIn && bookingForm.checkOut && (
// //                   <div className="bg-blue-50 rounded-lg p-4">
// //                     <h4 className="font-semibold text-blue-800 mb-2">Booking Summary</h4>
// //                     <div className="flex justify-between text-sm">
// //                       <span>Nights:</span>
// //                       <span>{calculateNights(bookingForm.checkIn, bookingForm.checkOut)}</span>
// //                     </div>
// //                     <div className="flex justify-between text-sm">
// //                       <span>Price per night:</span>
// //                       <span>Rs. {selectedRoom.price}</span>
// //                     </div>
// //                     <div className="flex justify-between font-semibold text-blue-800 mt-2 pt-2 border-t border-blue-200">
// //                       <span>Total Amount:</span>
// //                       <span>Rs. {calculateTotalAmount(selectedRoom.price, bookingForm.checkIn, bookingForm.checkOut)}</span>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="flex gap-3 pt-4">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowBookingModal(false)}
// //                     disabled={bookingLoading}
// //                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={bookingLoading}
// //                     className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center"
// //                   >
// //                     {bookingLoading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                         Processing...
// //                       </>
// //                     ) : (
// //                       "Confirm Booking"
// //                     )}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// ////////

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

//   const navigate = useNavigate();

//   // Fetch all hotels with their rooms
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

//   // Filter hotels based on search
//   const filteredHotels = hotels.filter(hotel => {
//     const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          hotel.location?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   // Handle view rooms - navigate to hotelroom page
//   const handleViewRooms = (hotel) => {
//     navigate('/hotelroom', { state: { hotel } });
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
//               const availableRooms = hotel.rooms?.filter(room => room.available !== false) || [];
              
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
//                     <h2 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
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

//                     {/* Available Rooms Info */}
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-green-600 font-semibold">
//                         {availableRooms.length} room{availableRooms.length !== 1 ? 's' : ''} available
//                       </span>
//                       <span className="text-gray-700 font-bold">
//                         From Rs. {Math.min(...availableRooms.map(room => room.price)) || 0}
//                       </span>
//                     </div>

//                     {/* View Rooms Button */}
//                     <button
//                       onClick={() => handleViewRooms(hotel)}
//                       className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
//                     >
//                       View Rooms
//                     </button>
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

/////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [allBookings, setAllBookings] = useState([]); // Store all bookings

  const navigate = useNavigate();

  // Fetch all hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/hotels");
        console.log("Hotels data:", res.data);
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Fetch all bookings to check room status
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setAllBookings(res.data);
        console.log("All bookings:", res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // Helper function to check if a room is booked
  const isRoomBooked = (room) => {
    if (!allBookings || allBookings.length === 0) return false;
    
    return allBookings.some(booking => {
      const roomMatch = booking.roomName === room.name || 
                       booking.roomId === room._id ||
                       booking.roomName === room._id;
      
      return roomMatch && (booking.isPaid === true || booking.status === 'confirmed');
    });
  };

  // Get room status
  const getRoomStatus = (room) => {
    if (room.available === false) {
      return {
        status: 'unavailable',
        label: 'Not Available',
        badge: '🔴 Not Available',
        badgeClass: 'bg-gray-100 text-gray-600'
      };
    }
    
    if (isRoomBooked(room)) {
      return {
        status: 'booked',
        label: 'Booked',
        badge: '🟡 Booked',
        badgeClass: 'bg-yellow-100 text-yellow-700'
      };
    }
    
    return {
      status: 'available',
      label: 'Available',
      badge: '🟢 Available',
      badgeClass: 'bg-green-100 text-green-700'
    };
  };

  // Get hotel booking status
  const getHotelBookingStatus = (hotel) => {
    if (!hotel.rooms || hotel.rooms.length === 0) {
      return {
        status: 'no_rooms',
        message: 'No Rooms',
        badge: '⚪ No Rooms',
        badgeClass: 'bg-gray-100 text-gray-600'
      };
    }

    const roomStatuses = hotel.rooms.map(room => getRoomStatus(room).status);
    const availableCount = roomStatuses.filter(s => s === 'available').length;
    const bookedCount = roomStatuses.filter(s => s === 'booked').length;
    const unavailableCount = roomStatuses.filter(s => s === 'unavailable').length;

    // Check if all rooms are booked or unavailable
    if (availableCount === 0) {
      if (bookedCount > 0 && unavailableCount > 0) {
        return {
          status: 'mixed_full',
          message: 'Fully Booked/Unavailable',
          badge: '🔴 Fully Booked',
          badgeClass: 'bg-red-100 text-red-700',
          counts: { available: 0, booked: bookedCount, unavailable: unavailableCount }
        };
      } else if (bookedCount > 0) {
        return {
          status: 'full_booking',
          message: 'Fully Booked',
          badge: '🔴 Fully Booked',
          badgeClass: 'bg-red-100 text-red-700',
          counts: { available: 0, booked: bookedCount, unavailable: 0 }
        };
      } else if (unavailableCount > 0) {
        return {
          status: 'all_unavailable',
          message: 'Not Available',
          badge: '⚪ Not Available',
          badgeClass: 'bg-gray-100 text-gray-600',
          counts: { available: 0, booked: 0, unavailable: unavailableCount }
        };
      }
    }

    // Some rooms available
    return {
      status: 'available',
      message: 'Rooms Available',
      badge: '🟢 Available',
      badgeClass: 'bg-green-100 text-green-700',
      counts: { available: availableCount, booked: bookedCount, unavailable: unavailableCount }
    };
  };

  // Filter hotels based on search
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle view rooms
  const handleViewRooms = (hotel) => {
    navigate('/hotelroom', { 
      state: { 
        hotel,
        allBookings 
      } 
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
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
                placeholder="Search by hotel name or location..."
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

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-gray-600">
                {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
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

      {/* Hotels List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Hotels Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => {
              const bookingStatus = getHotelBookingStatus(hotel);
              
              return (
                <div key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  {/* Hotel Image */}
                  {hotel.images && hotel.images.length > 0 ? (
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Hotel+Image";
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bookingStatus.badgeClass}`}>
                        {bookingStatus.badge}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2 flex items-center">
                      📍 {hotel.location}
                    </p>
                    
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {hotel.description}
                    </p>

                    {/* Hotel Rating */}
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-gray-700 ml-1">
                        {hotel.rating || "No rating yet"}
                      </span>
                    </div>

                    {/* Room Status Summary */}
                    {bookingStatus.counts ? (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bookingStatus.counts.available > 0 && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            🟢 {bookingStatus.counts.available} Available
                          </span>
                        )}
                        {bookingStatus.counts.booked > 0 && (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            🟡 {bookingStatus.counts.booked} Booked
                          </span>
                        )}
                        {bookingStatus.counts.unavailable > 0 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            🔴 {bookingStatus.counts.unavailable} Unavailable
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mb-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          ⚪ No rooms available
                        </span>
                      </div>
                    )}

                    {/* Price Range */}
                    {hotel.rooms && hotel.rooms.length > 0 && (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-bold">
                          From Rs. {Math.min(...hotel.rooms.map(room => room.price))}
                        </span>
                      </div>
                    )}

                    {/* View Rooms Button */}
                    <button
                      onClick={() => handleViewRooms(hotel)}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
                        bookingStatus.status === 'available'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
                          : bookingStatus.status === 'full_booking'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : bookingStatus.status === 'all_unavailable'
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
                      }`}
                    >
                      {bookingStatus.status === 'full_booking' 
                        ? '🔴 Fully Booked - View Details' 
                        : bookingStatus.status === 'all_unavailable'
                          ? '⚪ Not Available'
                          : 'View Rooms'}
                    </button>

                    {/* Full Booking Message */}
                    {bookingStatus.status === 'full_booking' && (
                      <p className="text-red-600 text-xs mt-2 text-center">
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

      {/* Booking Statistics */}
      {allBookings.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              📊 Total Bookings: {allBookings.length} | 
              Confirmed: {allBookings.filter(b => b.isPaid).length} | 
              Pending: {allBookings.filter(b => !b.isPaid).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}