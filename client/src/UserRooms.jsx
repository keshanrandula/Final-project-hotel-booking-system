// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UserRooms() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [hotel, setHotel] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [debugInfo, setDebugInfo] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log("=== DEBUG START ===");
//         console.log("Hotel ID from URL:", id);
        
//         // Test the API endpoint
//         const apiUrl = `http://localhost:5000/api/hotels/${id}`;
//         console.log("API URL:", apiUrl);
        
//         // Try to fetch the hotel
//         const response = await axios.get(apiUrl);
//         console.log("API Response status:", response.status);
//         console.log("API Response data:", response.data);
        
//         setHotel(response.data);
        
//         // Check for rooms
//         if (response.data.rooms && Array.isArray(response.data.rooms)) {
//           console.log(`Found ${response.data.rooms.length} rooms`);
//           setRooms(response.data.rooms);
//         } else {
//           console.log("No rooms array in response");
//           setRooms([]);
//         }
        
//         setDebugInfo(`
//           ✅ Hotel loaded successfully!
//           Name: ${response.data.name}
//           Location: ${response.data.location}
//           Rooms found: ${response.data.rooms?.length || 0}
//           API: ${apiUrl}
//         `);
        
//       } catch (err) {
//         console.error("=== FETCH ERROR ===");
//         console.error("Error:", err);
//         console.error("Error message:", err.message);
//         console.error("Error response:", err.response);
        
//         let errorMessage = "Unknown error";
        
//         if (err.response) {
//           // Server responded with error
//           errorMessage = `Server error: ${err.response.status}`;
//           console.error("Server error data:", err.response.data);
//         } else if (err.request) {
//           // No response received
//           errorMessage = "No response from server. Is backend running?";
//           console.error("No response - check backend");
//         } else {
//           // Other errors
//           errorMessage = `Error: ${err.message}`;
//         }
        
//         setError(errorMessage);
//         setDebugInfo(`
//           ❌ Error loading hotel!
//           Error: ${err.message}
//           Status: ${err.response?.status || "N/A"}
//           Hotel ID: ${id}
//           Time: ${new Date().toLocaleTimeString()}
//         `);
        
//       } finally {
//         console.log("=== DEBUG END ===");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleGoBack = () => {
//     navigate('/userhotels');
//   };

//   // Test if we can directly access the API
//   const testApiDirectly = () => {
//     const testUrl = `http://localhost:5000/api/hotels/${id}`;
//     window.open(testUrl, '_blank');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
//         <p className="text-lg font-medium text-gray-700">Loading hotel rooms...</p>
//         <p className="text-sm text-gray-500 mt-2">Hotel ID: {id}</p>
//         <p className="text-xs text-gray-400 mt-1">Fetching from: http://localhost:5000/api/hotels/{id}</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//           <div className="text-center mb-8">
//             <div className="text-5xl mb-4">🚫</div>
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Hotel</h1>
//             <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
//             <h2 className="text-lg font-semibold text-yellow-800 mb-3">Troubleshooting Steps</h2>
//             <ol className="list-decimal pl-5 space-y-2 text-yellow-700">
//               <li>Click the button below to test the API directly</li>
//               <li>Check if the backend server is running on port 5000</li>
//               <li>Make sure CORS is enabled on backend</li>
//               <li>Check browser console (F12) for detailed errors</li>
//             </ol>
//           </div>

//           <div className="space-y-4">
//             <button
//               onClick={testApiDirectly}
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
//             >
//               Test API Endpoint Directly
//             </button>
            
//             <button
//               onClick={handleGoBack}
//               className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium"
//             >
//               ← Back to Hotels List
//             </button>
//           </div>

//           {/* Debug Info */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <h3 className="text-sm font-semibold text-gray-700 mb-2">Debug Information</h3>
//             <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre">
//               {debugInfo}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If we get here, hotel data should be loaded
//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Debug Header */}
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
//           <div className="flex justify-between items-center">
//             <div>
//               <span className="font-semibold text-green-800">✅ Hotel Loaded Successfully</span>
//               <p className="text-sm text-green-700">ID: {id}</p>
//             </div>
//             <button
//               onClick={() => console.log("Hotel data:", hotel)}
//               className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded"
//             >
//               Log Data
//             </button>
//           </div>
//         </div>

