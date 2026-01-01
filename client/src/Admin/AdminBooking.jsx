// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminBooking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [editBooking, setEditBooking] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/bookings");
//       setBookings(res.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/bookings/${id}`);
//       fetchBookings();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   // Update booking
//   const handleUpdate = async () => {
//     if (!editBooking || !editBooking._id) {
//       alert("No booking selected");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/bookings/${editBooking._id}`,
//         {
//           customerName: editBooking.customerName,
//           customerEmail: editBooking.customerEmail,
//           guests: Number(editBooking.guests),
//           totalAmount: Number(editBooking.totalAmount),
//         }
//       );

//       console.log("UPDATED:", res.data);
//       setEditBooking(null);
//       fetchBookings();
//     } catch (error) {
//       console.error("UPDATE ERROR:", error.response?.data || error.message);
//       alert("Update failed. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Admin Booking Management
//       </h1>

//       {/* BOOKINGS TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 border">Hotel</th>
//               <th className="p-2 border">Room</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Guests</th>
//               <th className="p-2 border">Total</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b._id} className="text-center">
//                 <td className="p-2 border">{b.hotelName}</td>
//                 <td className="p-2 border">{b.roomName}</td>
//                 <td className="p-2 border">{b.customerName}</td>
//                 <td className="p-2 border">{b.guests}</td>
//                 <td className="p-2 border">Rs. {b.totalAmount}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     className="bg-blue-600 text-white px-3 py-1 rounded"
//                     onClick={() => setEditBooking({ ...b })}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                     onClick={() => handleDelete(b._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {bookings.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-500">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* UPDATE FORM */}
//       {editBooking && (
//         <div className="max-w-md mx-auto mt-8 bg-gray-100 p-6 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4 text-center">
//             Update Booking
//           </h2>

//           <input
//             type="text"
//             className="w-full p-2 border mb-3"
//             placeholder="Customer Name"
//             value={editBooking.customerName}
//             onChange={(e) =>
//               setEditBooking({ ...editBooking, customerName: e.target.value })
//             }
//           />

//           <input
//             type="email"
//             className="w-full p-2 border mb-3"
//             placeholder="Customer Email"
//             value={editBooking.customerEmail}
//             onChange={(e) =>
//               setEditBooking({ ...editBooking, customerEmail: e.target.value })
//             }
//           />

//           <input
//             type="number"
//             className="w-full p-2 border mb-3"
//             placeholder="Guests"
//             value={editBooking.guests}
//             onChange={(e) =>
//               setEditBooking({ ...editBooking, guests: e.target.value })
//             }
//           />

//           <input
//             type="number"
//             className="w-full p-2 border mb-4"
//             placeholder="Total Amount"
//             value={editBooking.totalAmount}
//             onChange={(e) =>
//               setEditBooking({ ...editBooking, totalAmount: e.target.value })
//             }
//           />

//           <div className="flex justify-between">
//             <button
//               onClick={handleUpdate}
//               disabled={loading}
//               className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>

//             <button
//               onClick={() => setEditBooking(null)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBooking;

////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  X,
  Check,
  User,
  Mail,
  Users,
  DollarSign,
  Building,
  Bed,
  Calendar,
  RefreshCw
} from "lucide-react";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Update booking
  const handleUpdate = async () => {
    if (!editBooking || !editBooking._id) {
      alert("No booking selected");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${editBooking._id}`,
        {
          customerName: editBooking.customerName,
          customerEmail: editBooking.customerEmail,
          guests: Number(editBooking.guests),
          totalAmount: Number(editBooking.totalAmount),
        }
      );

      console.log("UPDATED:", res.data);
      setEditBooking(null);
      setIsEditModalOpen(false);
      fetchBookings();
    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error.message);
      alert("Update failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotelName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Open edit modal
  const openEditModal = (booking) => {
    setEditBooking({ ...booking });
    setIsEditModalOpen(true);
  };

  // Stats calculation
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  const averageGuests = bookings.length > 0 
    ? (bookings.reduce((sum, booking) => sum + (booking.guests || 0), 0) / bookings.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Booking Management
          </h1>
          <p className="text-gray-600">Manage and monitor all hotel bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalBookings}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">Rs. {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Guests</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{averageGuests}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by customer, email, or hotel..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchBookings}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <tr>
                  <th className="p-4 text-left">Hotel & Room</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Guests</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.hotelName || "N/A"}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Bed className="w-4 h-4" />
                            {booking.roomName || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{booking.guests}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="font-bold text-green-600">Rs. {booking.totalAmount?.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(booking)}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No bookings found</p>
                {searchTerm && (
                  <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Edit Booking</h2>
                  <p className="text-gray-600 text-sm">Update booking details</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editBooking.customerName}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, customerName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Customer Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editBooking.customerEmail}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, customerEmail: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      <Users className="w-4 h-4" />
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editBooking.guests}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, guests: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Total Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editBooking.totalAmount}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, totalAmount: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Display hotel and room info (read-only) */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Booking Information</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Hotel: <span className="font-medium">{editBooking.hotelName}</span></span>
                    <span className="text-gray-700">Room: <span className="font-medium">{editBooking.roomName}</span></span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Update Booking
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooking;
