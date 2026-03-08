
// // import React, { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { Calendar, User, Mail, Phone, Users, MessageSquare } from "lucide-react";

// // export default function Booking() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { room, hotel } = location.state || {};

// //   const [bookingForm, setBookingForm] = useState({
// //     checkIn: "",
// //     checkOut: "",
// //     guests: 1,
// //     customerName: "",
// //     customerEmail: "",
// //     customerPhone: "",
// //     specialRequests: ""
// //   });
  
// //   const [bookingLoading, setBookingLoading] = useState(false);
// //   const [userLoading, setUserLoading] = useState(true);

// //   // Fetch user data if logged in
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
    
// //     if (!token) {
// //       setUserLoading(false);
// //       return;
// //     }

// //     const fetchUserProfile = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:5000/api/auth/profile",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const user = response.data.user;
// //         setBookingForm(prev => ({
// //           ...prev,
// //           customerName: `${user.firstName} ${user.lastName}`,
// //           customerEmail: user.email,
// //           customerPhone: user.phone || "",
// //         }));
// //       } catch (error) {
// //         console.error("Failed to fetch user profile:", error);
// //       } finally {
// //         setUserLoading(false);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, []);

// //   if (!room || !hotel) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
// //           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
// //             </svg>
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Information Not Found</h2>
// //           <p className="text-gray-600 mb-8">Please select a room to book first.</p>
// //           <button 
// //             onClick={() => navigate('/rooms')}
// //             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
// //           >
// //             Back to Hotels
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

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
// //     const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
// //     return nights > 0 ? nights : 1;
// //   };

// //   // Submit booking to backend
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

// //     if (new Date(bookingForm.checkIn) < new Date().setHours(0, 0, 0, 0)) {
// //       alert("Check-in date cannot be in the past");
// //       return;
// //     }

// //     try {
// //       setBookingLoading(true);
// //       const token = localStorage.getItem("token");

// //       // Prepare booking data
// //       const bookingData = {
// //         hotelId: hotel._id,
// //         hotelName: hotel.name,
// //         roomId: room._id,
// //         roomName: room.name,
// //         roomType: room.type,
// //         pricePerNight: room.price,
// //         checkIn: bookingForm.checkIn,
// //         checkOut: bookingForm.checkOut,
// //         guests: parseInt(bookingForm.guests),
// //         customerName: bookingForm.customerName,
// //         customerEmail: bookingForm.customerEmail,
// //         customerPhone: bookingForm.customerPhone,
// //         specialRequests: bookingForm.specialRequests,
// //         totalAmount: calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut),
// //         bookingDate: new Date().toISOString(),
// //         status: "confirmed"
// //       };

// //       console.log("Sending booking data:", bookingData);

// //       // Make API call with auth header if token exists
// //       const config = token ? {
// //         headers: { Authorization: `Bearer ${token}` }
// //       } : {};

// //       const response = await axios.post("http://localhost:5000/api/bookings", bookingData, config);
      
// //       if (response.status === 201) {
// //         const savedBooking = response.data.booking;
        
// //         // Success modal
// //         const successMessage = `🎉 Booking Confirmed!\n\n📋 Booking Reference: ${savedBooking._id}\n🏨 ${room.name} at ${hotel.name}\n📅 Check-in: ${bookingForm.checkIn}\n📅 Check-out: ${bookingForm.checkOut}\n💰 Total: Rs. ${savedBooking.totalAmount}\n📧 Confirmation sent to ${bookingForm.customerEmail}`;
        
// //         alert(successMessage);
        
// //         // Reset form
// //         setBookingForm({
// //           checkIn: "",
// //           checkOut: "",
// //           guests: 1,
// //           customerName: "",
// //           customerEmail: "",
// //           customerPhone: "",
// //           specialRequests: ""
// //         });
        
// //         // Navigate to my bookings if logged in, else to rooms
// //         if (token) {
// //           navigate('/mybookings');
// //         } else {
// //           navigate('/rooms');
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Booking error:", err);
// //       const errorMessage = err.response?.data?.message || "Failed to process booking. Please try again.";
// //       alert(`Booking failed: ${errorMessage}`);
// //     } finally {
// //       setBookingLoading(false);
// //     }
// //   };

// //   const totalAmount = calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut);
// //   const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
// //       <div className="max-w-6xl mx-auto px-4">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center mb-6 transform hover:-translate-y-0.5"
// //           >
// //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //             </svg>
// //             Back
// //           </button>
// //           <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
// //             Complete Your Booking
// //           </h1>
// //           <p className="text-gray-600 text-lg">Please fill in your details to confirm the booking</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Booking Form - 2/3 width */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
// //               <div className="flex items-center mb-8">
// //                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4">
// //                   <User className="w-6 h-6 text-white" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-gray-800">Guest Information</h2>
// //               </div>

// //               <form onSubmit={handleBookingSubmit} className="space-y-8">
// //                 {/* Dates and Guests */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
// //                   <div className="flex items-center mb-4">
// //                     <Calendar className="w-5 h-5 text-blue-600 mr-2" />
// //                     <h3 className="text-lg font-semibold text-gray-800">Dates & Guests</h3>
// //                   </div>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Check-in Date *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="date"
// //                           name="checkIn"
// //                           value={bookingForm.checkIn}
// //                           onChange={handleBookingChange}
// //                           min={new Date().toISOString().split('T')[0]}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Check-out Date *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="date"
// //                           name="checkOut"
// //                           value={bookingForm.checkOut}
// //                           onChange={handleBookingChange}
// //                           min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Number of Guests *
// //                       </label>
// //                       <div className="relative">
// //                         <select
// //                           name="guests"
// //                           value={bookingForm.guests}
// //                           onChange={handleBookingChange}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 appearance-none"
// //                         >
// //                           {[1, 2, 3, 4, 5, 6].map(num => (
// //                             <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
// //                           ))}
// //                         </select>
// //                         <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Personal Information */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
// //                   <div className="flex items-center mb-4">
// //                     <User className="w-5 h-5 text-blue-600 mr-2" />
// //                     <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
// //                   </div>
                  
