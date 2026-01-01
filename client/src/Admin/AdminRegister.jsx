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

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      console.log("REGISTER TOKEN:", token); // DEBUG

      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ MUST
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(res.data.message);
      setError("");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Register failed");
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register Admin</h2>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br /><br />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br /><br />

        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;

