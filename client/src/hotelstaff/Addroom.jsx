// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";

// // // export default function AddRoom() {
// // //   const [form, setForm] = useState({
// // //     hotelId: "",
// // //     roomNumber: "",
// // //     category: "",
// // //     price: "",
// // //   });
// // //   const [hotels, setHotels] = useState([]);
// // //   const [images, setImages] = useState([]);

// // //   // Fetch hotel list
// // //   useEffect(() => {
// // //     const fetchHotels = async () => {
// // //       try {
// // //         const { data } = await axios.get("http://localhost:5000/api/hotels");
// // //         setHotels(data);
// // //       } catch (err) {
// // //         alert("Error fetching hotels");
// // //       }
// // //     };
// // //     fetchHotels();
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleImageChange = (e) => {
// // //     setImages(e.target.files);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const formData = new FormData();
// // //       Object.keys(form).forEach((key) => formData.append(key, form[key]));
// // //       for (let i = 0; i < images.length; i++) {
// // //         formData.append("images", images[i]);
// // //       }

// // //       await axios.post("http://localhost:5000/api/rooms/add", formData, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });

// // //       alert("Room added successfully!");
// // //       setForm({ hotelId: "", roomNumber: "", category: "", price: "" });
// // //       setImages([]);
// // //     } catch (error) {
// // //       alert(error.response?.data?.message || "Error adding room");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex justify-center min-h-screen bg-gray-100">
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
// // //       >
// // //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// // //           Add Room
// // //         </h2>

// // //         {/* Hotel Dropdown */}
// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Hotel</label>
// // //           <select
// // //             name="hotelId"
// // //             value={form.hotelId}
// // //             onChange={handleChange}
// // //             required
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           >
// // //             <option value="">Select a hotel</option>
// // //             {hotels.map((hotel) => (
// // //               <option key={hotel._id} value={hotel._id}>
// // //                 {hotel.name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         {/* Room Number */}
// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Room Number</label>
// // //           <input
// // //             name="roomNumber"
// // //             type="text"
// // //             value={form.roomNumber}
// // //             onChange={handleChange}
// // //             placeholder="Enter room number"
// // //             required
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           />
// // //         </div>

// // //         {/* Category */}
// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Category</label>
// // //           <select
// // //             name="category"
// // //             value={form.category}
// // //             onChange={handleChange}
// // //             required
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           >
// // //             <option value="">Select category</option>
// // //             <option value="Single">Single</option>
// // //             <option value="Double">Double</option>
// // //             <option value="Suite">Suite</option>
// // //             <option value="Deluxe">Deluxe</option>
// // //           </select>
// // //         </div>

// // //         {/* Price */}
// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Price per night</label>
// // //           <input
// // //             name="price"
// // //             type="number"
// // //             value={form.price}
// // //             onChange={handleChange}
// // //             placeholder="Enter price"
// // //             required
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           />
// // //         </div>

// // //         {/* Images */}
// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Room Images</label>
// // //           <input
// // //             type="file"
// // //             multiple
// // //             onChange={handleImageChange}
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           />
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
// // //         >
// // //           Add Room
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // ///////////////////

// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export default function AddRoom() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     type: "",
// //     price: "",
// //     description: "",
// //     available: true,
// //   });
// //   const [images, setImages] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");
// //   const hotelId = localStorage.getItem("hotelId");

// //   // ✅ Handle input changes
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   // ✅ Handle file upload
// //   const handleFileChange = (e) => {
// //     setImages(Array.from(e.target.files));
// //   };

// //   // ✅ Submit form to backend
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!token || !hotelId) {
// //       alert("You must be logged in as a hotel to add a room.");
// //       navigate("/hotellogin");
// //       return;
// //     }

// //     const formData = new FormData();
// //     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
// //     images.forEach((file) => formData.append("images", file));

// //     try {
// //       setLoading(true);
// //       await axios.post(`http://localhost:5000/api/hotels/${hotelId}/rooms`, formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });

// //       alert("✅ Room added successfully!");
// //       navigate("/hoteldashboard");
// //     } catch (error) {
// //       console.error("Error adding room:", error);
// //       alert(error.response?.data?.message || "Failed to add room");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
// //       >
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Add New Room
// //         </h2>

// //         {/* Room Name */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Room Name</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={form.name}
// //             onChange={handleChange}
// //             placeholder="e.g. Deluxe Suite"
// //             required
// //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //           />
// //         </div>

// //         {/* Room Type */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Room Type</label>
// //           <select
// //             name="type"
// //             value={form.type}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //           >
// //             <option value="">Select Type</option>
// //             <option value="Single">Single</option>
// //             <option value="Double">Double</option>
// //             <option value="Suite">Suite</option>
// //             <option value="Deluxe">Deluxe</option>
// //           </select>
// //         </div>

// //         {/* Price */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Price (Rs.)</label>
// //           <input
// //             type="number"
// //             name="price"
// //             value={form.price}
// //             onChange={handleChange}
// //             placeholder="Enter price per night"
// //             required
// //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //           />
// //         </div>

// //         {/* Description */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Description</label>
// //           <textarea
// //             name="description"
// //             value={form.description}
// //             onChange={handleChange}
// //             placeholder="Describe the room..."
// //             rows={3}
// //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //           />
// //         </div>

// //         {/* Availability */}
// //         <div className="mb-4 flex items-center gap-2">
// //           <input
// //             type="checkbox"
// //             name="available"
// //             checked={form.available}
// //             onChange={handleChange}
// //             className="w-5 h-5"
// //           />
// //           <label className="text-gray-700">Available</label>
// //         </div>

// //         {/* Images */}
// //         <div className="mb-6">
// //           <label className="block text-gray-700 mb-1">Upload Images</label>
// //           <input
// //             type="file"
// //             multiple
// //             accept="image/*"
// //             onChange={handleFileChange}
// //             className="w-full"
// //           />
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full text-white font-semibold py-2 rounded-lg transition ${
// //             loading
// //               ? "bg-gray-400 cursor-not-allowed"
// //               : "bg-green-500 hover:bg-green-600"
// //           }`}
// //         >
// //           {loading ? "Adding..." : "Add Room"}
// //         </button>

// //         {/* Back to Dashboard */}
// //         <button
// //           type="button"
// //           onClick={() => navigate("/hoteldashboard")}
// //           className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg"
// //         >
// //           Back to Dashboard
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// ///////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddRoom() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     price: "",
//     description: "",
//     available: true,
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const hotelId = localStorage.getItem("hotelId");

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     // Clear error when user starts typing
//     if (error) setError("");
//   };

//   // ✅ Handle file upload
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types
//     const validFiles = files.filter(file => 
//       file.type.startsWith('image/')
//     );
    
//     if (validFiles.length !== files.length) {
//       setError("Please select only image files (JPEG, PNG, etc.)");
//     } else {
//       setError("");
//     }
    
//     setImages(validFiles);
//   };

//   // ✅ Validate form
//   const validateForm = () => {
//     if (!form.name.trim()) {
//       setError("Room name is required");
//       return false;
//     }
//     if (!form.type) {
//       setError("Room type is required");
//       return false;
//     }
//     if (!form.price || form.price <= 0) {
//       setError("Valid price is required");
//       return false;
//     }
//     if (!token || !hotelId) {
//       setError("You must be logged in as a hotel to add a room.");
//       return false;
//     }
//     return true;
//   };

//   // ✅ Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validateForm()) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("type", form.type);
//     formData.append("price", form.price);
//     formData.append("description", form.description);
//     formData.append("available", form.available);
    
//     // Append each image file
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     // Debug: Log what we're sending
//     console.log("Submitting room data:", {
//       hotelId,
//       formData: {
//         name: form.name,
//         type: form.type,
//         price: form.price,
//         description: form.description,
//         available: form.available,
//       },
//       files: images.length
//     });

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `http://localhost:5000/api/hotels/${hotelId}/rooms`, 
//         formData, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Room added successfully:", response.data);
//       alert("✅ Room added successfully!");
      
//       // Reset form
//       setForm({
//         name: "",
//         type: "",
//         price: "",
//         description: "",
//         available: true,
//       });
//       setImages([]);
      
//       // Navigate back to dashboard
//       navigate("/hoteldashboard");
//     } catch (error) {
//       console.error("Error adding room:", error);
//       if (error.response) {
//         // Server responded with error status
//         const errorMessage = error.response.data.message || "Failed to add room";
//         setError(`Error: ${errorMessage}`);
//         alert(`Error: ${errorMessage}`);
//       } else if (error.request) {
//         // Request was made but no response received
//         setError("Network error: Could not connect to server. Please check if the server is running.");
//         alert("Network error: Could not connect to server");
//       } else {
//         // Something else happened
//         setError("Error: " + error.message);
//         alert("Error: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Remove individual image
//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   // ✅ Check if user is authenticated
//   if (!token || !hotelId) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-700 mb-6">You must be logged in as a hotel to add rooms.</p>
//           <button
//             onClick={() => navigate("/hotellogin")}
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Add New Room
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Room Name */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2 font-semibold">
//               Room Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="e.g. Deluxe Suite, Ocean View Room"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//           </div>

//           {/* Room Type */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2 font-semibold">
//               Room Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             >
//               <option value="">Select Type</option>
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Twin">Twin</option>
//               <option value="Suite">Suite</option>
//               <option value="Deluxe">Deluxe</option>
//               <option value="Executive">Executive</option>
//               <option value="Presidential">Presidential</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Price */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2 font-semibold">
//               Price (Rs.) <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               placeholder="Enter price per night"
//               min="0"
//               step="0.01"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//           </div>

//           {/* Availability */}
//           <div className="mb-4 flex items-center gap-2 pt-6">
//             <input
//               type="checkbox"
//               name="available"
//               checked={form.available}
//               onChange={handleChange}
//               className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
//             />
//             <label className="text-gray-700 font-semibold">Available for booking</label>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2 font-semibold">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe the room features, size, bed type, view, etc..."
//             rows={4}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-vertical"
//           />
//         </div>

//         {/* Images Upload */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2 font-semibold">
//             Room Images
//           </label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             You can select multiple images. Supported formats: JPEG, PNG, WebP
//           </p>

//           {/* Preview Selected Images */}
//           {images.length > 0 && (
//             <div className="mt-4">
//               <h4 className="font-semibold text-gray-700 mb-2">
//                 Selected Images ({images.length})
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {images.map((file, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt={`Preview ${index + 1}`}
//                       className="w-20 h-20 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex-1 text-white font-semibold py-3 rounded-lg transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Adding Room...
//               </span>
//             ) : (
//               "Add Room"
//             )}
//           </button>

//           {/* Back to Dashboard */}
//           <button
//             type="button"
//             onClick={() => navigate("/hoteldashboard")}
//             className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Debug Info (remove in production) */}
//         <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
//           <p><strong>Debug Info:</strong></p>
//           <p>Hotel ID: {hotelId}</p>
//           <p>Token: {token ? "Present" : "Missing"}</p>
//           <p>Images: {images.length} selected</p>
//         </div>
//       </form>
//     </div>
//   );
// }


//////////////////////////////////////////////

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddRoom() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     price: "",
//     description: "",
//     available: true,
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
  
//   // ✅ FIXED: Using hotelToken instead of token
//   const token = localStorage.getItem("hotelToken");
//   const hotelId = localStorage.getItem("hotelId");

//   // Debug logs
//   console.log("=== ADD ROOM DEBUG ===");
//   console.log("hotelToken:", token);
//   console.log("hotelId:", hotelId);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError("");
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types
//     const validFiles = files.filter(file => 
//       file.type.startsWith('image/')
//     );
    
//     if (validFiles.length !== files.length) {
//       setError("Please select only image files (JPEG, PNG, etc.)");
//     } else {
//       setError("");
//     }
    
//     setImages(validFiles);
//   };

//   // Validate form
//   const validateForm = () => {
//     if (!form.name.trim()) {
//       setError("Room name is required");
//       return false;
//     }
//     if (!form.type) {
//       setError("Room type is required");
//       return false;
//     }
//     if (!form.price || form.price <= 0) {
//       setError("Valid price is required");
//       return false;
//     }
//     return true;
//   };

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Check authentication
//     if (!token || !hotelId) {
//       setError("You must be logged in as a hotel to add a room.");
//       navigate("/hotellogin");
//       return;
//     }

//     // Validate form
//     if (!validateForm()) {
//       return;
//     }

//     // Prepare FormData
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("type", form.type);
//     formData.append("price", form.price);
//     formData.append("description", form.description);
//     formData.append("available", form.available);
    
//     // Append images
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     // Debug logs
//     console.log("=== SUBMITTING ROOM ===");
//     console.log("Hotel ID:", hotelId);
//     console.log("Token:", token ? "Present" : "Missing");
//     console.log("Form Data:", {
//       name: form.name,
//       type: form.type,
//       price: form.price,
//       description: form.description,
//       available: form.available,
//     });
//     console.log("Images:", images.length);

//     try {
//       setLoading(true);
      
//       const response = await axios.post(
//         `http://localhost:5000/api/hotels/${hotelId}/rooms`, 
//         formData, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("✅ Success:", response.data);
//       alert("Room added successfully!");
      
//       // Reset form
//       setForm({
//         name: "",
//         type: "",
//         price: "",
//         description: "",
//         available: true,
//       });
//       setImages([]);
      
//       // Navigate to dashboard
//       navigate("/hoteldashboard");
      
//     } catch (error) {
//       console.error("❌ Error:", error);
      
//       // Handle different error types
//       if (error.response) {
//         // Server responded with error
//         if (error.response.status === 404) {
//           setError("Hotel not found. Please login again.");
//           // Clear invalid data
//           localStorage.removeItem("hotelId");
//           localStorage.removeItem("hotelToken");
//           localStorage.removeItem("hotelName");
//           setTimeout(() => navigate("/hotellogin"), 2000);
//         } else if (error.response.status === 401) {
//           setError("Unauthorized. Please login again.");
//           localStorage.removeItem("hotelToken");
//           localStorage.removeItem("hotelId");
//           localStorage.removeItem("hotelName");
//           setTimeout(() => navigate("/hotellogin"), 2000);
//         } else if (error.response.status === 403) {
//           setError("You don't have permission to add rooms to this hotel.");
//         } else {
//           setError(error.response.data.message || "Failed to add room");
//         }
//       } else if (error.request) {
//         // Request made but no response
//         setError("Cannot connect to server. Please check if backend is running.");
//       } else {
//         // Something else
//         setError("Error: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove image from selection
//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   // Check if user is authenticated
//   if (!token || !hotelId) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-700 mb-2">You must be logged in as a hotel to add rooms.</p>
//           <p className="text-sm text-gray-600 mb-4">
//             Token: {token ? "✅ Present" : "❌ Missing"}<br/>
//             Hotel ID: {hotelId ? "✅ Present" : "❌ Missing"}
//           </p>
//           <button
//             onClick={() => navigate("/hotellogin")}
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-t-xl shadow-lg p-6 mb-1">
//           <h1 className="text-3xl font-bold text-gray-800 text-center">
//             Add New Room
//           </h1>
//           <p className="text-center text-gray-600 mt-2">
//             Fill in the details to add a new room to your hotel
//           </p>
//         </div>

//         {/* Main Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg p-8">
          
//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
//               <p className="font-medium">Error</p>
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
//               <p className="font-medium">Processing...</p>
//               <p>Please wait while we add your room.</p>
//             </div>
//           )}

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Left Column */}
//             <div className="space-y-4">
//               {/* Room Name */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Room Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="e.g. Deluxe Suite, Ocean View"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Room Type */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Room Type <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 >
//                   <option value="">Select Room Type</option>
//                   <option value="Single">Single Room</option>
//                   <option value="Double">Double Room</option>
//                   <option value="Twin">Twin Room</option>
//                   <option value="Suite">Suite</option>
//                   <option value="Deluxe">Deluxe Room</option>
//                   <option value="Executive">Executive Suite</option>
//                   <option value="Presidential">Presidential Suite</option>
//                   <option value="Family">Family Room</option>
//                 </select>
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Price per Night (Rs.) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   placeholder="5000"
//                   min="0"
//                   step="100"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               {/* Availability */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="available"
//                     checked={form.available}
//                     onChange={handleChange}
//                     className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-gray-700 font-semibold">
//                     Room is available for booking
//                   </span>
//                 </label>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   placeholder="Describe the room features, amenities, view, size, etc..."
//                   rows="4"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Images Section */}
//           <div className="mt-8">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Room Images
//             </label>
            
//             {/* Upload Area */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="image-upload"
//               />
//               <label htmlFor="image-upload" className="cursor-pointer">
//                 <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                   <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8m32 0l-6-6m6 6l-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 <p className="mt-1 text-sm text-gray-600">
//                   <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, JPEG up to 10MB each
//                 </p>
//               </label>
//             </div>

//             {/* Image Preview */}
//             {images.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-semibold text-gray-700 mb-2">
//                   Selected Images ({images.length})
//                 </h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//                   {images.map((file, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-500 hover:bg-green-600"
//               }`}
//             >
//               {loading ? "Adding Room..." : "Add Room"}
//             </button>
            
//             <button
//               type="button"
//               onClick={() => navigate("/hoteldashboard")}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
//             >
//               Cancel
//             </button>
//           </div>

//           {/* Debug Info */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-2">Debug Information</h4>
//             <div className="text-xs text-gray-600 space-y-1">
//               <p><span className="font-mono">hotelToken:</span> {token ? "✅ Present" : "❌ Missing"}</p>
//               <p><span className="font-mono">hotelId:</span> {hotelId || "❌ Missing"}</p>
//               <p><span className="font-mono">Images Selected:</span> {images.length}</p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddRoom() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     price: "",
//     description: "",
//     available: true,
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
  
//   // ✅ FIXED: Use "token" instead of "hotelToken"
//   const token = localStorage.getItem("token");
//   const hotelId = localStorage.getItem("hotelId");

//   // Debug logs
//   console.log("=== ADD ROOM DEBUG ===");
//   console.log("token:", token ? "✅ Present" : "❌ Missing");
//   console.log("hotelId:", hotelId);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) setError("");
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     const validFiles = files.filter(file => 
//       file.type.startsWith('image/')
//     );
    
//     if (validFiles.length !== files.length) {
//       setError("Please select only image files (JPEG, PNG, etc.)");
//     } else {
//       setError("");
//     }
    
//     setImages(validFiles);
//   };

//   // Validate form
//   const validateForm = () => {
//     if (!form.name.trim()) {
//       setError("Room name is required");
//       return false;
//     }
//     if (!form.type) {
//       setError("Room type is required");
//       return false;
//     }
//     if (!form.price || form.price <= 0) {
//       setError("Valid price is required");
//       return false;
//     }
//     return true;
//   };

//   // Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Check authentication
//     if (!token || !hotelId) {
//       setError("You must be logged in as a hotel to add a room.");
//       navigate("/hotellogin");
//       return;
//     }

//     // Validate form
//     if (!validateForm()) {
//       return;
//     }

//     // Prepare FormData
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("type", form.type);
//     formData.append("price", form.price);
//     formData.append("description", form.description);
//     formData.append("available", form.available);
    
//     // Append images
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     // Debug logs
//     console.log("=== SUBMITTING ROOM ===");
//     console.log("Hotel ID:", hotelId);
//     console.log("Token:", token ? "Present" : "Missing");

//     try {
//       setLoading(true);
      
//       const response = await axios.post(
//         `http://localhost:5000/api/hotels/${hotelId}/rooms`, 
//         formData, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("✅ Success:", response.data);
//       alert("✅ Room added successfully!");
      
//       // Reset form
//       setForm({
//         name: "",
//         type: "",
//         price: "",
//         description: "",
//         available: true,
//       });
//       setImages([]);
      
//       navigate("/hoteldashboard");
      
//     } catch (error) {
//       console.error("❌ Error:", error);
      
//       if (error.response) {
//         if (error.response.status === 403) {
//           setError("You don't have permission. Please login again.");
//           // Clear invalid data
//           localStorage.removeItem("token");
//           localStorage.removeItem("hotelId");
//           setTimeout(() => navigate("/hotellogin"), 2000);
//         } else if (error.response.status === 401) {
//           setError("Session expired. Please login again.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("hotelId");
//           setTimeout(() => navigate("/hotellogin"), 2000);
//         } else if (error.response.status === 404) {
//           setError("Hotel not found. Please login again.");
//           localStorage.removeItem("hotelId");
//           setTimeout(() => navigate("/hotellogin"), 2000);
//         } else {
//           setError(error.response.data.message || "Failed to add room");
//         }
//       } else if (error.request) {
//         setError("Cannot connect to server. Please check if backend is running.");
//       } else {
//         setError("Error: " + error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove image from selection
//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages.splice(index, 1);
//     setImages(newImages);
//   };

//   // Check if user is authenticated
//   if (!token || !hotelId) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-700 mb-2">You must be logged in as a hotel to add rooms.</p>
//           <p className="text-sm text-gray-600 mb-4">
//             Token: {token ? "✅ Present" : "❌ Missing"}<br/>
//             Hotel ID: {hotelId ? "✅ Present" : "❌ Missing"}
//           </p>
//           <button
//             onClick={() => navigate("/hotellogin")}
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-t-xl shadow-lg p-6 mb-1">
//           <h1 className="text-3xl font-bold text-gray-800 text-center">
//             Add New Room
//           </h1>
//           <p className="text-center text-gray-600 mt-2">
//             Fill in the details to add a new room to your hotel
//           </p>
//         </div>

//         {/* Main Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg p-8">
          
//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
//               <p className="font-medium">Error</p>
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
//               <p className="font-medium">Processing...</p>
//               <p>Please wait while we add your room.</p>
//             </div>
//           )}

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Left Column */}
//             <div className="space-y-4">
//               {/* Room Name */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Room Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="e.g. Deluxe Suite, Ocean View"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 />
//               </div>

//               {/* Room Type */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Room Type <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 >
//                   <option value="">Select Room Type</option>
//                   <option value="Single">Single Room</option>
//                   <option value="Double">Double Room</option>
//                   <option value="Twin">Twin Room</option>
//                   <option value="Suite">Suite</option>
//                   <option value="Deluxe">Deluxe Room</option>
//                   <option value="Executive">Executive Suite</option>
//                   <option value="Presidential">Presidential Suite</option>
//                   <option value="Family">Family Room</option>
//                 </select>
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Price per Night (Rs.) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={form.price}
//                   onChange={handleChange}
//                   placeholder="5000"
//                   min="0"
//                   step="100"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               {/* Availability */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="available"
//                     checked={form.available}
//                     onChange={handleChange}
//                     className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-gray-700 font-semibold">
//                     Room is available for booking
//                   </span>
//                 </label>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   placeholder="Describe the room features, amenities, view, size, etc..."
//                   rows="4"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Images Section */}
//           <div className="mt-8">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Room Images
//             </label>
            
//             {/* Upload Area */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="image-upload"
//               />
//               <label htmlFor="image-upload" className="cursor-pointer">
//                 <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                   <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8m32 0l-6-6m6 6l-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 <p className="mt-1 text-sm text-gray-600">
//                   <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, JPEG up to 10MB each
//                 </p>
//               </label>
//             </div>

//             {/* Image Preview */}
//             {images.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-semibold text-gray-700 mb-2">
//                   Selected Images ({images.length})
//                 </h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
//                   {images.map((file, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               }`}
//             >
//               {loading ? "Adding Room..." : "Add Room"}
//             </button>
            
//             <button
//               type="button"
//               onClick={() => navigate("/hoteldashboard")}
//               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
//             >
//               Cancel
//             </button>
//           </div>

//           {/* Debug Info */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-semibold text-gray-700 mb-2">Debug Information</h4>
//             <div className="text-xs text-gray-600 space-y-1">
//               <p><span className="font-mono">token:</span> {token ? "✅ Present" : "❌ Missing"}</p>
//               <p><span className="font-mono">hotelId:</span> {hotelId || "❌ Missing"}</p>
//               <p><span className="font-mono">Images Selected:</span> {images.length}</p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


///////////////////new add ////

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddRoom() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    available: true,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ FIXED: Use "token" instead of "hotelToken"
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  // Debug logs
  console.log("=== ADD ROOM DEBUG ===");
  console.log("token:", token ? "✅ Present" : "❌ Missing");
  console.log("hotelId:", hotelId);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length !== files.length) {
      const msg = "Please select only image files (JPEG, PNG, etc.)";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
    } else {
      setError("");
    }

    setImages(validFiles);
  };

  // Validate form
  const validateForm = () => {
    if (!form.name.trim()) {
      const msg = "Room name is required";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }
    if (!form.type) {
      const msg = "Room type is required";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }
    if (!form.price || form.price <= 0) {
      const msg = "Valid price is required";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }
    return true;
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check authentication
    if (!token || !hotelId) {
      const msg = "You must be logged in as a hotel to add a room.";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
      navigate("/hotellogin");
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("available", form.available);

    // Append images
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Debug logs
    console.log("=== SUBMITTING ROOM ===");
    console.log("Hotel ID:", hotelId);
    console.log("Token:", token ? "Present" : "Missing");

    try {
      setLoading(true);
      toast.info("Adding room... Please wait.", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });

      const response = await axios.post(
        `http://localhost:5000/api/hotels/${hotelId}/rooms`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Success:", response.data);

      toast.success("✅ Room added successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });

      // Reset form
      setForm({
        name: "",
        type: "",
        price: "",
        description: "",
        available: true,
      });
      setImages([]);

      setTimeout(() => {
        navigate("/hoteldashboard");
      }, 700);
    } catch (error) {
      console.error("❌ Error:", error);

      if (error.response) {
        if (error.response.status === 403) {
          const msg = "You don't have permission. Please login again.";
          setError(msg);
          toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });

          // Clear invalid data
          localStorage.removeItem("token");
          localStorage.removeItem("hotelId");
          setTimeout(() => navigate("/hotellogin"), 2000);
        } else if (error.response.status === 401) {
          const msg = "Session expired. Please login again.";
          setError(msg);
          toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });

          localStorage.removeItem("token");
          localStorage.removeItem("hotelId");
          setTimeout(() => navigate("/hotellogin"), 2000);
        } else if (error.response.status === 404) {
          const msg = "Hotel not found. Please login again.";
          setError(msg);
          toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });

          localStorage.removeItem("hotelId");
          setTimeout(() => navigate("/hotellogin"), 2000);
        } else {
          const msg = error.response.data.message || "Failed to add room";
          setError(msg);
          toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
        }
      } else if (error.request) {
        const msg = "Cannot connect to server. Please check if backend is running.";
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
      } else {
        const msg = "Error: " + error.message;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove image from selection
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Check if user is authenticated
  if (!token || !hotelId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-2">
            You must be logged in as a hotel to add rooms.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Token: {token ? "✅ Present" : "❌ Missing"}
            <br />
            Hotel ID: {hotelId ? "✅ Present" : "❌ Missing"}
          </p>
          <button
            onClick={() => navigate("/hotellogin")}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-lg p-6 mb-1">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Add New Room
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Fill in the details to add a new room to your hotel
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg p-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
              <p className="font-medium">Processing...</p>
              <p>Please wait while we add your room.</p>
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Room Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Room Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Deluxe Suite, Ocean View"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Room Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Single">Single Room</option>
                  <option value="Double">Double Room</option>
                  <option value="Twin">Twin Room</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe Room</option>
                  <option value="Executive">Executive Suite</option>
                  <option value="Presidential">Presidential Suite</option>
                  <option value="Family">Family Room</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Price per Night (Rs.) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="5000"
                  min="0"
                  step="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Availability */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-semibold">
                    Room is available for booking
                  </span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the room features, amenities, view, size, etc..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="mt-8">
            <label className="block text-gray-700 font-semibold mb-2">
              Room Images
            </label>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8a4 4 0 01-4-4v-8m32 0l-6-6m6 6l-6 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB each</p>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Selected Images ({images.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Adding Room..." : "Add Room"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/hoteldashboard")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Debug Information</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-mono">token:</span>{" "}
                {token ? "✅ Present" : "❌ Missing"}
              </p>
              <p>
                <span className="font-mono">hotelId:</span>{" "}
                {hotelId || "❌ Missing"}
              </p>
              <p>
                <span className="font-mono">Images Selected:</span> {images.length}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}