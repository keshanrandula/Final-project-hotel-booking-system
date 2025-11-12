

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function HotelList() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/hotels");
//         setHotels(res.data);
//       } catch (err) {
//         console.error("Error fetching hotels:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHotels();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <p className="text-xl font-semibold">Loading hotels...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Available Hotels
//       </h1>

//       {hotels.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">
//           No hotels available right now.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotels.map((hotel) => {
//             const imageUrl =
//               hotel.images && hotel.images.length > 0
//                 ? hotel.images[0].startsWith("http")
//                   ? hotel.images[0]
//                   : `http://localhost:5000${hotel.images[0]}`
//                 : null;

//             return (
//               <div
//                 key={hotel._id}
//                 className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//               >
//                 {imageUrl ? (
//                   <img
//                     src={imageUrl}
//                     alt={hotel.name}
//                     className="w-full h-48 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}

//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {hotel.name}
//                   </h2>
//                   <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
//                   <p className="text-gray-700 text-sm line-clamp-3">
//                     {hotel.description}
//                   </p>

//                   {hotel.amenities?.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {hotel.amenities.map((a, idx) => (
//                         <span
//                           key={idx}
//                           className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
//                         >
//                           {a}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }



///////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hotels");
        setHotels(res.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading hotels...
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No hotels found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Hotel List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => {
          const imageUrl =
            hotel.images && hotel.images.length > 0
              ? hotel.images[0].startsWith("http")
                ? hotel.images[0]
                : `http://localhost:5000${hotel.images[0]}`
              : null;

          return (
            <div
              key={hotel._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Hotel Image */}
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Hotel Details */}
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {hotel.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {hotel.description}
                  </p>
                </div>

                {/* View Rooms Button */}
                <div className="mt-auto">
                  <Link
                    to={`/hotel/${hotel._id}`}
                    className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View Rooms
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
