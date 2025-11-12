
// import React, { useState } from "react";
// import axios from "axios";

// export default function StaffRegister() {
//   const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/staff/register", form);
//       localStorage.setItem("staffToken", res.data.token);
//       alert("Registered successfully!");
//       setForm({ firstName: "", lastName: "", email: "", password: "" });
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Staff Register</h2>
//         <div className="space-y-4">
//           <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//           <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//           <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//           <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//         </div>
//         <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
//       </form>
//     </div>
//   );
// }

/////////////
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RegisterStaff() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hotel: "",
  });
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/hotels")
      .then((res) => setHotels(res.data))
      .catch(() => alert("Failed to fetch hotels"));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/staff/register", form);
      alert("Staff registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />

      {/* 🔥 Dropdown for hotel */}
      <select name="hotel" value={form.hotel} onChange={handleChange} required>
        <option value="">Select Hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel._id} value={hotel._id}>
            {hotel.name}
          </option>
        ))}
      </select>

      <button type="submit">Register</button>
    </form>
  );
}
