// // import React, { useState } from "react";
// // import axios from "axios";

// // const AdminRegister = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       const res = await axios.post("http://localhost:5000/api/admin/register", {
// //         name: formData.name,
// //         email: formData.email,
// //         password: formData.password,
// //       });
// //       alert("Admin registered successfully!");
// //       setFormData({ name: "", email: "", password: "", confirmPassword: "" });
// //     } catch (err) {
// //       console.error(err);
// //       const msg = err.response?.data?.message || err.message;
// //       alert("Registration failed: " + msg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
// //       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-4">Admin Register</h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             placeholder="Name"
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           />
// //           <input
// //             name="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             placeholder="Email"
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           />
// //           <input
// //             name="password"
// //             type="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             placeholder="Password"
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           />
// //           <input
// //             name="confirmPassword"
// //             type="password"
// //             value={formData.confirmPassword}
// //             onChange={handleChange}
// //             placeholder="Confirm Password"
// //             required
// //             className="w-full border px-3 py-2 rounded"
// //           />
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
// //           >
// //             {loading ? "Registering..." : "Register"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminRegister;


// ///////////////////////////////////////////////


// import { useState } from "react";
// import axios from "axios";

// const AdminRegister = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const token = localStorage.getItem("adminToken");

//       const res = await axios.post(
//         "http://localhost:5000/api/admin/register",
//         { name, email, password, role },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message);

//       // clear form
//       setName("");
//       setEmail("");
//       setPassword("");
//       setRole("admin");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Admin registration failed"
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Register New Admin
//         </h2>

//         {message && (
//           <p className="text-green-600 text-sm mb-3">{message}</p>
//         )}
//         {error && (
//           <p className="text-red-600 text-sm mb-3">{error}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border mb-3"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <select
//           className="w-full p-2 border mb-4"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="admin">Admin</option>
//           <option value="moderator">Moderator</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded"
//         >
//           Register Admin
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminRegister;

//////////////////////////////////////

import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        form
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        alert("Admin registered successfully");
        window.location.href = "/admin/login";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Registration
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an admin account?{" "}
          <a href="/admin/login" className="text-blue-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