// //                   <div className="space-y-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Full Name *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           name="customerName"
// //                           value={bookingForm.customerName}
// //                           onChange={handleBookingChange}
// //                           placeholder="Enter your full name"
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Email Address *
// //                         </label>
// //                         <div className="relative">
// //                           <input
// //                             type="email"
// //                             name="customerEmail"
// //                             value={bookingForm.customerEmail}
// //                             onChange={handleBookingChange}
// //                             placeholder="Enter your email"
// //                             required
// //                             disabled={bookingLoading || userLoading}
// //                             className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                           />
// //                           <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                         </div>
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Phone Number *
// //                         </label>
// //                         <div className="relative">
// //                           <input
// //                             type="tel"
// //                             name="customerPhone"
// //                             value={bookingForm.customerPhone}
// //                             onChange={handleBookingChange}
// //                             placeholder="Enter your phone number"
// //                             required
// //                             disabled={bookingLoading || userLoading}
// //                             className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                           />
// //                           <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Special Requests (Optional)
// //                       </label>
// //                       <div className="relative">
// //                         <textarea
// //                           name="specialRequests"
// //                           value={bookingForm.specialRequests}
// //                           onChange={handleBookingChange}
// //                           placeholder="Any special requests or requirements..."
// //                           rows="4"
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 resize-none"
// //                         />
// //                         <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-6 pt-6">
// //                   <button
// //                     type="button"
// //                     onClick={() => navigate(-1)}
// //                     disabled={bookingLoading || userLoading}
// //                     className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={bookingLoading || userLoading}
// //                     className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center text-lg"
// //                   >
// //                     {bookingLoading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
// //                         Processing Booking...
// //                       </>
// //                     ) : userLoading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
// //                         Loading Profile...
// //                       </>
// //                     ) : (
// //                       "Confirm Booking"
// //                     )}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           {/* Booking Summary - 1/3 width */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300 sticky top-8">
// //               <div className="flex items-center mb-8">
// //                 <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                   </svg>
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-gray-800">Booking Summary</h2>
// //               </div>

// //               {/* Room Info */}
// //               <div className="mb-8">
// //                 <div className="relative overflow-hidden rounded-xl mb-6 group">
// //                   {room.images && room.images.length > 0 ? (
// //                     <img
// //                       src={room.images[0]}
// //                       alt={room.name}
// //                       className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
// //                       onError={(e) => {
// //                         e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
// //                       }}
// //                     />
// //                   ) : (
// //                     <img
// //                       src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
// //                       alt={room.name}
// //                       className="w-full h-48 object-cover rounded-xl"
// //                     />
// //                   )}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
// //                   <div className="absolute bottom-4 left-4 text-white">
// //                     <p className="text-sm opacity-90">{hotel.name}</p>
// //                   </div>
// //                 </div>
// //                 <h3 className="font-bold text-xl text-gray-800 mb-2">{room.name}</h3>
// //                 <p className="text-gray-600 mb-3">{hotel.location}</p>
// //                 <div className="inline-block bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
// //                   {room.type} Room
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-4 border-t border-gray-200 pt-6">
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Room Price</span>
// //                   <span className="text-gray-800 font-semibold">Rs. {room.price} / night</span>
// //                 </div>

// //                 {bookingForm.checkIn && bookingForm.checkOut && (
// //                   <>
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-gray-600">Nights</span>
// //                       <span className="text-gray-800 font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span>
// //                     </div>
                    
// //                     <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-4 mt-4">
// //                       <span className="text-gray-800">Total Amount</span>
// //                       <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
// //                         Rs. {totalAmount}
// //                       </span>
// //                     </div>

// //                     <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mt-6">
// //                       <div className="flex items-center justify-center">
// //                         <Calendar className="w-5 h-5 text-blue-600 mr-2" />
// //                         <p className="text-blue-800 font-medium">
// //                           {new Date(bookingForm.checkIn).toLocaleDateString('en-US', { 
// //                             weekday: 'short', 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })} - {new Date(bookingForm.checkOut).toLocaleDateString('en-US', { 
// //                             weekday: 'short', 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </>
// //                 )}

// //                 {(!bookingForm.checkIn || !bookingForm.checkOut) && (
// //                   <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mt-4">
// //                     <div className="flex items-center justify-center">
// //                       <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
// //                       <p className="text-yellow-800 font-medium">
// //                         Select dates to see total amount
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Hotel Contact Info */}
// //               <div className="mt-8 pt-6 border-t border-gray-200">
// //                 <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
// //                   <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                   Hotel Contact
// //                 </h4>
// //                 <div className="space-y-2">
// //                   <p className="text-gray-600 flex items-center">
// //                     <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     </svg>
// //                     {hotel.location}
// //                   </p>
// //                   {hotel.contact && (
// //                     <p className="text-gray-600 flex items-center">
// //                       <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                       </svg>
// //                       {hotel.contact}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Info Banner */}
// //         <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
// //           <div className="flex items-center">
// //             <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //             <div>
// //               <p className="text-gray-700">
// //                 <span className="font-semibold">Note:</span> Your booking will be confirmed instantly. 
// //                 A confirmation email will be sent to your provided email address. 
// //                 For any changes or cancellations, please contact the hotel directly.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// //////////////////////email correct code /////////////////////////

