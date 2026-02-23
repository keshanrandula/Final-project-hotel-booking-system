import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  Hotel, 
  MapPin, 
  CreditCard, 
  Download, 
  CheckCircle, 
  XCircle,
  Eye,
  Users,
  Clock,
  AlertCircle
} from "lucide-react";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [userEmail, setUserEmail] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: ""
  });

  // Fetch user's bookings
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // First get user profile to get email
        const profileResponse = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const email = profileResponse.data.user.email;
        setUserEmail(email);
        
        // Then fetch all bookings and filter by user email
        await fetchUserBookings(email, token);
        
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load your profile. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchUserBookings = async (email, token) => {
    try {
      const bookingsResponse = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Filter bookings by user email
      const userBookings = bookingsResponse.data.filter(
        booking => booking.customerEmail === email
      );
      
      setBookings(userBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment
  const handlePayment = async (bookingId) => {
    try {
      setPaymentProcessing(true);
      setProcessingPayment(bookingId);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        navigate('/login');
        return;
      }

      if (!userEmail) {
        alert("User email not found. Please refresh the page.");
        return;
      }

      console.log("Sending payment request:", {
        bookingId,
        userEmail,
        isPaid: true
      });

      // Update booking to mark as paid
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { 
          isPaid: true,
          paymentStatus: 'paid',
          customerEmail: userEmail  // Send email for authorization
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Payment response:", response.data);

      if (response.status === 200) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { 
                ...booking, 
                isPaid: true, 
                paymentStatus: 'paid',
                status: 'confirmed' 
              }
            : booking
        ));
        
        // Close modal and show success
        setShowPaymentModal(false);
        setSelectedBooking(null);
        setCardDetails({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardHolder: ""
        });
        
        alert("✅ Payment successful! Your booking is now confirmed.");
      }
    } catch (err) {
      console.error("Payment error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });

      // Set debug info
      setDebugInfo({
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });

      // User-friendly error message
      let errorMessage = "Payment failed. ";
      
      if (err.response?.status === 403) {
        errorMessage += "You don't have permission to update this booking.";
      } else if (err.response?.status === 404) {
        errorMessage += "Booking not found. Please refresh and try again.";
      } else if (err.response?.status === 401) {
        errorMessage += "Please login again.";
        setTimeout(() => navigate('/login'), 2000);
      } else if (err.response?.status === 500) {
        errorMessage += "Server error. Please try again later.";
      } else if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else {
        errorMessage += "Please check your connection and try again.";
      }

      alert(errorMessage);
    } finally {
      setPaymentProcessing(false);
      setProcessingPayment(null);
    }
  };

  // Download invoice
  const downloadInvoice = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${bookingId}/invoice`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading invoice:", err);
      alert("Failed to download invoice. Please try again.");
    }
  };

  // Handle card input change
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format card number with spaces
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all mb-4 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-gray-600 text-lg">View and manage your hotel bookings</p>
        </div>

        {/* Debug Info (Only show if error occurs) */}
        {debugInfo && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="font-semibold text-yellow-800">Debug Information</h3>
            </div>
            <pre className="text-xs text-yellow-700 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
            <button
              onClick={() => setDebugInfo(null)}
              className="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
            >
              Clear
            </button>
          </div>
        )}

        {bookings.length === 0 ? (
          // No bookings
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hotel className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Found</h2>
            <p className="text-gray-600 mb-8">You haven't made any bookings yet.</p>
            <button
              onClick={() => navigate('/rooms')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          // Bookings list
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {booking.isPaid ? (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Paid & Confirmed
                        </div>
                      ) : (
                        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Payment Pending
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Booking ID: {booking._id.slice(-8)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Hotel Info */}
                    <div className="lg:col-span-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-2">{booking.hotelName}</h3>
                      <p className="text-gray-600 flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {booking.roomName}
                      </p>
                      <p className="text-gray-600 mb-2">{booking.roomType} Room</p>
                      <p className="text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                      </p>
                      {booking.specialRequests && (
                        <p className="text-sm text-gray-500 mt-2 italic">
                          "{booking.specialRequests}"
                        </p>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="lg:col-span-1">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Dates</h4>
                        </div>
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Check-in:</span><br />
                          {formatDate(booking.checkIn)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Check-out:</span><br />
                          {formatDate(booking.checkOut)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="lg:col-span-1">
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                          <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">Price Details</h4>
                        </div>
                        <p className="text-gray-700 mb-2">
                          Rs. {booking.pricePerNight} x {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          Rs. {booking.totalAmount}
                        </p>
                        {booking.isPaid && (
                          <p className="text-sm text-green-600 mt-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Payment Complete
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1 flex flex-col justify-center space-y-3">
                      {!booking.isPaid ? (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowPaymentModal(true);
                          }}
                          disabled={processingPayment === booking._id}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                          {processingPayment === booking._id ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5 mr-2" />
                              Pay Now
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => downloadInvoice(booking._id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download Invoice
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate(`/booking/${booking._id}`)}
                        className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Payment</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Booking: {selectedBooking.hotelName}</p>
                <p className="text-gray-600 mb-2">Room: {selectedBooking.roomName}</p>
                <p className="text-3xl font-bold text-green-600 mb-4">
                  Rs. {selectedBooking.totalAmount}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="card">Credit / Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Card payment form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formatCardNumber(cardDetails.cardNumber)}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
                      }}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formatExpiryDate(cardDetails.expiryDate)}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setCardDetails(prev => ({ ...prev, expiryDate: formatted }));
                        }}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Other payment methods - simplified for demo */}
              {paymentMethod === "paypal" && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-gray-700">You will be redirected to PayPal</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl">
                  <p className="text-gray-700 mb-2">Bank Transfer Details:</p>
                  <p className="text-sm text-gray-600">Bank: Sample Bank</p>
                  <p className="text-sm text-gray-600">Account: 1234 5678 9012</p>
                  <p className="text-sm text-gray-600">Name: Hotel Booking Ltd</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedBooking(null);
                    setCardDetails({
                      cardNumber: "",
                      expiryDate: "",
                      cvv: "",
                      cardHolder: ""
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (paymentMethod === "card" && !validateCardDetails()) {
                      return;
                    }
                    handlePayment(selectedBooking._id);
                  }}
                  disabled={paymentProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
                >
                  {paymentProcessing ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>

              {/* Security note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}