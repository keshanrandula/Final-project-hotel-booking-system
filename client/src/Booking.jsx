// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Booking() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { room, hotel } = location.state || {};

//   const [bookingForm, setBookingForm] = useState({
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     customerName: "",
//     customerEmail: "",
//     customerPhone: "",
//     specialRequests: ""
//   });
//   const [bookingLoading, setBookingLoading] = useState(false);

//   if (!room || !hotel) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Information Not Found</h2>
//           <p className="text-gray-600 mb-6">Please select a room to book first.</p>
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

//   // Handle booking form changes
//   const handleBookingChange = (e) => {
//     const { name, value } = e.target;
//     setBookingForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Calculate total amount
//   const calculateTotalAmount = (price, checkIn, checkOut) => {
//     if (!checkIn || !checkOut) return price;
//     const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
//     return price * (nights || 1);
//   };

//   // Calculate nights
//   const calculateNights = (checkIn, checkOut) => {
//     if (!checkIn || !checkOut) return 1;
//     const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
//     return nights > 0 ? nights : 1;
//   };

//   // Submit booking to backend
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!bookingForm.checkIn || !bookingForm.checkOut || !bookingForm.customerName || 
//         !bookingForm.customerEmail || !bookingForm.customerPhone) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     if (new Date(bookingForm.checkIn) >= new Date(bookingForm.checkOut)) {
//       alert("Check-out date must be after check-in date");
//       return;
//     }

//     if (new Date(bookingForm.checkIn) < new Date().setHours(0, 0, 0, 0)) {
//       alert("Check-in date cannot be in the past");
//       return;
//     }

//     try {
//       setBookingLoading(true);

//       // Prepare booking data according to backend model
//       const bookingData = {
//         hotelId: hotel._id,
//         hotelName: hotel.name,
//         roomId: room._id,
//         roomName: room.name,
//         roomType: room.type,
//         pricePerNight: room.price,
//         checkIn: bookingForm.checkIn,
//         checkOut: bookingForm.checkOut,
//         guests: parseInt(bookingForm.guests),
//         customerName: bookingForm.customerName,
//         customerEmail: bookingForm.customerEmail,
//         customerPhone: bookingForm.customerPhone,
//         specialRequests: bookingForm.specialRequests,
//         totalAmount: calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut),
//         bookingDate: new Date().toISOString(),
//         status: "confirmed"
//       };

//       console.log("Sending booking data:", bookingData);

//       // Make API call to backend
//       const response = await axios.post("http://localhost:5000/api/bookings", bookingData);
      
//       if (response.status === 201) {
//         const savedBooking = response.data.booking;
        
//         alert(`🎉 Booking confirmed!\n\nBooking Reference: ${savedBooking._id}\n${room.name} at ${hotel.name}\nCheck-in: ${bookingForm.checkIn}\nCheck-out: ${bookingForm.checkOut}\nTotal: Rs. ${savedBooking.totalAmount}\n\nA confirmation has been sent to ${bookingForm.customerEmail}`);
        
//         // Reset form and navigate to success page or back to rooms
//         setBookingForm({
//           checkIn: "",
//           checkOut: "",
//           guests: 1,
//           customerName: "",
//           customerEmail: "",
//           customerPhone: "",
//           specialRequests: ""
//         });
        
//         // Navigate back to rooms or to a booking confirmation page
//         navigate('/rooms');
//       }
//     } catch (err) {
//       console.error("Booking error:", err);
//       const errorMessage = err.response?.data?.message || "Failed to process booking. Please try again.";
//       alert(`Booking failed: ${errorMessage}`);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const totalAmount = calculateTotalAmount(room.price, bookingForm.checkIn, bookingForm.checkOut);
//   const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <button 
//             onClick={() => navigate(-1)}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 inline-flex items-center"
//           >
//             ← Back
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
//           <p className="text-gray-600 mt-2">Please fill in your details to confirm the booking</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Booking Form - 2/3 width */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Guest Information</h2>

