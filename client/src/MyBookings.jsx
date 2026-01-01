import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Hotel,
  MapPin,
  Users,
  CreditCard,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Filter,
  Search,
  Download,
  Printer,
  Eye,
  ArrowLeft
} from "lucide-react";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, upcoming, past, cancelled
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get("http://localhost:5000/api/bookings", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      setBookings(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (filter === "upcoming" && new Date(booking.checkIn) <= new Date()) return false;
    if (filter === "past" && new Date(booking.checkOut) > new Date()) return false;
    if (filter === "cancelled" && booking.status !== "cancelled") return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        booking.hotelName.toLowerCase().includes(searchLower) ||
        booking.roomName.toLowerCase().includes(searchLower) ||
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.customerEmail.toLowerCase().includes(searchLower) ||
        booking._id.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Handle status update
  const updateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this booking?`)) return;
    
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status: newStatus });
      fetchBookings(); // Refresh list
    } catch (err) {
      alert("Failed to update booking status");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  // Calculate days until check-in
  const getDaysUntilCheckIn = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return "bg-green-100 text-green-800 border border-green-200";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case 'cancelled':
        return "bg-red-100 text-red-800 border border-red-200";
      case 'completed':
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Calculate total nights
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Export bookings as CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Booking ID', 'Hotel', 'Room', 'Check-in', 'Check-out', 'Nights', 'Guests', 'Total Amount', 'Status'],
      ...filteredBookings.map(b => [
        b._id,
        b.hotelName,
        b.roomName,
        b.checkIn,
        b.checkOut,
        calculateNights(b.checkIn, b.checkOut),
        b.guests,
        `Rs. ${b.totalAmount}`,
        b.status || 'confirmed'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Print bookings
  const printBookings = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>My Bookings</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .header { text-align: center; margin-bottom: 30px; }
            .status-confirmed { color: green; }
            .status-cancelled { color: red; }
            .status-pending { color: orange; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>My Bookings</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Nights</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredBookings.map(booking => `
                <tr>
                  <td>${booking._id.substring(0, 8)}...</td>
                  <td>${booking.hotelName}</td>
                  <td>${booking.roomName}</td>
                  <td>${formatDate(booking.checkIn)}</td>
                  <td>${formatDate(booking.checkOut)}</td>
                  <td>${calculateNights(booking.checkIn, booking.checkOut)}</td>
                  <td>${booking.guests}</td>
                  <td>Rs. ${booking.totalAmount}</td>
                  <td class="status-${booking.status || 'confirmed'}">${booking.status || 'confirmed'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookings</h1>
              <p className="text-blue-100">Manage and view all your hotel reservations</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => navigate('/rooms')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Book Another Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <p className="text-3xl font-bold text-gray-800">
                  {bookings.filter(b => new Date(b.checkIn) > new Date()).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-gray-800">
                  {bookings.filter(b => new Date(b.checkOut) <= new Date()).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-gray-800">
                  Rs. {bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings by hotel, room, or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                >
                  <option value="all">All Bookings</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
              
              <button
                onClick={printBookings}
                className="flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Printer className="w-5 h-5 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hotel className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm ? "No bookings match your search criteria" : "You haven't made any bookings yet"}
            </p>
            <button
              onClick={() => navigate('/rooms')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Book a Room Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const nights = calculateNights(booking.checkIn, booking.checkOut);
              const daysUntil = getDaysUntilCheckIn(booking.checkIn);
              const isUpcoming = new Date(booking.checkIn) > new Date();
              const isPast = new Date(booking.checkOut) <= new Date();

              return (
                <div key={booking._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Booking Header */}
                  <div className={`px-6 py-4 ${isUpcoming ? 'bg-gradient-to-r from-blue-50 to-blue-100' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 ${isUpcoming ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Hotel className={`w-6 h-6 ${isUpcoming ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{booking.hotelName}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center ${getStatusStyle(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-2">{booking.status || 'confirmed'}</span>
                        </span>
                        
                        <span className="text-2xl font-bold text-gray-800">
                          Rs. {booking.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Room Details
                        </p>
                        <p className="font-semibold text-gray-800">{booking.roomName}</p>
                        <p className="text-gray-600">{booking.roomType}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Guests
                        </p>
                        <p className="font-semibold text-gray-800">{booking.guests} Guest{booking.guests !== 1 ? 's' : ''}</p>
                        <p className="text-gray-600">{nights} night{nights !== 1 ? 's' : ''}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Guest Info
                        </p>
                        <p className="font-semibold text-gray-800">{booking.customerName}</p>
                        <p className="text-gray-600">{booking.customerEmail}</p>
                        {booking.customerPhone && (
                          <p className="text-gray-600">{booking.customerPhone}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Booking Info
                        </p>
                        <p className="text-gray-800 font-mono text-sm">{booking._id}</p>
                        {isUpcoming && daysUntil > 0 && (
                          <p className="text-blue-600 font-semibold">
                            Check-in in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                          </p>
                        )}
                        {isPast && (
                          <p className="text-green-600 font-semibold">Stay completed</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/booking/${booking._id}`)}
                        className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      
                      {isUpcoming && booking.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => updateStatus(booking._id, 'cancelled')}
                            className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </button>
                          
                          <button
                            onClick={() => {/* Implement edit functionality */}}
                            className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modify
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Info */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>Showing {filteredBookings.length} of {bookings.length} bookings</p>
            <p className="mt-2">
              Need help? Contact our support team at support@hotelbooking.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;