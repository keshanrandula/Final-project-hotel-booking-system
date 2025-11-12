import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

  if (!room || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Information Not Found</h2>
          <p className="text-gray-600 mb-6">Please select a room to book first.</p>
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

      // Prepare booking data according to backend model
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

      // Make API call to backend
      const response = await axios.post("http://localhost:5000/api/bookings", bookingData);
      
      if (response.status === 201) {
        const savedBooking = response.data.booking;
        
        alert(`🎉 Booking confirmed!\n\nBooking Reference: ${savedBooking._id}\n${room.name} at ${hotel.name}\nCheck-in: ${bookingForm.checkIn}\nCheck-out: ${bookingForm.checkOut}\nTotal: Rs. ${savedBooking.totalAmount}\n\nA confirmation has been sent to ${bookingForm.customerEmail}`);
        
        // Reset form and navigate to success page or back to rooms
        setBookingForm({
          checkIn: "",
          checkOut: "",
          guests: 1,
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          specialRequests: ""
        });
        
        // Navigate back to rooms or to a booking confirmation page
        navigate('/rooms');
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 inline-flex items-center"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Please fill in your details to confirm the booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Guest Information</h2>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Dates and Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={bookingForm.checkIn}
                      onChange={handleBookingChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      disabled={bookingLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={bookingForm.checkOut}
                      onChange={handleBookingChange}
                      min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                      required
                      disabled={bookingLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={bookingForm.guests}
                      onChange={handleBookingChange}
                      required
                      disabled={bookingLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={bookingForm.customerName}
                      onChange={handleBookingChange}
                      placeholder="Enter your full name"
                      required
                      disabled={bookingLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={bookingForm.customerEmail}
                        onChange={handleBookingChange}
                        placeholder="Enter your email"
                        required
                        disabled={bookingLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={bookingForm.customerPhone}
                        onChange={handleBookingChange}
                        placeholder="Enter your phone number"
                        required
                        disabled={bookingLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={bookingForm.specialRequests}
                      onChange={handleBookingChange}
                      placeholder="Any special requests or requirements..."
                      rows="3"
                      disabled={bookingLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={bookingLoading}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center text-lg"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Booking...
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
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>

              {/* Room Info */}
              <div className="mb-6">
                {room.images && room.images.length > 0 && (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
                    }}
                  />
                )}
                <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
                <p className="text-gray-600">{hotel.name}</p>
                <p className="text-gray-500 text-sm">{room.type} Room</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Price</span>
                  <span className="text-gray-800">Rs. {room.price} / night</span>
                </div>

                {bookingForm.checkIn && bookingForm.checkOut && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights</span>
                      <span className="text-gray-800">{nights} night{nights !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                      <span>Total Amount</span>
                      <span className="text-green-600">Rs. {totalAmount}</span>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 mt-4">
                      <p className="text-blue-800 text-sm text-center">
                        📅 {bookingForm.checkIn} to {bookingForm.checkOut}
                      </p>
                    </div>
                  </>
                )}

                {(!bookingForm.checkIn || !bookingForm.checkOut) && (
                  <div className="bg-yellow-50 rounded-lg p-3 mt-4">
                    <p className="text-yellow-800 text-sm text-center">
                      Select dates to see total amount
                    </p>
                  </div>
                )}
              </div>

              {/* Hotel Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Hotel Contact</h4>
                <p className="text-gray-600 text-sm">📍 {hotel.location}</p>
                {hotel.contact && (
                  <p className="text-gray-600 text-sm">📞 {hotel.contact}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