// // import React, { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { Calendar, User, Mail, Phone, Users, MessageSquare } from "lucide-react";

// // export default function Booking() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { room, hotel } = location.state || {};

// //   const [bookingForm, setBookingForm] = useState({
// //     checkIn: "",
// //     checkOut: "",
// //     guests: 1,
// //     customerName: "",
// //     customerEmail: "",
// //     customerPhone: "",
// //     specialRequests: ""
// //   });
  
// //   const [bookingLoading, setBookingLoading] = useState(false);
// //   const [userLoading, setUserLoading] = useState(true);

// //   // Fetch user data if logged in
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
    
// //     if (!token) {
// //       setUserLoading(false);
// //       return;
// //     }

// //     const fetchUserProfile = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:5000/api/auth/profile",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const user = response.data.user;
// //         setBookingForm(prev => ({
// //           ...prev,
// //           customerName: `${user.firstName} ${user.lastName}`,
// //           customerEmail: user.email,
// //           customerPhone: user.phone || "",
// //         }));
// //       } catch (error) {
// //         console.error("Failed to fetch user profile:", error);
// //       } finally {
// //         setUserLoading(false);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, []);

// //   if (!room || !hotel) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
// //           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
// //             </svg>
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Information Not Found</h2>
// //           <p className="text-gray-600 mb-8">Please select a room to book first.</p>
// //           <button 
// //             onClick={() => navigate('/rooms')}
// //             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
// //           >
// //             Back to Hotels
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

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
// //     const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
// //     return nights > 0 ? nights : 1;
// //   };

// //   // Submit booking to backend
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

// //     if (new Date(bookingForm.checkIn) < new Date().setHours(0, 0, 0, 0)) {
// //       alert("Check-in date cannot be in the past");
// //       return;
// //     }

// //     try {
// //       setBookingLoading(true);
// //       const token = localStorage.getItem("token");

// //       // Prepare booking data
// //       const bookingData = {
// //         hotelId: hotel._id,
// //         hotelName: hotel.name,
// //         roomId: room._id,
// //         roomName: room.name,
// //         roomType: room.type,
// //         pricePerNight: room.price,
// //         checkIn: bookingForm.checkIn,
// //         checkOut: bookingForm.checkOut,
// //         guests: parseInt(bookingForm.guests),
// //         customerName: bookingForm.customerName,
// //         customerEmail: bookingForm.customerEmail,
// //         customerPhone: bookingForm.customerPhone,
// //         specialRequests: bookingForm.specialRequests,
// //         totalAmount: calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut),
// //         bookingDate: new Date().toISOString(),
// //         status: "confirmed"
// //       };

// //       console.log("Sending booking data:", bookingData);

// //       // Make API call with auth header if token exists
// //       const config = token ? {
// //         headers: { Authorization: `Bearer ${token}` }
// //       } : {};

// //       const response = await axios.post("http://localhost:5000/api/bookings", bookingData, config);
      
// //       if (response.status === 201) {
// //         const savedBooking = response.data.booking;
        
// //         // **Enhanced success message with email confirmation**
// //         const successMessage = `🎉 Booking Confirmed!\n\n` +
// //           `📋 Booking Reference: ${savedBooking._id}\n` +
// //           `🏨 ${room.name} at ${hotel.name}\n` +
// //           `📅 Check-in: ${bookingForm.checkIn}\n` +
// //           `📅 Check-out: ${bookingForm.checkOut}\n` +
// //           `💰 Total: Rs. ${savedBooking.totalAmount}\n` +
// //           `📧 Confirmation email sent to: ${bookingForm.customerEmail}\n\n` +
// //           `Please check your email for booking details and invoice.`;
        
// //         alert(successMessage);
        
// //         // Reset form
// //         setBookingForm({
// //           checkIn: "",
// //           checkOut: "",
// //           guests: 1,
// //           customerName: "",
// //           customerEmail: "",
// //           customerPhone: "",
// //           specialRequests: ""
// //         });
        
// //         // Navigate to my bookings if logged in, else to rooms
// //         if (token) {
// //           navigate('/mybookings');
// //         } else {
// //           navigate('/rooms');
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Booking error:", err);
// //       const errorMessage = err.response?.data?.message || "Failed to process booking. Please try again.";
// //       alert(`Booking failed: ${errorMessage}`);
// //     } finally {
// //       setBookingLoading(false);
// //     }
// //   };

// //   const totalAmount = calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut);
// //   const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
// //       <div className="max-w-6xl mx-auto px-4">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <button 
// //             onClick={() => navigate(-1)}
// //             className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center mb-6 transform hover:-translate-y-0.5"
// //           >
// //             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //             </svg>
// //             Back
// //           </button>
// //           <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
// //             Complete Your Booking
// //           </h1>
// //           <p className="text-gray-600 text-lg">Please fill in your details to confirm the booking</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Booking Form - 2/3 width */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
// //               <div className="flex items-center mb-8">
// //                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4">
// //                   <User className="w-6 h-6 text-white" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-gray-800">Guest Information</h2>
// //               </div>

