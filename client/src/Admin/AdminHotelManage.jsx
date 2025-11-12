// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AdminHotelManage() {
//   const [hotels, setHotels] = useState([]);
//   const [editingHotel, setEditingHotel] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     location: "",
//     pricePerNight: "",
//     amenities: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch all hotels
//   const fetchHotels = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:5000/api/hotels");
//       setHotels(response.data);
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//       setMessage("Error fetching hotels");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   // Handle input changes for edit form
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Set hotel for editing
//   const handleEdit = (hotel) => {
//     setEditingHotel(hotel);
//     setForm({
//       name: hotel.name,
//       description: hotel.description,
//       location: hotel.location,
//       pricePerNight: hotel.pricePerNight,
//       amenities: hotel.amenities.join(","),
//     });
//   };

//   // Cancel editing
//   const handleCancelEdit = () => {
//     setEditingHotel(null);
//     setForm({
//       name: "",
//       description: "",
//       location: "",
//       pricePerNight: "",
//       amenities: "",
//     });
//   };

//   // Update hotel
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await axios.put(
//         `http://localhost:5000/api/hotels/${editingHotel._id}`,
//         form
//       );
      
//       setMessage("Hotel updated successfully!");
//       setEditingHotel(null);
//       setForm({
//         name: "",
//         description: "",
//         location: "",
//         pricePerNight: "",
//         amenities: "",
//       });
//       fetchHotels(); // Refresh the list
//     } catch (error) {
//       console.error("Error updating hotel:", error);
//       setMessage("Error updating hotel");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete hotel
//   const handleDelete = async (hotelId) => {
//     if (!window.confirm("Are you sure you want to delete this hotel?")) {
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`);
//       setMessage("Hotel deleted successfully!");
//       fetchHotels(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting hotel:", error);
//       setMessage("Error deleting hotel");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Hotel Management
//         </h1>

//         {message && (
//           <div
//             className={`mb-6 p-4 rounded-lg ${
//               message.includes("Error")
//                 ? "bg-red-100 text-red-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {message}
//             <button
//               onClick={() => setMessage("")}
//               className="float-right font-bold"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Edit Form */}
//         {editingHotel && (
//           <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">
//               Edit Hotel
//             </h2>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={form.location}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   rows="3"
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Price Per Night
//                   </label>
//                   <input
//                     type="number"
//                     name="pricePerNight"
//                     value={form.pricePerNight}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Amenities (comma separated)
//                   </label>
//                   <input
//                     type="text"
//                     name="amenities"
//                     value={form.amenities}
//                     onChange={handleChange}
//                     placeholder="WiFi, Pool, Spa, Gym"
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
//                 >
//                   {loading ? "Updating..." : "Update Hotel"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancelEdit}
//                   className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Hotels List */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 py-4 border-b">
//             <h2 className="text-xl font-semibold text-gray-800">
//               All Hotels ({hotels.length})
//             </h2>
//           </div>

//           {loading && !editingHotel ? (
//             <div className="p-8 text-center">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//               <p className="mt-2 text-gray-600">Loading hotels...</p>
//             </div>
//           ) : hotels.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No hotels found. Add some hotels to get started.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Hotel
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Location
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amenities
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {hotels.map((hotel) => (
//                     <tr key={hotel._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {hotel.images && hotel.images.length > 0 && (
//                             <img
//                               src={hotel.images[0]}
//                               alt={hotel.name}
//                               className="h-10 w-10 rounded-lg object-cover mr-3"
//                             />
//                           )}
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {hotel.name}
//                             </div>
//                             <div className="text-sm text-gray-500 line-clamp-1">
//                               {hotel.description}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {hotel.location}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         ${hotel.pricePerNight}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         <div className="flex flex-wrap gap-1">
//                           {hotel.amenities.slice(0, 3).map((amenity, index) => (
//                             <span
//                               key={index}
//                               className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                             >
//                               {amenity}
//                             </span>
//                           ))}
//                           {hotel.amenities.length > 3 && (
//                             <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
//                               +{hotel.amenities.length - 3} more
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(hotel)}
//                             className="text-blue-600 hover:text-blue-900 transition"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(hotel._id)}
//                             className="text-red-600 hover:text-red-900 transition"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


/////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminHotelManage() {
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    amenities: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all hotels
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setMessage("Error fetching hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Set hotel for editing
  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setForm({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      amenities: hotel.amenities.join(","),
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingHotel(null);
    setForm({
      name: "",
      description: "",
      location: "",
      amenities: "",
    });
  };

  // Update hotel
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/hotels/${editingHotel._id}`,
        form
      );
      setMessage("Hotel updated successfully!");
      setEditingHotel(null);
      setForm({
        name: "",
        description: "",
        location: "",
        amenities: "",
      });
      fetchHotels();
    } catch (error) {
      console.error("Error updating hotel:", error);
      setMessage("Error updating hotel");
    } finally {
      setLoading(false);
    }
  };

  // Delete hotel
  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`);
      setMessage("Hotel deleted successfully!");
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
      setMessage("Error deleting hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Hotel Management
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
            <button
              onClick={() => setMessage("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Edit Form */}
        {editingHotel && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Hotel
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={form.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, Pool, Spa, Gym"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Hotel"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Hotels List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              All Hotels ({hotels.length})
            </h2>
          </div>

          {loading && !editingHotel ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading hotels...</p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hotels found. Add some hotels to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amenities
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hotels.map((hotel) => (
                    <tr key={hotel._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {hotel.images && hotel.images.length > 0 && (
                            <img
                              src={hotel.images[0]}
                              alt={hotel.name}
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {hotel.name}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {hotel.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {hotel.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              +{hotel.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(hotel)}
                            className="text-blue-600 hover:text-blue-900 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(hotel._id)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