//               <form onSubmit={handleBookingSubmit} className="space-y-6">
//                 {/* Dates and Guests */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Check-in Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="checkIn"
//                       value={bookingForm.checkIn}
//                       onChange={handleBookingChange}
//                       min={new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={bookingLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Check-out Date *
//                     </label>
//                     <input
//                       type="date"
//                       name="checkOut"
//                       value={bookingForm.checkOut}
//                       onChange={handleBookingChange}
//                       min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
//                       required
//                       disabled={bookingLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Number of Guests *
//                     </label>
//                     <select
//                       name="guests"
//                       value={bookingForm.guests}
//                       onChange={handleBookingChange}
//                       required
//                       disabled={bookingLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                     >
//                       {[1, 2, 3, 4, 5, 6].map(num => (
//                         <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Personal Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="customerName"
//                       value={bookingForm.customerName}
//                       onChange={handleBookingChange}
//                       placeholder="Enter your full name"
//                       required
//                       disabled={bookingLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         name="customerEmail"
//                         value={bookingForm.customerEmail}
//                         onChange={handleBookingChange}
//                         placeholder="Enter your email"
//                         required
//                         disabled={bookingLoading}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number *
//                       </label>
//                       <input
//                         type="tel"
//                         name="customerPhone"
//                         value={bookingForm.customerPhone}
//                         onChange={handleBookingChange}
//                         placeholder="Enter your phone number"
//                         required
//                         disabled={bookingLoading}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Special Requests (Optional)
//                     </label>
//                     <textarea
//                       name="specialRequests"
//                       value={bookingForm.specialRequests}
//                       onChange={handleBookingChange}
//                       placeholder="Any special requests or requirements..."
//                       rows="3"
//                       disabled={bookingLoading}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 resize-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => navigate(-1)}
//                     disabled={bookingLoading}
//                     className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={bookingLoading}
//                     className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center text-lg"
//                   >
//                     {bookingLoading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                         Processing Booking...
//                       </>
//                     ) : (
//                       "Confirm Booking"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Booking Summary - 1/3 width */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>

//               {/* Room Info */}
//               <div className="mb-6">
//                 {room.images && room.images.length > 0 && (
//                   <img
//                     src={room.images[0]}
//                     alt={room.name}
//                     className="w-full h-40 object-cover rounded-lg mb-4"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
//                     }}
//                   />
//                 )}
//                 <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
//                 <p className="text-gray-600">{hotel.name}</p>
//                 <p className="text-gray-500 text-sm">{room.type} Room</p>
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 border-t border-gray-200 pt-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Room Price</span>
//                   <span className="text-gray-800">Rs. {room.price} / night</span>
//                 </div>

//                 {bookingForm.checkIn && bookingForm.checkOut && (
//                   <>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Nights</span>
//                       <span className="text-gray-800">{nights} night{nights !== 1 ? 's' : ''}</span>
//                     </div>
                    
//                     <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
//                       <span>Total Amount</span>
//                       <span className="text-green-600">Rs. {totalAmount}</span>
//                     </div>

