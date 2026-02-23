import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Hotel,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  Users,
  DollarSign,
  MapPin,
  Home
} from "lucide-react";

export default function HotelBookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [hotelInfo, setHotelInfo] = useState(null);
  
  // Get hotel info from localStorage
  const hotelToken = localStorage.getItem("hotelToken");
  const hotelId = localStorage.getItem("hotelId");
  const hotelName = localStorage.getItem("hotelName");

  // Fetch hotel's bookings
  useEffect(() => {
    if (!hotelToken || !hotelId) {
      navigate("/hotellogin");
      return;
    }
    fetchHotelBookings();
    fetchHotelInfo();
  }, []);

  // Fetch hotel details
  const fetchHotelInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
      setHotelInfo(response.data);
    } catch (err) {
      console.error("Error fetching hotel info:", err);
    }
  };

  // Fetch bookings for this hotel
  const fetchHotelBookings = async () => {
    try {
      setLoading(true);
      
      // Try to get bookings by hotel name
      const response = await axios.get("http://localhost:5000/api/bookings");
      
      // Filter bookings for this hotel
      const hotelBookings = response.data.filter(booking => 
        booking.hotelName === hotelName || 
        booking.hotelId === hotelId ||
        booking.hotelName?.toLowerCase().includes(hotelName?.toLowerCase())
      );
      
      console.log("Hotel bookings:", hotelBookings);
      setBookings(hotelBookings);
      setFilteredBookings(hotelBookings);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
      
      // Mock data for testing
      const mockBookings = [
        {
          _id: "1",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          customerPhone: "0771234567",
          hotelName: hotelName,
          roomName: "Deluxe Suite",
          roomType: "Deluxe",
          checkIn: "2024-01-15",
          checkOut: "2024-01-18",
          guests: 2,
          totalAmount: 45000,
          pricePerNight: 15000,
          isPaid: true,
          status: "confirmed",
          specialRequests: "Extra pillows please",
          createdAt: new Date().toISOString()
        },
        {
          _id: "2",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          customerPhone: "0777654321",
          hotelName: hotelName,
          roomName: "Ocean View",
          roomType: "Double",
          checkIn: "2024-01-20",
          checkOut: "2024-01-25",
          guests: 3,
          totalAmount: 75000,
          pricePerNight: 15000,
          isPaid: false,
          status: "pending",
          createdAt: new Date().toISOString()
        }
      ];
      
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings];

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      if (statusFilter === "paid") {
        filtered = filtered.filter(booking => booking.isPaid === true);
      } else if (statusFilter === "pending") {
        filtered = filtered.filter(booking => booking.isPaid === false);
      } else if (statusFilter === "confirmed") {
        filtered = filtered.filter(booking => booking.status === "confirmed");
      }
    }

    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, bookings]);

  // Update payment status
  const handleTogglePayment = async (bookingId, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { isPaid: !currentStatus }
      );

      console.log("Payment status updated:", response.data);
      
      // Refresh bookings
      fetchHotelBookings();
      alert("Payment status updated successfully");
    } catch (err) {
      console.error("Error updating payment status:", err);
      alert("Failed to update payment status");
    }
  };

  // Generate invoice
  const handleGenerateInvoice = async (bookingId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${bookingId}/invoice`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error generating invoice:", err);
      alert("Failed to generate invoice");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  // Calculate stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.isPaid ? b.totalAmount : 0), 0);
  const pendingAmount = bookings.reduce((sum, b) => sum + (!b.isPaid ? b.totalAmount : 0), 0);
  const totalBookings = bookings.length;
  const paidBookings = bookings.filter(b => b.isPaid).length;
  const occupancyRate = hotelInfo?.rooms?.length ? 
    (bookings.length / hotelInfo.rooms.length * 100).toFixed(1) : 0;

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your hotel bookings...</p>
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
            onClick={() => navigate("/hoteldashboard")}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all mb-4 inline-flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {hotelName} - Bookings
                </h1>
                <p className="text-gray-600">
                  Manage all bookings, payments, and customer information for your hotel
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Hotel className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-600">Rs. {pendingAmount.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Paid Bookings</p>
                <p className="text-2xl font-bold text-purple-600">{paidBookings}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Occupancy Rate</p>
                <p className="text-2xl font-bold text-indigo-600">{occupancyRate}%</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                <option value="all">All Bookings</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending Payment</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>

            <div className="text-right text-gray-600 py-3">
              Showing {currentBookings.length} of {filteredBookings.length} bookings
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Booking ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Room</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Guests</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-gray-600">
                        {booking._id.slice(-8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                        <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{booking.roomName}</p>
                        <p className="text-xs text-gray-400">{booking.roomType || "Standard"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">In:</span> {formatDate(booking.checkIn)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Out:</span> {formatDate(booking.checkOut)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{booking.guests}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600">Rs. {booking.totalAmount}</p>
                    </td>
                    <td className="px-6 py-4">
                      {booking.isPaid ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center w-fit">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleTogglePayment(booking._id, booking.isPaid)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Toggle Payment Status"
                        >
                          <CreditCard className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleGenerateInvoice(booking._id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Generate Invoice"
                        >
                          <Printer className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* No Bookings Message */}
        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Found</h2>
            <p className="text-gray-600 mb-8">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Your hotel doesn't have any bookings yet"}
            </p>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{selectedBooking.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{selectedBooking.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{selectedBooking.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Hotel className="w-5 h-5 mr-2 text-green-600" />
                      Room Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Room</p>
                        <p className="font-medium">{selectedBooking.roomName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{selectedBooking.roomType || "Standard"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Dates */}
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Booking Dates
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Check In</p>
                        <p className="font-medium">{formatDate(selectedBooking.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Check Out</p>
                        <p className="font-medium">{formatDate(selectedBooking.checkOut)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Nights</p>
                        <p className="font-medium">
                          {calculateNights(selectedBooking.checkIn, selectedBooking.checkOut)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Guests</p>
                        <p className="font-medium">{selectedBooking.guests}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-yellow-600" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-bold text-xl text-green-600">Rs. {selectedBooking.totalAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        {selectedBooking.isPaid ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Paid
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Special Requests</h3>
                      <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                    </div>
                  )}

                  {/* Created At */}
                  <div className="text-sm text-gray-500 text-right">
                    Booked on: {new Date(selectedBooking.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => handleGenerateInvoice(selectedBooking._id)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Invoice
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}