// //               <form onSubmit={handleBookingSubmit} className="space-y-8">
// //                 {/* Dates and Guests */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
// //                   <div className="flex items-center mb-4">
// //                     <Calendar className="w-5 h-5 text-blue-600 mr-2" />
// //                     <h3 className="text-lg font-semibold text-gray-800">Dates & Guests</h3>
// //                   </div>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Check-in Date *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="date"
// //                           name="checkIn"
// //                           value={bookingForm.checkIn}
// //                           onChange={handleBookingChange}
// //                           min={new Date().toISOString().split('T')[0]}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
                    
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Check-out Date *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="date"
// //                           name="checkOut"
// //                           value={bookingForm.checkOut}
// //                           onChange={handleBookingChange}
// //                           min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Number of Guests *
// //                       </label>
// //                       <div className="relative">
// //                         <select
// //                           name="guests"
// //                           value={bookingForm.guests}
// //                           onChange={handleBookingChange}
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 appearance-none"
// //                         >
// //                           {[1, 2, 3, 4, 5, 6].map(num => (
// //                             <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
// //                           ))}
// //                         </select>
// //                         <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Personal Information */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
// //                   <div className="flex items-center mb-4">
// //                     <User className="w-5 h-5 text-blue-600 mr-2" />
// //                     <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
// //                   </div>
                  
// //                   <div className="space-y-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Full Name *
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           name="customerName"
// //                           value={bookingForm.customerName}
// //                           onChange={handleBookingChange}
// //                           placeholder="Enter your full name"
// //                           required
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                         />
// //                         <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Email Address *
// //                         </label>
// //                         <div className="relative">
// //                           <input
// //                             type="email"
// //                             name="customerEmail"
// //                             value={bookingForm.customerEmail}
// //                             onChange={handleBookingChange}
// //                             placeholder="Enter your email"
// //                             required
// //                             disabled={bookingLoading || userLoading}
// //                             className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                           />
// //                           <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                         </div>
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Phone Number *
// //                         </label>
// //                         <div className="relative">
// //                           <input
// //                             type="tel"
// //                             name="customerPhone"
// //                             value={bookingForm.customerPhone}
// //                             onChange={handleBookingChange}
// //                             placeholder="Enter your phone number"
// //                             required
// //                             disabled={bookingLoading || userLoading}
// //                             className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
// //                           />
// //                           <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Special Requests (Optional)
// //                       </label>
// //                       <div className="relative">
// //                         <textarea
// //                           name="specialRequests"
// //                           value={bookingForm.specialRequests}
// //                           onChange={handleBookingChange}
// //                           placeholder="Any special requests or requirements..."
// //                           rows="4"
// //                           disabled={bookingLoading || userLoading}
// //                           className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 resize-none"
// //                         />
// //                         <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-6 pt-6">
// //                   <button
// //                     type="button"
// //                     onClick={() => navigate(-1)}
// //                     disabled={bookingLoading || userLoading}
// //                     className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={bookingLoading || userLoading}
// //                     className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center text-lg"
// //                   >
// //                     {bookingLoading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
// //                         Processing Booking...
// //                       </>
// //                     ) : userLoading ? (
// //                       <>
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
// //                         Loading Profile...
// //                       </>
// //                     ) : (
// //                       "Confirm Booking"
// //                     )}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           {/* Booking Summary - 1/3 width */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300 sticky top-8">
// //               <div className="flex items-center mb-8">
// //                 <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                   </svg>
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-gray-800">Booking Summary</h2>
// //               </div>

// //               {/* Room Info */}
// //               <div className="mb-8">
// //                 <div className="relative overflow-hidden rounded-xl mb-6 group">
// //                   {room.images && room.images.length > 0 ? (
// //                     <img
// //                       src={room.images[0]}
// //                       alt={room.name}
// //                       className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
// //                       onError={(e) => {
// //                         e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
// //                       }}
// //                     />
// //                   ) : (
// //                     <img
// //                       src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
// //                       alt={room.name}
// //                       className="w-full h-48 object-cover rounded-xl"
// //                     />
// //                   )}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
// //                   <div className="absolute bottom-4 left-4 text-white">
// //                     <p className="text-sm opacity-90">{hotel.name}</p>
// //                   </div>
// //                 </div>
// //                 <h3 className="font-bold text-xl text-gray-800 mb-2">{room.name}</h3>
// //                 <p className="text-gray-600 mb-3">{hotel.location}</p>
// //                 <div className="inline-block bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
// //                   {room.type} Room
// //                 </div>
// //               </div>

// //               {/* Price Breakdown */}
// //               <div className="space-y-4 border-t border-gray-200 pt-6">
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Room Price</span>
// //                   <span className="text-gray-800 font-semibold">Rs. {room.price} / night</span>
// //                 </div>

// //                 {bookingForm.checkIn && bookingForm.checkOut && (
// //                   <>
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-gray-600">Nights</span>
// //                       <span className="text-gray-800 font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span>
// //                     </div>
                    
// //                     <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-4 mt-4">
// //                       <span className="text-gray-800">Total Amount</span>
// //                       <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
// //                         Rs. {totalAmount}
// //                       </span>
// //                     </div>

// //                     <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mt-6">
// //                       <div className="flex items-center justify-center">
// //                         <Calendar className="w-5 h-5 text-blue-600 mr-2" />
// //                         <p className="text-blue-800 font-medium">
// //                           {new Date(bookingForm.checkIn).toLocaleDateString('en-US', { 
// //                             weekday: 'short', 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })} - {new Date(bookingForm.checkOut).toLocaleDateString('en-US', { 
// //                             weekday: 'short', 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </>
// //                 )}

