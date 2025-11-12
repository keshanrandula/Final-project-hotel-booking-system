// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditHotelProfile() {
//   const [hotel, setHotel] = useState({
//     name: "",
//     description: "",
//     location: "",
//     amenities: "",
//     email: "",
//     images: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedImages, setSelectedImages] = useState([]);
  
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const hotelId = localStorage.getItem("hotelId");

//   useEffect(() => {
//     const fetchHotelData = async () => {
//       if (!token || !hotelId) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         const hotelData = res.data;
//         setHotel({
//           ...hotelData,
//           amenities: hotelData.amenities ? hotelData.amenities.join(", ") : ""
//         });
//       } catch (err) {
//         console.error("Error fetching hotel:", err);
//         alert("Error loading hotel data");
//         navigate("/dashboard");
//       }
//     };

//     fetchHotelData();
//   }, [token, hotelId, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setHotel(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     setSelectedImages(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const formData = new FormData();
//       formData.append("name", hotel.name);
//       formData.append("description", hotel.description);
//       formData.append("location", hotel.location);
//       formData.append("amenities", hotel.amenities);
//       formData.append("email", hotel.email);

//       // Append new images if selected
//       if (selectedImages.length > 0) {
//         selectedImages.forEach(image => {
//           formData.append("images", image);
//         });
//       }

//       const res = await axios.put(
//         `http://localhost:5000/api/hotels/${hotelId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage("Hotel profile updated successfully!");
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } catch (err) {
//       console.error("Update error:", err);
//       setMessage(err.response?.data?.message || "Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteHotel = async () => {
//     if (!window.confirm("Are you sure you want to delete your hotel? This action cannot be undone.")) {
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Hotel deleted successfully");
//       localStorage.removeItem("token");
//       localStorage.removeItem("hotelId");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert(err.response?.data?.message || "Error deleting hotel");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Edit Hotel Profile</h2>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ← Back to Dashboard
//             </button>
//           </div>

//           {message && (
//             <div className={`p-4 rounded-lg mb-6 ${
//               message.includes("successfully") 
//                 ? "bg-green-100 text-green-700" 
//                 : "bg-red-100 text-red-700"
//             }`}>
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Hotel Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={hotel.name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={hotel.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={hotel.location}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={hotel.description}
//                 onChange={handleInputChange}
//                 rows="4"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Amenities (comma separated)
//               </label>
//               <input
//                 type="text"
//                 name="amenities"
//                 value={hotel.amenities}
//                 onChange={handleInputChange}
//                 placeholder="WiFi, Pool, Spa, Restaurant"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Update Images (optional)
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Select new images to replace current ones
//               </p>
//             </div>

//             {/* Current Images Preview */}
//             {hotel.images && hotel.images.length > 0 && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Current Images
//                 </label>
//                 <div className="grid grid-cols-3 gap-4">
//                   {hotel.images.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`Hotel ${idx + 1}`}
//                       className="w-full h-24 object-cover rounded-lg"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between pt-6">
//               {/* <button
//                 type="button"
//                 onClick={handleDeleteHotel}
//                 className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Delete Hotel
//               </button> */}

//               <div className="space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/dashboard")}
//                   className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
//                 >
//                   {loading ? "Updating..." : "Update Profile"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHotelProfile() {
  const [hotel, setHotel] = useState({
    name: "",
    description: "",
    location: "",
    amenities: "",
    email: "",
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // success or error
  const [selectedImages, setSelectedImages] = useState([]);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!token || !hotelId) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const hotelData = res.data;
        setHotel({
          ...hotelData,
          amenities: hotelData.amenities ? hotelData.amenities.join(", ") : ""
        });
      } catch (err) {
        console.error("Error fetching hotel:", err);
        setMessage({ 
          text: "Error loading hotel data", 
          type: "error" 
        });
      }
    };

    fetchHotelData();
  }, [token, hotelId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
    // Clear message when user selects new images
    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("name", hotel.name);
      formData.append("description", hotel.description);
      formData.append("location", hotel.location);
      formData.append("amenities", hotel.amenities);
      formData.append("email", hotel.email);

      // Append new images if selected
      if (selectedImages.length > 0) {
        selectedImages.forEach(image => {
          formData.append("images", image);
        });
      }

      const res = await axios.put(
        `http://localhost:5000/api/hotels/${hotelId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success message
      setMessage({ 
        text: "✅ Hotel profile updated successfully!", 
        type: "success" 
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Update error:", err);
      
      // Show specific error messages based on response
      let errorMessage = "Error updating profile";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.response?.status === 400) {
        errorMessage = "Invalid data. Please check your inputs.";
      } else if (err.response?.status === 401) {
        errorMessage = "Session expired. Please login again.";
        localStorage.removeItem("token");
        localStorage.removeItem("hotelId");
        setTimeout(() => navigate("/login"), 2000);
      } else if (err.response?.status === 403) {
        errorMessage = "You are not authorized to update this hotel.";
      } else if (err.response?.status === 404) {
        errorMessage = "Hotel not found.";
      }

      setMessage({ 
        text: `❌ ${errorMessage}`, 
        type: "error" 
      });

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("hotelId");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Hotel Profile</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Success/Error Message Display */}
          {message.text && (
            <div className={`p-4 rounded-lg mb-6 border ${
              message.type === "success" 
                ? "bg-green-100 text-green-700 border-green-200" 
                : "bg-red-100 text-red-700 border-red-200"
            }`}>
              <div className="flex items-center">
                {message.type === "success" ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
              {message.type === "success" && (
                <p className="text-sm mt-1 opacity-90">
                  Redirecting to dashboard...
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={hotel.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={hotel.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={hotel.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={hotel.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities (comma separated)
              </label>
              <input
                type="text"
                name="amenities"
                value={hotel.amenities}
                onChange={handleInputChange}
                placeholder="WiFi, Pool, Spa, Restaurant"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Images (optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Select new images to replace current ones
              </p>
            </div>

            {/* Current Images Preview */}
            {hotel.images && hotel.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Images
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {hotel.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Hotel ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center px-6 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                disabled={loading}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>

              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}