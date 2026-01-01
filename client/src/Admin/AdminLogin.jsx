// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // const AdminLogin = () => {
// // //   const [formData, setFormData] = useState({ email: "", password: "" });
// // //   const [loading, setLoading] = useState(false);

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setLoading(true);
// // //       const res = await axios.post("http://localhost:5000/api/admin/login", formData);
// // //       // Save token to localStorage
// // //       localStorage.setItem("adminToken", res.data.token);
// // //       alert("Login successful!");
// // //       setFormData({ email: "", password: "" });
// // //       // Optionally redirect to admin dashboard
// // //       window.location.href = "/admin/dashboard";
// // //     } catch (err) {
// // //       console.error(err);
// // //       const msg = err.response?.data?.message || err.message;
// // //       alert("Login failed: " + msg);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
// // //       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
// // //         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <input
// // //             name="email"
// // //             type="email"
// // //             value={formData.email}
// // //             onChange={handleChange}
// // //             placeholder="Email"
// // //             required
// // //             className="w-full border px-3 py-2 rounded"
// // //           />
// // //           <input
// // //             name="password"
// // //             type="password"
// // //             value={formData.password}
// // //             onChange={handleChange}
// // //             placeholder="Password"
// // //             required
// // //             className="w-full border px-3 py-2 rounded"
// // //           />
// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
// // //           >
// // //             {loading ? "Logging in..." : "Login"}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminLogin;


// // ////////////////////////////////////////////////////////

// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const AdminLogin = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/admin/login", {
// //         email,
// //         password,
// //       });

// //       // save token + admin data
// //       localStorage.setItem("adminToken", res.data.token);
// //       localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));

// //       navigate("/admin/dashboard");
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.message || "Login failed. Try again."
// //       );
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-6 rounded shadow-md w-96"
// //       >
// //         <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

// //         {error && (
// //           <p className="text-red-500 text-sm mb-3">{error}</p>
// //         )}

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           className="w-full p-2 border mb-3"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full p-2 border mb-4"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AdminLogin;


// ////////////////////////////////////////////////////////

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/login",
//         { email, password }
//       );

//       localStorage.setItem("adminToken", res.data.token);
//       localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));

//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Admin Login</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleLogin}>
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         /><br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         /><br /><br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

////////////////////////////////////////////////////////////

import axios from "axios";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      { email, password }
    );

    localStorage.setItem("adminToken", res.data.token);
    alert("Login success");
  };

  return (
    <>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </>
  );
}

