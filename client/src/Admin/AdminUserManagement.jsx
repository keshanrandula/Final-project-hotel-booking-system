// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AdminUserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const token = localStorage.getItem("token");

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const fetchUsers = async () => {
//     if (!token) {
//       toast.error("Please login first");
//       window.location.href = "/login";
//       return;
//     }

//     setLoading(true);

//     const possibleEndpoints = [
//       "http://localhost:5000/api/auth",
//       "http://localhost:5000/api/users",
//       "http://localhost:5000/api/auth/users",
//     ];

//     let success = false;
//     let lastError = "";

//     for (const url of possibleEndpoints) {
//       try {
//         const res = await axios.get(url, { headers });

//         const fetchedUsers = res.data?.users || res.data || [];
//         if (Array.isArray(fetchedUsers)) {
//           setUsers(fetchedUsers);
//           success = true;
//           break;
//         }
//       } catch (err) {
//         lastError =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch users";
//       }
//     }

//     if (!success) {
//       toast.error(lastError || "Failed to fetch users");
//     }

//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (!confirmDelete) return;

//     setDeletingId(id);

//     const possibleDeleteEndpoints = [
//       `http://localhost:5000/api/auth/${id}`,
//       `http://localhost:5000/api/users/${id}`,
//       `http://localhost:5000/api/auth/users/${id}`,
//     ];

//     let success = false;
//     let lastError = "";

//     for (const url of possibleDeleteEndpoints) {
//       try {
//         await axios.delete(url, { headers });

//         setUsers((prev) => prev.filter((user) => user._id !== id));
//         toast.success("User deleted successfully");
//         success = true;
//         break;
//       } catch (err) {
//         lastError =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to delete user";
//       }
//     }

//     if (!success) {
//       toast.error(lastError || "Failed to delete user");
//     }

//     setDeletingId(null);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
//       <ToastContainer />

//       <div className="mx-auto max-w-7xl rounded-3xl border border-blue-100 bg-white shadow-xl">
//         <div className="flex flex-col gap-4 border-b border-blue-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-blue-700">
//               Customer Management
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               View registered customers and delete accounts
//             </p>
//           </div>

//           <button
//             onClick={fetchUsers}
//             className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//           >
//             Refresh
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex min-h-[300px] items-center justify-center px-6 py-10">
//             <p className="text-lg font-medium text-blue-700">Loading users...</p>
//           </div>
//         ) : users.length === 0 ? (
//           <div className="flex min-h-[300px] items-center justify-center px-6 py-10">
//             <p className="text-center text-base text-slate-500">No users found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto p-4 sm:p-6">
//             <div className="overflow-hidden rounded-2xl border border-blue-100">
//               <table className="min-w-full divide-y divide-blue-100">
//                 <thead className="bg-blue-50">
//                   <tr>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       First Name
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Last Name
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Email
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Phone
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Address
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Role
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Status
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-blue-50 bg-white">
//                   {users.map((user) => (
//                     <tr key={user._id} className="transition hover:bg-blue-50/60">
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.firstName || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.lastName || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.email || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.phone || "-"}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-slate-700">
//                         {user.address || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.role || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm">
//                         {user.isActive ? (
//                           <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
//                             Active
//                           </span>
//                         ) : (
//                           <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
//                             Inactive
//                           </span>
//                         )}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm">
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           disabled={deletingId === user._id}
//                           className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           {deletingId === user._id ? "Deleting..." : "Delete"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

////////////////////////
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AdminUserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first");
//       window.location.href = "/login";
//       return;
//     }

//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get("http://localhost:5000/api/auth", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.log("Fetch users error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (!confirmDelete) return;

//     try {
//       setDeletingId(id);

//       await axios.delete(`http://localhost:5000/api/auth/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers((prev) => prev.filter((user) => user._id !== id));

//       toast.success("User deleted successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "light",
//       });
//     } catch (err) {
//       console.log("Delete error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Delete failed");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-blue-50 flex items-center justify-center">
//         <p className="text-xl font-semibold text-blue-700">Loading users...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
//       <ToastContainer />