// //                 {(!bookingForm.checkIn || !bookingForm.checkOut) && (
// //                   <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mt-4">
// //                     <div className="flex items-center justify-center">
// //                       <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
// //                       <p className="text-yellow-800 font-medium">
// //                         Select dates to see total amount
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Hotel Contact Info */}
// //               <div className="mt-8 pt-6 border-t border-gray-200">
// //                 <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
// //                   <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                   Hotel Contact
// //                 </h4>
// //                 <div className="space-y-2">
// //                   <p className="text-gray-600 flex items-center">
// //                     <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     </svg>
// //                     {hotel.location}
// //                   </p>
// //                   {hotel.contact && (
// //                     <p className="text-gray-600 flex items-center">
// //                       <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                       </svg>
// //                       {hotel.contact}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Email Confirmation Badge */}
// //               <div className="mt-6 pt-4 border-t border-gray-200">
// //                 <div className="flex items-center text-sm text-green-600">
// //                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                   </svg>
// //                   <span>Confirmation email will be sent to your inbox</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Info Banner - Updated with email info */}
// //         <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
// //           <div className="flex items-center">
// //             <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //             <div>
// //               <p className="text-gray-700">
// //                 <span className="font-semibold">Note:</span> Your booking will be confirmed instantly. 
// //                 <span className="text-green-600 font-semibold"> A confirmation email with invoice will be sent to {bookingForm.customerEmail || 'your email'}</span>
// //                 For any changes or cancellations, please contact the hotel directly.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// //////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, User, Mail, Phone, Users, MessageSquare } from "lucide-react";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room, hotel } = location.state || {};

  const [bookingForm, setBookingForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    specialRequests: ""
  });
  
  const [bookingLoading, setBookingLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch user data if logged in
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token ? "Token exists" : "No token");
      
      if (!token) {
        console.log("User not logged in - showing empty form");
        setUserLoading(false);
        return;
      }

      try {
        console.log("Fetching user profile from API...");
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data && response.data.user) {
          const user = response.data.user;
          console.log("User data received:", user);
          
          setBookingForm(prev => ({
            ...prev,
            customerName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            customerEmail: user.email || '',
            customerPhone: user.phone || '',
          }));
          
          console.log("Form updated with user data");
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setFetchError("Could not load user profile. Please fill manually.");
        
        if (error.response?.status === 401) {
          console.log("Token expired - removing token");
          localStorage.removeItem("token");
        }
      } finally {
        setUserLoading(false);
        console.log("User loading completed");
      }
    };

    fetchUserProfile();
  }, []);

  if (!room || !hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Information Not Found</h2>
          <p className="text-gray-600 mb-8">Please select a room to book first.</p>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate total amount
  const calculateTotalAmount = (price, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return price;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return price * (nights || 1);
  };

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  // Submit booking to backend
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingForm.checkIn || !bookingForm.checkOut || !bookingForm.customerName || 
        !bookingForm.customerEmail || !bookingForm.customerPhone) {
      alert("Please fill in all required fields");
      return;
    }

    if (new Date(bookingForm.checkIn) >= new Date(bookingForm.checkOut)) {
      alert("Check-out date must be after check-in date");
      return;
    }

    if (new Date(bookingForm.checkIn) < new Date().setHours(0, 0, 0, 0)) {
      alert("Check-in date cannot be in the past");
      return;
    }

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");

      // Prepare booking data
      const bookingData = {
        hotelId: hotel._id,
        hotelName: hotel.name,
        roomId: room._id,
        roomName: room.name,
        roomType: room.type,
        pricePerNight: room.price,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: parseInt(bookingForm.guests),
        customerName: bookingForm.customerName,
        customerEmail: bookingForm.customerEmail,
        customerPhone: bookingForm.customerPhone,
        specialRequests: bookingForm.specialRequests,
        totalAmount: calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut),
        bookingDate: new Date().toISOString(),
        status: "confirmed"
      };

      console.log("Sending booking data:", bookingData);

      // Make API call with auth header if token exists
      const config = token ? {
        headers: { Authorization: `Bearer ${token}` }
      } : {};

      const response = await axios.post("http://localhost:5000/api/bookings", bookingData, config);
      
      if (response.status === 201) {
        const savedBooking = response.data.booking;
        
        // Success message with email confirmation
        const successMessage = `🎉 Booking Confirmed!\n\n` +
          `📋 Booking Reference: ${savedBooking._id}\n` +
          `🏨 ${room.name} at ${hotel.name}\n` +
          `📅 Check-in: ${bookingForm.checkIn}\n` +
          `📅 Check-out: ${bookingForm.checkOut}\n` +
          `💰 Total: Rs. ${savedBooking.totalAmount}\n` +
          `📧 Confirmation email sent to: ${bookingForm.customerEmail}\n\n` +
          `Please check your email for booking details and invoice.`;
        
        alert(successMessage);
        
        // Navigate to my bookings if logged in, else to rooms
        if (token) {
          navigate('/mybookings');
        } else {
          navigate('/rooms');
        }
      }
    } catch (err) {
      console.error("Booking error:", err);
      const errorMessage = err.response?.data?.message || "Failed to process booking. Please try again.";
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const totalAmount = calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut);
  const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center mb-6 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 text-lg">Please fill in your details to confirm the booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Guest Information</h2>
              </div>

              {fetchError && (
                <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <p className="text-yellow-700 text-sm">{fetchError}</p>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Dates and Guests */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Dates & Guests</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="checkIn"
                          value={bookingForm.checkIn}
                          onChange={handleBookingChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          disabled={bookingLoading || userLoading}
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
                        />
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="checkOut"
                          value={bookingForm.checkOut}
                          onChange={handleBookingChange}
                          min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                          required
                          disabled={bookingLoading || userLoading}
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
                        />
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <select
                          name="guests"
                          value={bookingForm.guests}
                          onChange={handleBookingChange}
                          required
                          disabled={bookingLoading || userLoading}
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                        <Users className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="customerName"
                          value={bookingForm.customerName}
                          onChange={handleBookingChange}
                          placeholder="Enter your full name"
                          required
                          disabled={bookingLoading || userLoading}
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
                        />
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="customerEmail"
                            value={bookingForm.customerEmail}
                            onChange={handleBookingChange}
                            placeholder="Enter your email"
                            required
                            disabled={bookingLoading || userLoading}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
                          />
                          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="customerPhone"
                            value={bookingForm.customerPhone}
                            onChange={handleBookingChange}
                            placeholder="Enter your phone number"
                            required
                            disabled={bookingLoading || userLoading}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300"
                          />
                          <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <div className="relative">
                        <textarea
                          name="specialRequests"
                          value={bookingForm.specialRequests}
                          onChange={handleBookingChange}
                          placeholder="Any special requests or requirements..."
                          rows="4"
                          disabled={bookingLoading || userLoading}
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 hover:border-blue-300 resize-none"
                        />
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={bookingLoading || userLoading}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingLoading || userLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center text-lg"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Booking...
                      </>
                    ) : userLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Loading Profile...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300 sticky top-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Booking Summary</h2>
              </div>

              {/* Room Info */}
              <div className="mb-8">
                <div className="relative overflow-hidden rounded-xl mb-6 group">
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop";
                      }}
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
                      alt={room.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">{hotel.name}</p>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-3">{hotel.location}</p>
                <div className="inline-block bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {room.type} Room
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Room Price</span>
                  <span className="text-gray-800 font-semibold">Rs. {room.price} / night</span>
                </div>

                {bookingForm.checkIn && bookingForm.checkOut && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Nights</span>
                      <span className="text-gray-800 font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-4 mt-4">
                      <span className="text-gray-800">Total Amount</span>
                      <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                        Rs. {totalAmount}
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mt-6">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <p className="text-blue-800 font-medium">
                          {new Date(bookingForm.checkIn).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} - {new Date(bookingForm.checkOut).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {(!bookingForm.checkIn || !bookingForm.checkOut) && (
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mt-4">
                    <div className="flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                      <p className="text-yellow-800 font-medium">
                        Select dates to see total amount
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hotel Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Hotel Contact
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {hotel.location}
                  </p>
                  {hotel.contact && (
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {hotel.contact}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Confirmation Badge */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-green-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Confirmation email will be sent to your inbox</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner - Updated with email info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span> Your booking will be confirmed instantly. 
                <span className="text-green-600 font-semibold"> A confirmation email with invoice will be sent to {bookingForm.customerEmail || 'your email'}</span>
                For any changes or cancellations, please contact the hotel directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//////////////////////
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Calendar,
//   Hotel,
//   MapPin,
//   CreditCard,
//   Download,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Users,
//   Clock,
//   AlertCircle,
//   Printer,
//   FileText,
//   ChevronLeft,
// } from "lucide-react";

// export default function MyBookings() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [downloadingInvoice, setDownloadingInvoice] = useState(null);
//   const [debugInfo, setDebugInfo] = useState(null);

//   // Fetch user's bookings
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         // First get user profile to get email
//         const profileResponse = await axios.get(
//           "http://localhost:5000/api/auth/profile",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const email = profileResponse.data.user.email;

//         // Then fetch all bookings and filter by user email
//         await fetchUserBookings(email, token);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load your profile. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const fetchUserBookings = async (email, token) => {
//     try {
//       const bookingsResponse = await axios.get(
//         "http://localhost:5000/api/bookings",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Filter bookings by user email
//       const userBookings = bookingsResponse.data.filter(
//         (booking) => booking.customerEmail === email
//       );

//       setBookings(userBookings);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError("Failed to load your bookings. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Download invoice function
//   const downloadInvoice = async (booking) => {
//     try {
//       setDownloadingInvoice(booking._id);

//       // Create invoice HTML content
//       const invoiceContent = generateInvoiceHTML(booking);

//       // Create blob and download
//       const blob = new Blob([invoiceContent], { type: "text/html" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `invoice-${booking._id.slice(-8)}-${booking.hotelName.replace(
//         /\s+/g,
//         "-"
//       )}.html`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Error downloading invoice:", err);
//       alert("Failed to download invoice. Please try again.");
//     } finally {
//       setDownloadingInvoice(null);
//     }
//   };

//   // Generate Invoice HTML with Tailwind CSS classes
//   const generateInvoiceHTML = (booking) => {
//     const formatDate = (dateString) => {
//       return new Date(dateString).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     };

//     const calculateNights = (checkIn, checkOut) => {
//       const nights = Math.ceil(
//         (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
//       );
//       return nights > 0 ? nights : 1;
//     };

//     const nights = calculateNights(booking.checkIn, booking.checkOut);
//     const subtotal = booking.pricePerNight * nights;
//     const tax = subtotal * 0.1; // 10% tax

//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Invoice - ${booking.hotelName}</title>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <script src="https://cdn.tailwindcss.com"></script>
//         <style>
//           /* Print helpers */
//           @media print {
//             .no-print { display: none !important; }
//             body { background: white !important; }
//           }
//         </style>
//       </head>
//       <body class="bg-slate-50">
//         <!-- Top bar -->
//         <div class="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 py-6">
//           <div class="max-w-4xl mx-auto px-6">
//             <div class="flex items-center justify-between text-white">
//               <div>
//                 <div class="text-sm opacity-90">ParadiseLankaStay</div>
//                 <div class="text-2xl font-bold">Booking Invoice</div>
//               </div>
//               <div class="text-right">
//                 <div class="text-xs uppercase tracking-wider opacity-90">Invoice</div>
//                 <div class="text-lg font-semibold">INV-${booking._id.slice(-8)}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="max-w-4xl mx-auto p-6 md:p-8">
//           <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
//             <!-- Header -->
//             <div class="p-8">
//               <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//                 <div>
//                   <h1 class="text-3xl font-extrabold text-slate-900 mb-2">
//                     🧾 Hotel Booking Invoice
//                   </h1>
//                   <p class="text-slate-600">
//                     Thank you for choosing <span class="font-semibold text-slate-800">${booking.hotelName}</span>
//                   </p>
//                 </div>

//                 <div class="w-full md:w-auto">
//                   <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
//                     <div class="grid grid-cols-3 gap-4">
//                       <div class="col-span-1">
//                         <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Invoice No</div>
//                         <div class="text-sm font-bold text-slate-800">INV-${booking._id.slice(-8)}</div>
//                       </div>
//                       <div class="col-span-1">
//                         <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Date</div>
//                         <div class="text-sm font-bold text-slate-800">${formatDate(new Date())}</div>
//                       </div>
//                       <div class="col-span-1 text-right">
//                         <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</div>
//                         <span class="inline-flex items-center justify-center mt-1 px-3 py-1 ${
//                           booking.isPaid ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
//                         } rounded-full text-xs font-bold">
//                           ${booking.isPaid ? "PAID" : "PENDING"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <!-- Hotel Info Card -->
//               <div class="mt-8 rounded-2xl overflow-hidden border border-blue-100">
//                 <div class="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-6">
//                   <div class="flex items-start justify-between gap-4">
//                     <div>
//                       <h2 class="text-2xl font-bold mb-1">${booking.hotelName}</h2>
//                       <p class="text-white/90 text-sm">
//                         Room: <span class="font-semibold">${booking.roomName}</span> • <span class="font-semibold">${booking.roomType}</span>
//                       </p>
//                     </div>
//                     <div class="text-right">
//                       <div class="text-xs uppercase tracking-wider text-white/80">Guests</div>
//                       <div class="text-lg font-bold">${booking.guests}</div>
//                     </div>
//                   </div>

//                   ${
//                     booking.specialRequests
//                       ? `
//                     <div class="mt-4 pt-4 border-t border-white/20 text-sm text-white/95">
//                       <span class="font-semibold">Special Request:</span> ${booking.specialRequests}
//                     </div>
//                   `
//                       : ""
//                   }
//                 </div>

//                 <div class="p-6 bg-white">
//                   <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div class="rounded-xl bg-slate-50 border border-slate-200 p-4">
//                       <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Check-in</div>
//                       <div class="text-base font-bold text-slate-800 mt-1">${formatDate(booking.checkIn)}</div>
//                     </div>
//                     <div class="rounded-xl bg-slate-50 border border-slate-200 p-4">
//                       <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Check-out</div>
//                       <div class="text-base font-bold text-slate-800 mt-1">${formatDate(booking.checkOut)}</div>
//                     </div>
//                     <div class="rounded-xl bg-blue-50 border border-blue-200 p-4">
//                       <div class="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">Duration</div>
//                       <div class="text-base font-bold text-blue-800 mt-1">${nights} night${nights > 1 ? "s" : ""}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <!-- Booking Details Table -->
//               <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200">
//                 <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
//                   <h3 class="font-bold text-slate-800">Booking Details</h3>
//                   <p class="text-sm text-slate-500">Charges summary for your stay</p>
//                 </div>
//                 <table class="min-w-full divide-y divide-slate-200">
//                   <thead class="bg-white">
//                     <tr>
//                       <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
//                       <th class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
//                       <th class="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody class="bg-white divide-y divide-slate-100">
//                     <tr>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">Room Charges</td>
//                       <td class="px-6 py-4 text-sm text-slate-600">
//                         <div>Check-in: ${formatDate(booking.checkIn)}</div>
//                         <div>Check-out: ${formatDate(booking.checkOut)}</div>
//                         <div class="text-xs text-slate-400 mt-1">${nights} night${nights > 1 ? "s" : ""}</div>
//                       </td>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">
//                         Rs. ${booking.pricePerNight} x ${nights}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900" colspan="2">Subtotal</td>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">Rs. ${subtotal.toFixed(
//                         2
//                       )}</td>
//                     </tr>
//                     <tr>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900" colspan="2">Tax (10%)</td>
//                       <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">Rs. ${tax.toFixed(
//                         2
//                       )}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <!-- Total -->
//               <div class="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
//                 <div class="flex items-center justify-between">
//                   <div>
//                     <div class="text-xs font-bold text-blue-700 uppercase tracking-wide">Total Amount</div>
//                     <div class="text-sm text-slate-600 mt-1">Inclusive of tax</div>
//                   </div>
//                   <div class="text-3xl font-extrabold text-blue-700">
//                     Rs. ${booking.totalAmount}
//                   </div>
//                 </div>
//               </div>

//               <!-- Footer -->
//               <div class="mt-8 pt-8 border-t border-slate-200 text-center">
//                 <p class="text-sm text-slate-500 mb-2">This is a computer generated invoice - No signature required</p>
//                 <p class="text-sm text-slate-500 mb-2">For any queries, please contact our support team</p>
//                 <p class="text-xs text-slate-400">© ${new Date().getFullYear()} Hotel Booking System</p>
//               </div>

//               <!-- Print CTA (optional) -->
//               <div class="no-print mt-8 flex justify-center">
//                 <button onclick="window.print()" class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold shadow hover:shadow-lg transition">
//                   Print Invoice
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   };

//   // Print invoice
//   const printInvoice = (booking) => {
//     const invoiceHTML = generateInvoiceHTML(booking);
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(invoiceHTML);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Calculate nights
//   const calculateNights = (checkIn, checkOut) => {
//     const nights = Math.ceil(
//       (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
//     );
//     return nights > 0 ? nights : 1;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading your bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
//           <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">Error</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 group"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
//             Back
//           </button>
//           <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//             My Bookings
//           </h1>
//           <p className="text-gray-600 text-lg">
//             View and manage your hotel bookings
//           </p>
//         </div>

//         {/* Debug Info (Only show if error occurs) */}
//         {debugInfo && (
//           <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <div className="flex items-center mb-2">
//               <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
//               <h3 className="font-semibold text-yellow-800">
//                 Debug Information
//               </h3>
//             </div>
//             <pre className="text-xs text-yellow-700 overflow-auto">
//               {JSON.stringify(debugInfo, null, 2)}
//             </pre>
//             <button
//               onClick={() => setDebugInfo(null)}
//               className="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
//             >
//               Clear
//             </button>
//           </div>
//         )}

//         {bookings.length === 0 ? (
//           // No bookings
//           <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
//             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Hotel className="w-12 h-12 text-blue-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               No Bookings Found
//             </h2>
//             <p className="text-gray-600 mb-8">
//               You haven't made any bookings yet.
//             </p>
//             <button
//               onClick={() => navigate("/rooms")}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
//             >
//               Browse Hotels
//             </button>
//           </div>
//         ) : (
//           // Bookings list
//           <div className="space-y-6">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
//               >
//                 <div className="p-6">
//                   {/* Status Badge and Booking ID */}
//                   <div className="flex flex-wrap justify-between items-start mb-4">
//                     <div className="flex items-center">
//                       {booking.isPaid ? (
//                         <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
//                           <CheckCircle className="w-4 h-4 mr-2" />
//                           Paid & Confirmed
//                         </div>
//                       ) : (
//                         <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
//                           <Clock className="w-4 h-4 mr-2" />
//                           Payment Pending
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-500 font-mono">
//                       Booking ID: {booking._id.slice(-8)}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     {/* Hotel Info */}
//                     <div className="lg:col-span-1">
//                       <h3 className="font-bold text-xl text-gray-800 mb-2">
//                         {booking.hotelName}
//                       </h3>
//                       <div className="space-y-2">
//                         <p className="text-gray-600 flex items-center">
//                           <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
//                           <span className="text-sm">{booking.roomName}</span>
//                         </p>
//                         <p className="text-gray-600 text-sm ml-6">
//                           {booking.roomType} Room
//                         </p>
//                         <p className="text-gray-600 flex items-center">
//                           <Users className="w-4 h-4 mr-2" />
//                           <span className="text-sm">
//                             {booking.guests} Guest
//                             {booking.guests > 1 ? "s" : ""}
//                           </span>
//                         </p>
//                         {booking.specialRequests && (
//                           <p className="text-sm text-gray-500 mt-2 italic bg-gray-50 p-2 rounded-lg">
//                             "{booking.specialRequests}"
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Dates */}
//                     <div className="lg:col-span-1">
//                       <div className="bg-blue-50 rounded-xl p-4">
//                         <div className="flex items-center mb-3">
//                           <Calendar className="w-5 h-5 text-blue-600 mr-2" />
//                           <h4 className="font-semibold text-gray-800">
//                             Stay Dates
//                           </h4>
//                         </div>
//                         <div className="space-y-2">
//                           <div>
//                             <p className="text-xs text-gray-500">Check-in</p>
//                             <p className="font-medium text-gray-800">
//                               {formatDate(booking.checkIn)}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Check-out</p>
//                             <p className="font-medium text-gray-800">
//                               {formatDate(booking.checkOut)}
//                             </p>
//                           </div>
//                           <p className="text-xs text-gray-500 mt-2">
//                             {calculateNights(booking.checkIn, booking.checkOut)}{" "}
//                             nights
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Price */}
//                     <div className="lg:col-span-1">
//                       <div className="bg-green-50 rounded-xl p-4">
//                         <div className="flex items-center mb-3">
//                           <CreditCard className="w-5 h-5 text-green-600 mr-2" />
//                           <h4 className="font-semibold text-gray-800">
//                             Price Details
//                           </h4>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-sm text-gray-600">
//                             Rs. {booking.pricePerNight} ×{" "}
//                             {calculateNights(booking.checkIn, booking.checkOut)}{" "}
//                             nights
//                           </p>
//                           <p className="text-2xl font-bold text-blue-600">
//                             Rs. {booking.totalAmount}
//                           </p>
//                           {booking.isPaid && (
//                             <p className="text-sm text-blue-600 mt-2 flex items-center">
//                               <CheckCircle className="w-4 h-4 mr-1" />
//                               Payment Complete
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="lg:col-span-1 flex flex-col justify-center space-y-3">
//                       {!booking.isPaid ? (
//                         <button
//                           onClick={() => navigate(`/payment/${booking._id}`)}
//                           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
//                         >
//                           <CreditCard className="w-5 h-5 mr-2" />
//                           Pay Now
//                         </button>
//                       ) : (
//                         <div className="space-y-2">
//                           <button
//                             onClick={() => downloadInvoice(booking)}
//                             disabled={downloadingInvoice === booking._id}
//                             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center disabled:opacity-50 shadow-md hover:shadow-lg"
//                           >
//                             {downloadingInvoice === booking._id ? (
//                               <>
//                                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                                 Downloading...
//                               </>
//                             ) : (
//                               <>
//                                 <Download className="w-5 h-5 mr-2" />
//                                 Download Invoice
//                               </>
//                             )}
//                           </button>

//                           {/* CHANGED: purple -> blue (only color change) */}
//                           <button
//                             onClick={() => printInvoice(booking)}
//                             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
//                           >
//                             <Printer className="w-5 h-5 mr-2" />
//                             Print Invoice
//                           </button>
//                         </div>
//                       )}

//                       <button
//                         onClick={() => navigate(`/booking/${booking._id}`)}
//                         className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
//                       >
//                         <Eye className="w-5 h-5 mr-2" />
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }