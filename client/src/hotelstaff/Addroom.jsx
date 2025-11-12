// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // export default function AddRoom() {
// //   const [form, setForm] = useState({
// //     hotelId: "",
// //     roomNumber: "",
// //     category: "",
// //     price: "",
// //   });
// //   const [hotels, setHotels] = useState([]);
// //   const [images, setImages] = useState([]);

// //   // Fetch hotel list
// //   useEffect(() => {
// //     const fetchHotels = async () => {
// //       try {
// //         const { data } = await axios.get("http://localhost:5000/api/hotels");
// //         setHotels(data);
// //       } catch (err) {
// //         alert("Error fetching hotels");
// //       }
// //     };
// //     fetchHotels();
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     setImages(e.target.files);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       Object.keys(form).forEach((key) => formData.append(key, form[key]));
// //       for (let i = 0; i < images.length; i++) {
// //         formData.append("images", images[i]);
// //       }

// //       await axios.post("http://localhost:5000/api/rooms/add", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       alert("Room added successfully!");
// //       setForm({ hotelId: "", roomNumber: "", category: "", price: "" });
// //       setImages([]);
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error adding room");
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
// //       >
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Add Room
// //         </h2>

// //         {/* Hotel Dropdown */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Hotel</label>
// //           <select
// //             name="hotelId"
// //             value={form.hotelId}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-2 border rounded-lg"
// //           >
// //             <option value="">Select a hotel</option>
// //             {hotels.map((hotel) => (
// //               <option key={hotel._id} value={hotel._id}>
// //                 {hotel.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Room Number */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Room Number</label>
// //           <input
// //             name="roomNumber"
// //             type="text"
// //             value={form.roomNumber}
// //             onChange={handleChange}
// //             placeholder="Enter room number"
// //             required
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />
// //         </div>

// //         {/* Category */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Category</label>
// //           <select
// //             name="category"
// //             value={form.category}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-2 border rounded-lg"
// //           >
// //             <option value="">Select category</option>
// //             <option value="Single">Single</option>
// //             <option value="Double">Double</option>
// //             <option value="Suite">Suite</option>
// //             <option value="Deluxe">Deluxe</option>
// //           </select>
// //         </div>

// //         {/* Price */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Price per night</label>
// //           <input
// //             name="price"
// //             type="number"
// //             value={form.price}
// //             onChange={handleChange}
// //             placeholder="Enter price"
// //             required
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />
// //         </div>

// //         {/* Images */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Room Images</label>
// //           <input
// //             type="file"
// //             multiple
// //             onChange={handleImageChange}
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
// //         >
// //           Add Room
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// ///////////////////

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
//   };

//   // ✅ Handle file upload
//   const handleFileChange = (e) => {
//     setImages(Array.from(e.target.files));
//   };

//   // ✅ Submit form to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token || !hotelId) {
//       alert("You must be logged in as a hotel to add a room.");
//       navigate("/hotellogin");
//       return;
//     }

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     images.forEach((file) => formData.append("images", file));

//     try {
//       setLoading(true);
//       await axios.post(`http://localhost:5000/api/hotels/${hotelId}/rooms`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Room added successfully!");
//       navigate("/hoteldashboard");
//     } catch (error) {
//       console.error("Error adding room:", error);
//       alert(error.response?.data?.message || "Failed to add room");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Add New Room
//         </h2>

//         {/* Room Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Room Name</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="e.g. Deluxe Suite"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Room Type */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Room Type</label>
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option value="">Select Type</option>
//             <option value="Single">Single</option>
//             <option value="Double">Double</option>
//             <option value="Suite">Suite</option>
//             <option value="Deluxe">Deluxe</option>
//           </select>
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Price (Rs.)</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Enter price per night"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe the room..."
//             rows={3}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Availability */}
//         <div className="mb-4 flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="available"
//             checked={form.available}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <label className="text-gray-700">Available</label>
//         </div>

//         {/* Images */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-1">Upload Images</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white font-semibold py-2 rounded-lg transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {loading ? "Adding..." : "Add Room"}
//         </button>

//         {/* Back to Dashboard */}
//         <button
//           type="button"
//           onClick={() => navigate("/hoteldashboard")}
//           className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg"
//         >
//           Back to Dashboard
//         </button>
//       </form>
//     </div>
//   );
// }


///////////////////////

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // ✅ Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (validFiles.length !== files.length) {
      setError("Please select only image files (JPEG, PNG, etc.)");
    } else {
      setError("");
    }
    
    setImages(validFiles);
  };

  // ✅ Validate form
  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Room name is required");
      return false;
    }
    if (!form.type) {
      setError("Room type is required");
      return false;
    }
    if (!form.price || form.price <= 0) {
      setError("Valid price is required");
      return false;
    }
    if (!token || !hotelId) {
      setError("You must be logged in as a hotel to add a room.");
      return false;
    }
    return true;
  };

  // ✅ Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("available", form.available);
    
    // Append each image file
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Debug: Log what we're sending
    console.log("Submitting room data:", {
      hotelId,
      formData: {
        name: form.name,
        type: form.type,
        price: form.price,
        description: form.description,
        available: form.available,
      },
      files: images.length
    });

    try {
      setLoading(true);
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

      console.log("Room added successfully:", response.data);
      alert("✅ Room added successfully!");
      
      // Reset form
      setForm({
        name: "",
        type: "",
        price: "",
        description: "",
        available: true,
      });
      setImages([]);
      
      // Navigate back to dashboard
      navigate("/hoteldashboard");
    } catch (error) {
      console.error("Error adding room:", error);
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data.message || "Failed to add room";
        setError(`Error: ${errorMessage}`);
        alert(`Error: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error: Could not connect to server. Please check if the server is running.");
        alert("Network error: Could not connect to server");
      } else {
        // Something else happened
        setError("Error: " + error.message);
        alert("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove individual image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // ✅ Check if user is authenticated
  if (!token || !hotelId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6">You must be logged in as a hotel to add rooms.</p>
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add New Room
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Room Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Room Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Deluxe Suite, Ocean View Room"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Room Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Room Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Twin">Twin</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Executive">Executive</option>
              <option value="Presidential">Presidential</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Price (Rs.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price per night"
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Availability */}
          <div className="mb-4 flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700 font-semibold">Available for booking</label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the room features, size, bed type, view, etc..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-vertical"
          />
        </div>

        {/* Images Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-semibold">
            Room Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            You can select multiple images. Supported formats: JPEG, PNG, WebP
          </p>

          {/* Preview Selected Images */}
          {images.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Selected Images ({images.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 text-white font-semibold py-3 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Room...
              </span>
            ) : (
              "Add Room"
            )}
          </button>

          {/* Back to Dashboard */}
          <button
            type="button"
            onClick={() => navigate("/hoteldashboard")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Debug Info (remove in production) */}
        <div className="mt-6 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
          <p><strong>Debug Info:</strong></p>
          <p>Hotel ID: {hotelId}</p>
          <p>Token: {token ? "Present" : "Missing"}</p>
          <p>Images: {images.length} selected</p>
        </div>
      </form>
    </div>
  );
}
