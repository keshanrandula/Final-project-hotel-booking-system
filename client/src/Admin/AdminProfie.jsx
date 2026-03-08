// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminProfile() {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAdminProfile = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         if (!token) {
//           setError("Admin is not logged in");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/admin/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setAdmin(res.data.admin);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Profile</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               value={admin?.name || ""}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               disabled
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={admin?.email || ""}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               disabled
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Role</label>
//             <input
//               type="text"
//               value={admin?.role || ""}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               disabled
//             />
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               onClick={() => window.location.href = "/admin/logout"}
//               className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-all"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

///////////////////////////////////

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminProfile() {
//   const [admin, setAdmin] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     newPassword: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const fetchAdminProfile = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         if (!token) {
//           setError("Admin is not logged in");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/admin/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setAdmin(res.data.admin);
//         setForm({
//           name: res.data.admin.name,
//           email: res.data.admin.email,
//           password: "", // Clear password field
//           newPassword: "", // Clear newPassword field
//         });
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//     if (successMessage) setSuccessMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("adminToken");

//       if (!token) {
//         setError("Admin is not logged in");
//         return;
//       }

//       const res = await axios.put(
//         "http://localhost:5000/api/admin/profile",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSuccessMessage("Profile updated successfully!");
//       setAdmin(res.data.admin);
//       setForm({
//         name: res.data.admin.name,
//         email: res.data.admin.email,
//         password: "", // Clear password field
//         newPassword: "", // Clear newPassword field
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "Profile update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Profile</h2>

//         {successMessage && (
//           <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
//             <p className="text-green-700 text-sm">{successMessage}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Current Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={form.newPassword}
//               onChange={handleChange}
//               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//             />
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   <span>Updating...</span>
//                 </div>
//               ) : (
//                 "Update Profile"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
////////////////////////////////////////////////
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setError("Admin is not logged in");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmin(res.data.admin);
        setForm({
          name: res.data.admin.name,
          email: res.data.admin.email,
          password: "",
          newPassword: "",
        });
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load profile";
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        const msg = "Admin is not logged in";
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000 });
        return;
      }

      const res = await axios.put(
        "http://localhost:5000/api/admin/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      setAdmin(res.data.admin);
      setForm({
        name: res.data.admin.name,
        email: res.data.admin.email,
        password: "",
        newPassword: "",
      });

      // ✅ SUCCESS TOAST
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

    } catch (err) {
      const msg = err.response?.data?.message || "Profile update failed";
      setError(msg);

      // ✅ ERROR TOAST
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ToastContainer />
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <ToastContainer />

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Profile
        </h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}