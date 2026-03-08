// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function HotelLogin() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/hotels/login",
//         form,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       // Save token and hotel info locally
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("hotelId", res.data.hotel._id);
//       localStorage.setItem("hotelName", res.data.hotel.name);

//       // Redirect to hotel dashboard
//       navigate("/hoteldashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Hotel Login
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Enter password"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white font-semibold py-2 rounded-lg transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <a
//             href="/hotelregister"
//             className="text-blue-500 font-medium hover:underline"
//           >
//             Register here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// //////////////////////////////////


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HotelLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/hotels/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save token and hotel info locally
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("hotelId", res.data.hotel._id);
      localStorage.setItem("hotelName", res.data.hotel.name);

      // ✅ Success toast
      toast.success(`Welcome ${res.data.hotel.name}! Login successful.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Redirect to hotel dashboard
      setTimeout(() => {
        navigate("/hoteldashboard");
      }, 700);
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";

      // ✅ Error toast
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <ToastContainer />

      {/* ✅ Same style idea as Register: border + shadow + rounded + top strip */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        {/* top color strip */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-700" />

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Hotel Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/hotelregister"
              className="text-blue-600 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
