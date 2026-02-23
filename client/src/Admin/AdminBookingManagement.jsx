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
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Printer
} from "lucide-react";

export default function AdminBookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    confirmedBookings: 0,
    averageBookingValue: 0
  });
  const [editForm, setEditForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    totalAmount: 0,
    isPaid: false
  });

  // Fetch all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        navigate("/admin/login");
        return;
      }

      // Use your existing getAllBookings endpoint
      const response = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Fetched bookings:", response.data);
      
      // Handle both array and object responses
      const bookingsData = Array.isArray(response.data) ? response.data : 
                          response.data.bookings || [];
      
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
      calculateStats(bookingsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (bookingsData) => {
    const total = bookingsData.length;
    const revenue = bookingsData.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
    const pending = bookingsData.filter(b => !b.isPaid).length;
    const confirmed = bookingsData.filter(b => b.isPaid).length;
    const avgValue = total > 0 ? revenue / total : 0;

    setStats({
      totalBookings: total,
      totalRevenue: revenue,
      pendingPayments: pending,
      confirmedBookings: confirmed,
      averageBookingValue: avgValue
    });
  };

  // Filter bookings based on search and filters
  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "paid") {
        filtered = filtered.filter(booking => booking.isPaid === true);
      } else if (statusFilter === "pending") {
        filtered = filtered.filter(booking => booking.isPaid === false);
      }
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      
      if (dateFilter === "today") {
        filtered = filtered.filter(booking => {
          const bookingDate = new Date(booking.checkIn).setHours(0, 0, 0, 0);
          return bookingDate === today.getTime();
        });
      } else if (dateFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(booking => new Date(booking.checkIn) >= weekAgo);
      } else if (dateFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter(booking => new Date(booking.checkIn) >= monthAgo);
      }
    }

    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, bookings]);

  // Handle delete booking - using your existing delete endpoint
  const handleDeleteBooking = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Use your existing delete endpoint
      await axios.delete(`http://localhost:5000/api/bookings/${selectedBooking._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh bookings
      fetchBookings();
      setShowDeleteModal(false);
      setSelectedBooking(null);
      alert("Booking deleted successfully");
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking");
    }
  };

  // Handle update booking - using your existing update endpoint
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      
      // Use your existing update endpoint
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${selectedBooking._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Update response:", response.data);
      
      // Refresh bookings
      fetchBookings();
      setShowEditModal(false);
      setSelectedBooking(null);
      alert("Booking updated successfully");
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking");
    }
  };

  // Handle toggle payment status
  const handleTogglePayment = async (bookingId, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      // Use your existing update endpoint to toggle payment status
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { isPaid: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Payment status updated:", response.data);
      
      // Refresh bookings
      fetchBookings();
    } catch (err) {
      console.error("Error updating payment status:", err);
      alert("Failed to update payment status");
    }
  };

  // Generate invoice - using your existing invoice endpoint
  const handleGenerateInvoice = async (bookingId) => {
    try {
      const token = localStorage.getItem("adminToken");
      
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
    } catch (err) {
      console.error("Error generating invoice:", err);
      alert("Failed to generate invoice");
    }
  };

  // Export bookings to CSV
  const exportToCSV = () => {
    const headers = [
      "Booking ID",
      "Customer Name",
      "Email",
      "Phone",
      "Hotel",
      "Room",
      "Room Type",
      "Check In",
      "Check Out",
      "Guests",
      "Price/Night",
      "Total Amount",
      "Status",
      "Booking Date"
    ];

    const csvData = filteredBookings.map(booking => [
      booking._id,
      booking.customerName,
      booking.customerEmail,
      booking.customerPhone,
      booking.hotelName,
      booking.roomName,
      booking.roomType || "N/A",
      new Date(booking.checkIn).toLocaleDateString(),
      new Date(booking.checkOut).toLocaleDateString(),
      booking.guests,
      booking.pricePerNight || 0,
      booking.totalAmount,
      booking.isPaid ? "Paid" : "Pending",
      new Date(booking.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
          <p className="text-gray-600 text-lg">Loading bookings...</p>
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
            onClick={() => navigate("/admin/dashboard")}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all mb-4 inline-flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Booking Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage all hotel bookings, payments, and customer information
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">Rs. {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.confirmedBookings}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Booking Value</p>
                <p className="text-2xl font-bold text-indigo-600">Rs. {stats.averageBookingValue.toFixed(0)}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, hotel..."
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
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="text-right text-gray-600 py-3">
              Showing {currentBookings.length} of {filteredBookings.length} bookings
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Booking ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Hotel / Room</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Guests</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
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
                        <p className="font-medium text-gray-800">{booking.hotelName}</p>
                        <p className="text-sm text-gray-500">{booking.roomName}</p>
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
                      {booking.pricePerNight && (
                        <p className="text-xs text-gray-500">Rs. {booking.pricePerNight}/night</p>
                      )}
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
                          onClick={() => {
                            setSelectedBooking(booking);
                            setEditForm({
                              customerName: booking.customerName || "",
                              customerEmail: booking.customerEmail || "",
                              customerPhone: booking.customerPhone || "",
                              checkIn: booking.checkIn ? booking.checkIn.split('T')[0] : "",
                              checkOut: booking.checkOut ? booking.checkOut.split('T')[0] : "",
                              guests: booking.guests || 1,
                              totalAmount: booking.totalAmount || 0,
                              isPaid: booking.isPaid || false
                            });
                            setShowEditModal(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Booking"
                        >
                          <Edit className="w-5 h-5" />
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
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-5 h-5" />
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
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

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
                  {/* Booking ID */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                    <p className="font-mono text-gray-800">{selectedBooking._id}</p>
                  </div>

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

                  {/* Hotel Info */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Hotel className="w-5 h-5 mr-2 text-green-600" />
                      Hotel & Room Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Hotel</p>
                        <p className="font-medium">{selectedBooking.hotelName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Room</p>
                        <p className="font-medium">{selectedBooking.roomName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Room Type</p>
                        <p className="font-medium">{selectedBooking.roomType || "Standard"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price per Night</p>
                        <p className="font-medium">Rs. {selectedBooking.pricePerNight || 0}</p>
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

                <div className="mt-6 flex justify-end">
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

        {/* Edit Modal */}
        {showEditModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Booking</h2>
                
                <form onSubmit={handleUpdateBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={editForm.customerName}
                      onChange={(e) => setEditForm({...editForm, customerName: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.customerEmail}
                      onChange={(e) => setEditForm({...editForm, customerEmail: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.customerPhone}
                      onChange={(e) => setEditForm({...editForm, customerPhone: e.target.value})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check In
                      </label>
                      <input
                        type="date"
                        value={editForm.checkIn}
                        onChange={(e) => setEditForm({...editForm, checkIn: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check Out
                      </label>
                      <input
                        type="date"
                        value={editForm.checkOut}
                        onChange={(e) => setEditForm({...editForm, checkOut: e.target.value})}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editForm.guests}
                      onChange={(e) => setEditForm({...editForm, guests: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.totalAmount}
                      onChange={(e) => setEditForm({...editForm, totalAmount: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPaid"
                      checked={editForm.isPaid}
                      onChange={(e) => setEditForm({...editForm, isPaid: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isPaid" className="ml-2 text-sm text-gray-700">
                      Payment Completed
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
                    >
                      Update Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Delete Booking</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this booking? This action cannot be undone.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Booking:</span> {selectedBooking.roomName} at {selectedBooking.hotelName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Customer:</span> {selectedBooking.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Amount:</span> Rs. {selectedBooking.totalAmount}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedBooking(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBooking}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
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