//                     <div className="bg-blue-50 rounded-lg p-3 mt-4">
//                       <p className="text-blue-800 text-sm text-center">
//                         📅 {bookingForm.checkIn} to {bookingForm.checkOut}
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {(!bookingForm.checkIn || !bookingForm.checkOut) && (
//                   <div className="bg-yellow-50 rounded-lg p-3 mt-4">
//                     <p className="text-yellow-800 text-sm text-center">
//                       Select dates to see total amount
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Hotel Contact Info */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <h4 className="font-semibold text-gray-700 mb-2">Hotel Contact</h4>
//                 <p className="text-gray-600 text-sm">📍 {hotel.location}</p>
//                 {hotel.contact && (
//                   <p className="text-gray-600 text-sm">📞 {hotel.contact}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// const Booking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Room data passed from previous page
//   const { hotel, room } = location.state || {};

//   const token = localStorage.getItem("token");

//   const [bookingForm, setBookingForm] = useState({
//     hotelName: hotel?.name || "",
//     roomName: room?.name || "",
//     roomType: room?.type || "",
//     pricePerNight: room?.price || 0,
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     customerName: "",
//     customerEmail: "",
//     customerPhone: "",
//     totalAmount: 0,
//   });

//   /* ===================== FETCH LOGGED USER ===================== */
//   useEffect(() => {
//     if (!token) {
//       alert("Please login to book a room");
//       navigate("/login");
//       return;
//     }

//     const fetchUserProfile = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/auth/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const user = res.data.user;

//         setBookingForm((prev) => ({
//           ...prev,
//           customerName: `${user.firstName} ${user.lastName}`,
//           customerEmail: user.email,
//           customerPhone: user.phone || "",
//         }));
//       } catch (error) {
//         console.error("User profile fetch failed", error);
//       }
//     };

//     fetchUserProfile();
//   }, [token, navigate]);

//   /* ===================== CALCULATE TOTAL ===================== */
//   useEffect(() => {
//     if (bookingForm.checkIn && bookingForm.checkOut) {
//       const start = new Date(bookingForm.checkIn);
//       const end = new Date(bookingForm.checkOut);
//       const days =
//         (end - start) / (1000 * 60 * 60 * 24);

//       if (days > 0) {
//         setBookingForm((prev) => ({
//           ...prev,
//           totalAmount: days * prev.pricePerNight,
//         }));
//       }
//     }
//   }, [bookingForm.checkIn, bookingForm.checkOut]);

//   /* ===================== HANDLE CHANGE ===================== */
//   const handleChange = (e) => {
//     setBookingForm({
//       ...bookingForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /* ===================== SUBMIT BOOKING ===================== */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/bookings",
//         bookingForm,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Booking successful 🎉");
//       navigate("/my-bookings");
//     } catch (error) {
//       console.error("Booking failed", error);
//       alert("Booking failed");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Room Booking</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           name="customerName"
//           placeholder="Full Name"
//           value={bookingForm.customerName}
//           onChange={handleChange}
//           className="w-full border p-2"
//           required
//         />

//         <input
//           type="email"
//           name="customerEmail"
//           placeholder="Email"
//           value={bookingForm.customerEmail}
//           onChange={handleChange}
//           className="w-full border p-2"
//           required
//         />

//         <input
//           type="text"
//           name="customerPhone"
//           placeholder="Phone"
//           value={bookingForm.customerPhone}
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         <input
//           type="date"
//           name="checkIn"
//           value={bookingForm.checkIn}
//           onChange={handleChange}
//           className="w-full border p-2"
//           required
//         />

//         <input
//           type="date"
//           name="checkOut"
//           value={bookingForm.checkOut}
//           onChange={handleChange}
//           className="w-full border p-2"
//           required
//         />

//         <input
//           type="number"
//           name="guests"
//           min="1"
//           value={bookingForm.guests}
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         <div className="font-semibold">
//           Total Amount: Rs. {bookingForm.totalAmount}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Confirm Booking
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Booking;

//////////////////////////////////////////////////////////

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

  // Fetch user data if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setUserLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data.user;
        setBookingForm(prev => ({
          ...prev,
          customerName: `${user.firstName} ${user.lastName}`,
          customerEmail: user.email,
          customerPhone: user.phone || "",
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setUserLoading(false);
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
        
        // Success modal
        const successMessage = `🎉 Booking Confirmed!\n\n📋 Booking Reference: ${savedBooking._id}\n🏨 ${room.name} at ${hotel.name}\n📅 Check-in: ${bookingForm.checkIn}\n📅 Check-out: ${bookingForm.checkOut}\n💰 Total: Rs. ${savedBooking.totalAmount}\n📧 Confirmation sent to ${bookingForm.customerEmail}`;
        
        alert(successMessage);
        
        // Reset form
        setBookingForm({
          checkIn: "",
          checkOut: "",
          guests: 1,
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          specialRequests: ""
        });
        
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
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center text-lg"
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
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span> Your booking will be confirmed instantly. 
                A confirmation email will be sent to your provided email address. 
                For any changes or cancellations, please contact the hotel directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}