//         {/* Header */}
//         <div className="mb-6">
//           <button
//             onClick={handleGoBack}
//             className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center"
//           >
//             ← Back to Hotels
//           </button>
          
//           <div className="bg-white rounded-xl shadow p-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
//             <p className="text-gray-600 mb-2">📍 {hotel.location}</p>
//             <p className="text-gray-700">{hotel.description}</p>
            
//             <div className="mt-4 flex items-center text-sm text-gray-500">
//               <span className="mr-4">Rooms: {rooms.length}</span>
//               <span>Email: {hotel.email}</span>
//             </div>
//           </div>
//         </div>

//         {/* Rooms Section */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Available Rooms ({rooms.length})
//             </h2>
//             <button
//               onClick={handleGoBack}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
//             >
//               Back to Hotels
//             </button>
//           </div>

//           {rooms.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-5xl mb-4">🏨</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No Rooms Available</h3>
//               <p className="text-gray-600 mb-6">This hotel doesn't have any rooms in the database.</p>
              
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto text-left">
//                 <h4 className="font-semibold text-blue-800 mb-3">Database Information:</h4>
//                 <ul className="space-y-2 text-blue-700">
//                   <li>• Hotel ID: {id}</li>
//                   <li>• Hotel Name: {hotel.name}</li>
//                   <li>• Rooms array exists: {hotel.rooms ? "Yes" : "No"}</li>
//                   <li>• Rooms count: {hotel.rooms?.length || 0}</li>
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {rooms.map((room, index) => (
//                 <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
//                   {/* Room Image */}
//                   {room.images && room.images.length > 0 ? (
//                     <img
//                       src={room.images[0]}
//                       alt={room.name}
//                       className="w-full h-48 object-cover"
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
                  
//                   {/* Room Info */}
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg mb-2">
//                       {room.name || `Room ${room.roomNumber || index + 1}`}
//                     </h3>
//                     <p className="text-gray-600 mb-2">Type: {room.type || "Standard"}</p>
//                     <p className="text-blue-600 font-bold text-xl mb-3">
//                       Rs. {(room.price || 0).toLocaleString()}
//                     </p>
//                     <button
//                       onClick={() => navigate('/booking', { state: { room, hotel } })}
//                       className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Raw Data Viewer (for debugging) */}
//         <details className="mt-6">
//           <summary className="cursor-pointer text-sm font-semibold text-gray-700 p-3 bg-gray-100 rounded-lg">
//             📋 View Raw Hotel Data (Debug)
//           </summary>
//           <pre className="mt-2 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto text-xs">
//             {JSON.stringify(hotel, null, 2)}
//           </pre>
//         </details>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserRooms() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        console.log("Fetching hotel with ID:", id);
        
        // Fetch hotel from API (public route)
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        console.log("Hotel data:", response.data);
        
        const hotelData = response.data;
        setHotel(hotelData);
        
        // Get rooms from hotel data
        if (hotelData.rooms && Array.isArray(hotelData.rooms)) {
          console.log("Found rooms:", hotelData.rooms.length);
          setRooms(hotelData.rooms);
        } else {
          console.log("No rooms found");
          setRooms([]);
        }
        
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load hotel. Please check if hotel exists.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  const handleGoBack = () => {
    navigate('/userhotels');
  };

  const handleBookNow = (room) => {
    navigate('/booking', { 
      state: { 
        room: room,
        hotel: hotel
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotel rooms...</p>
          <p className="text-sm text-gray-500">Hotel ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">API: GET /api/hotels/{id}</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
          <button 
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleGoBack}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            ← Back to Hotels
          </button>
          
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
            <p className="text-gray-600 mb-2">📍 {hotel.location}</p>
            <p className="text-gray-500 mb-4">{hotel.description}</p>
            <div className="text-sm text-gray-600">
              <p>Hotel ID: {id}</p>
              <p>Total Rooms: {rooms.length}</p>
            </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Available Rooms ({rooms.length})
          </h2>
          
          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Rooms Available</h3>
              <p className="text-gray-600">This hotel doesn't have any rooms yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  {/* Room Image */}
                  {room.images && room.images.length > 0 ? (
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  
                  {/* Room Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                      {room.name || `Room ${room.roomNumber || index + 1}`}
                    </h3>
                    <p className="text-gray-600 mb-2">Type: {room.type}</p>
                    <p className="text-blue-600 font-bold text-xl mb-3">
                      Rs. {room.price?.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleBookNow(room)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}