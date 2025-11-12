import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function HotelShow() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        // Fetch hotel and its rooms
        const [hotelRes, roomRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/hotels/${id}`),
          axios.get(`http://localhost:5000/api/rooms/hotel/${id}`),
        ]);

        setHotel(hotelRes.data);

        // filter only available rooms
        const availableRooms = roomRes.data.filter((r) => r.available === true);
        setRooms(availableRooms);
      } catch (error) {
        console.error("Error fetching hotel or rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading hotel details...
      </div>
    );

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Hotel not found.
      </div>
    );

  const imageUrl =
    hotel.images && hotel.images.length > 0
      ? hotel.images[0].startsWith("http")
        ? hotel.images[0]
        : `http://localhost:5000${hotel.images[0]}`
      : null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Hotels
        </Link>
      </div>

      {/* Hotel Info */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-10">
        {imageUrl && (
          <img src={imageUrl} alt={hotel.name} className="w-full h-64 object-cover" />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{hotel.name}</h1>
          <p className="text-gray-600 mb-3">{hotel.location}</p>
          <p className="text-gray-700 mb-4">{hotel.description}</p>
        </div>
      </div>

      {/* Available Rooms */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Available Rooms
      </h2>

      {rooms.length === 0 ? (
        <p className="text-gray-600">No available rooms at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => {
            const roomImage =
              room.images && room.images.length > 0
                ? room.images[0].startsWith("http")
                  ? room.images[0]
                  : `http://localhost:5000${room.images[0]}`
                : null;

            return (
              <div
                key={room._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {roomImage ? (
                  <img
                    src={roomImage}
                    alt={`Room ${room.roomNumber}`}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    Room #{room.roomNumber}
                  </h3>
                  <p className="text-gray-600 mb-2">{room.category}</p>
                  <p className="font-bold text-blue-600">
                    Rs. {room.price.toLocaleString()} / night
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
