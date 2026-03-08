// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Payment() {
//   const navigate = useNavigate();
//   const { bookingData } = useLocation().state;
//   const token = localStorage.getItem("token");

//   const handlePaymentSuccess = async () => {
//     try {
//       // 1️⃣ Save booking
//       const res = await axios.post(
//         "http://localhost:5000/api/bookings",
//         bookingData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const bookingId = res.data.booking._id;

//       // 2️⃣ Download invoice
//       window.open(
//         `http://localhost:5000/api/bookings/invoice/${bookingId}`,
//         "_blank"
//       );

//       alert("Payment Successful & Booking Confirmed!");
//       navigate("/my-bookings");

//     } catch (err) {
//       alert("Payment Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

//         <button
//           onClick={handlePaymentSuccess}
//           className="w-full bg-green-600 text-white py-3 rounded-lg mb-3"
//         >
//           💳 Pay by Card
//         </button>

//         <button
//           onClick={handlePaymentSuccess}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg"
//         >
//           💵 Cash Payment
//         </button>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowLeft,
  AlertCircle,
  Hotel,
  Calendar,
  Users,
  MapPin,
  Building2,
  Wallet,
  ShieldCheck
} from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: ""
  });

  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setBooking(response.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        navigate('/login');
        return;
      }

      if (paymentMethod === "card" && !validateCardDetails()) {
        setPaymentProcessing(false);
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update booking to mark as paid
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { 
          isPaid: true,
          paymentStatus: 'paid',
          paymentMethod: paymentMethod
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setPaymentSuccess(true);
        
        // Show success message and redirect after 3 seconds
        setTimeout(() => {
          navigate('/my-bookings');
        }, 3000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Validate card details
  const validateCardDetails = () => {
    if (!cardDetails.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      alert("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      alert("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (!cardDetails.cvv.match(/^\d{3,4}$/)) {
      alert("Please enter a valid CVV");
      return false;
    }
    if (!cardDetails.cardHolder.trim()) {
      alert("Please enter card holder name");
      return false;
    }
    return true;
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error</h2>
          <p className="text-gray-600 mb-6">{error || "Booking not found"}</p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your booking has been confirmed. You will be redirected to your bookings page.
          </p>
          <div className="animate-pulse text-blue-600">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with back button */}
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Bookings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Summary - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Hotel className="w-5 h-5 mr-2 text-blue-600" />
                Booking Summary
              </h2>
              
              <div className="space-y-4">
                {/* Hotel Name */}
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-gray-800">{booking.hotelName}</h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{booking.roomName}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{booking.roomType} Room</p>
                </div>

                {/* Dates */}
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium text-gray-700">Stay Dates</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Check-in</p>
                        <p className="font-medium text-gray-800">{formatDate(booking.checkIn)}</p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Check-out</p>
                        <p className="font-medium text-gray-800">{formatDate(booking.checkOut)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {calculateNights(booking.checkIn, booking.checkOut)} nights
                    </p>
                  </div>
                </div>

                {/* Guests */}
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center mb-2">
                    <Users className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium text-gray-700">Guests</span>
                  </div>
                  <p className="text-gray-600 ml-6">
                    {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                      "{booking.specialRequests}"
                    </p>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-medium">Rs. {booking.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600">Number of nights</span>
                    <span className="font-medium">{calculateNights(booking.checkIn, booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {booking.pricePerNight * calculateNights(booking.checkIn, booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">Rs. {(booking.pricePerNight * calculateNights(booking.checkIn, booking.checkOut) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-green-600 border-t border-gray-200 pt-3 mt-2">
                    <span>Total Amount</span>
                    <span>Rs. {booking.totalAmount}</span>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="text-xs text-gray-400 text-center pt-4 border-t border-gray-100">
                  Booking ID: {booking._id}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Card Payment Option */}
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === "card" ? "text-blue-600" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === "card" ? "text-blue-600" : "text-gray-600"
                    }`}>
                      Credit / Debit Card
                    </span>
                  </button>

                  {/* PayPal Option */}
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Wallet className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === "paypal" ? "text-blue-600" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === "paypal" ? "text-blue-600" : "text-gray-600"
                    }`}>
                      PayPal
                    </span>
                  </button>

                  {/* Bank Transfer Option */}
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 border-2 rounded-xl text-center transition-all ${
                      paymentMethod === "bank"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                      paymentMethod === "bank" ? "text-blue-600" : "text-gray-400"
                    }`} />
                    <span className={`text-sm font-medium ${
                      paymentMethod === "bank" ? "text-blue-600" : "text-gray-600"
                    }`}>
                      Bank Transfer
                    </span>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardHolder}
                      onChange={(e) => setCardDetails({...cardDetails, cardHolder: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formatCardNumber(cardDetails.cardNumber)}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardDetails({...cardDetails, cardNumber: formatted});
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formatExpiryDate(cardDetails.expiryDate)}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setCardDetails({...cardDetails, expiryDate: formatted});
                        }}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Card Security Note */}
                  <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                    Your card information is encrypted and secure
                  </div>
                </div>
              )}

              {/* PayPal Info */}
              {paymentMethod === "paypal" && (
                <div className="mb-6 p-6 bg-blue-50 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Wallet className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Pay with PayPal</h3>
                  </div>
                  <p className="text-gray-700 mb-3">You will be redirected to PayPal to complete your payment securely.</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">✓ Secure payment processing</p>
                    <p className="text-sm text-gray-600">✓ Buyer protection included</p>
                    <p className="text-sm text-gray-600">✓ No PayPal account? Pay with credit card</p>
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === "bank" && (
                <div className="mb-6 p-6 bg-green-50 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Building2 className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Bank Transfer Details</h3>
                  </div>
                  
                  <div className="space-y-3 bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">Commercial Bank</span>
                      
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">Hotel Booking Ltd</span>
                      
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-medium">1234 5678 9012 3456</span>
                      
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">Colombo Main</span>
                      
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">Rs. {booking.totalAmount}</span>
                    </div>
                    
                    <div className="border-t border-green-100 pt-3 mt-2">
                      <p className="text-xs text-gray-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Please include your booking ID ({booking._id.slice(-8)}) as reference
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={paymentProcessing}
                className="w-full bg-gradient-to-r from-green-blue to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
              >
                {paymentProcessing ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-2" />
                    Pay Rs. {booking.totalAmount}
                  </span>
                )}
              </button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                Your payment information is secure and encrypted. We never store your card details.
              </p>

              {/* Payment Methods Icons */}
              <div className="flex justify-center items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 opacity-50" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6 opacity-50" />
                <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Amex" className="h-6 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}