//       <div className="mx-auto max-w-7xl rounded-3xl border border-blue-100 bg-white shadow-xl">
//         <div className="flex flex-col gap-4 border-b border-blue-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-blue-700">
//               Customer Management
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               View registered customers and delete accounts
//             </p>
//           </div>

//           <button
//             onClick={fetchUsers}
//             className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
//           >
//             Refresh
//           </button>
//         </div>

//         {users.length === 0 ? (
//           <div className="flex min-h-[300px] items-center justify-center px-6 py-10">
//             <p className="text-center text-base text-slate-500">No users found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto p-4 sm:p-6">
//             <div className="overflow-hidden rounded-2xl border border-blue-100">
//               <table className="min-w-full divide-y divide-blue-100">
//                 <thead className="bg-blue-50">
//                   <tr>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       First Name
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Last Name
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Email
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Phone
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Address
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Role
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Status
//                     </th>
//                     <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-blue-50 bg-white">
//                   {users.map((user) => (
//                     <tr key={user._id} className="transition hover:bg-blue-50/60">
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.firstName || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.lastName || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.email || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.phone || "-"}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-slate-700">
//                         {user.address || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
//                         {user.role || "-"}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm">
//                         {user.isActive ? (
//                           <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
//                             Active
//                           </span>
//                         ) : (
//                           <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
//                             Inactive
//                           </span>
//                         )}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-sm">
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           disabled={deletingId === user._id}
//                           className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           {deletingId === user._id ? "Deleting..." : "Delete"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//////////////////////////////

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    isActive: true,
  });

  // Get admin token
  const token = localStorage.getItem("adminToken");

  // Axios config with token - FIXED URL (removed trailing slash)
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all users - FIXED URL
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("Fetching users...");
      
      // IMPORTANT: Make sure URL is exactly "http://localhost:5000/api/users" without trailing slash
      const response = await axios.get(
        "http://localhost:5000/api/users",
        axiosConfig
      );

      console.log("API Response:", response.data);

      // Handle different response structures
      let usersData = [];
      if (response.data.users && Array.isArray(response.data.users)) {
        usersData = response.data.users;
      } else if (Array.isArray(response.data)) {
        usersData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        usersData = response.data.data;
      }

      console.log("Users data:", usersData);
      setUsers(usersData);
      
    } catch (error) {
      console.error("Error fetching users:", error);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
      } else if (error.response?.status === 404) {
        toast.error("API endpoint not found. Check backend server.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.includes(searchTerm)
    );
  });

  // Delete user - FIXED URL
  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete "${userName}"?`)) {
      try {
        await axios.delete(
          `http://localhost:5000/api/users/${userId}`,
          axiosConfig
        );
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  // Open edit modal
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "user",
      isActive: user.isActive !== false,
    });
    setShowEditModal(true);
  };

  // Open view modal
  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Update user - FIXED URL
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/${selectedUser._id}`,
        editForm,
        axiosConfig
      );
      toast.success("User updated successfully!");
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive !== false).length,
    inactive: users.filter(u => u.isActive === false).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard - User Management
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Inactive Users</h3>
            <p className="text-3xl font-bold text-red-600">{stats.inactive}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive !== false
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewClick(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteUser(
                            user._id,
                            `${user.firstName} ${user.lastName}`
                          )
                        }
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                User Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Name:</label>
                  <p className="text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email:</label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone:</label>
                  <p className="text-gray-900">
                    {selectedUser.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Address:</label>
                  <p className="text-gray-900">
                    {selectedUser.address || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Role:</label>
                  <p className="text-gray-900">{selectedUser.role || "user"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status:</label>
                  <p className="text-gray-900">
                    {selectedUser.isActive !== false ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Joined:</label>
                  <p className="text-gray-900">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit User
              </h3>
              <form onSubmit={handleUpdateUser}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Address
                    </label>
                    <textarea
                      value={editForm.address}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Role
                    </label>
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editForm.isActive}
                      onChange={(e) =>
                        setEditForm({ ...editForm, isActive: e.target.checked })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Active Account
                    </label>
                  </div>
                </div>
                <div className="mt-5 flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}