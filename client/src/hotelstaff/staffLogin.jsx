

// import React, { useState } from "react";
// import axios from "axios";

// export default function StaffLogin() {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/staff/login", form);
//       localStorage.setItem("staffToken", res.data.token);
//       alert("Logged in successfully!");
//       setForm({ email: "", password: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Staff Login</h2>
//         <div className="space-y-4">
//           <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//           <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//         </div>
//         <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
//       </form>
//     </div>
//   );
// }

////////////////

import React, { useState } from "react";
import axios from "axios";

export default function StaffLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/staff/login", form);

      // Save token & staff info to localStorage
      localStorage.setItem("staffToken", res.data.token);
      localStorage.setItem("staffInfo", JSON.stringify(res.data.staff));

      alert("Login successful!");
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Staff Login
        </h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
