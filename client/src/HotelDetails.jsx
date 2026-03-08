import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  MapPinIcon,
  StarIcon,
  WifiIcon,
  HomeModernIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

export default function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  
  // Get search params from location state
  const searchParams = location.state || {
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2
  };

  // Fetch hotel details
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(res.data);
        console.log("✅ Hotel details:", res.data);
      } catch (err) {
        console.error("❌ Error fetching hotel:", err);
        setError(err.response?.data?.message || "Failed to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  // Fetch all bookings to check availability
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setAllBookings(res.data);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // Check if room is available for selected dates
  const isRoomAvailable = (room) => {
    if (!room.available) return false;
    
    if (!allBookings || allBookings.length === 0) return true;
    
    const checkInTime = new Date(searchParams.checkIn).getTime();
    const checkOutTime = new Date(searchParams.checkOut).getTime();
    
    const conflictingBooking = allBookings.some(booking => {
      const roomMatch = booking.roomId === room._id || 
                       booking.roomName === room.name;
      
      if (!roomMatch) return false;
      
      const isActiveBooking = booking.status === 'confirmed' || 
                             booking.isPaid === true;
      
      if (!isActiveBooking) return false;
      
      const bookingCheckIn = new Date(booking.checkIn).getTime();
      const bookingCheckOut = new Date(booking.checkOut).getTime();
      
      return (checkInTime < bookingCheckOut && checkOutTime > bookingCheckIn);
    });
    
    return !conflictingBooking;
  };

  // Handle book now
  const handleBookNow = (room) => {
    navigate(`/booking/${room._id}`, {
      state: {
        hotel,
        room,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white text-lg">Loading hotel details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Navbar />
        <div className="max-w-md mx-auto mt-20 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <div className="text-center">
            <XCircleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-200 mb-6">{error || "Hotel not found"}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <Navbar />

      {/* Hero Section with Hotel Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        {hotel.images && hotel.images.length > 0 ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-800 to-purple-800 flex items-center justify-center">
            <HomeModernIcon className="h-32 w-32 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Hotel Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{hotel.name}</h1>
            <div className="flex items-center text-gray-200">
              <MapPinIcon className="h-5 w-5 mr-1" />
              <span>{hotel.location || "Location not specified"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Summary */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Your Search</h3>
              <p className="text-gray-200 text-sm md:text-base">
                {searchParams.checkIn} to {searchParams.checkOut} • {searchParams.guests} {searchParams.guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Modify Search
            </button>
          </div>
        </div>

        {/* Hotel Description */}
        {hotel.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About {hotel.name}</h2>
            <p className="text-gray-200 leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Available Rooms */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.rooms && hotel.rooms.length > 0 ? (
              hotel.rooms.map((room) => {
                const available = isRoomAvailable(room);
                
                return (
                  <div
                    key={room._id}
                    className={`bg-white rounded-xl overflow-hidden shadow-lg ${
                      available ? 'border-2 border-green-500' : 'opacity-75'
                    }`}
                  >
                    {/* Room Image */}
                    {room.images && room.images.length > 0 ? (
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <HomeModernIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                        {available ? (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            Booked
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Type:</span> {room.type}
                      </p>
                      
                      <p className="text-gray-600 mb-3">
                        <span className="font-semibold">Price:</span>{" "}
                        <span className="text-green-600 font-bold text-xl">
                          Rs. {room.price}
                        </span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </p>
                      
                      {room.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {room.description}
                        </p>
                      )}
                      
                      <button
                        onClick={() => handleBookNow(room)}
                        disabled={!available}
                        className={`w-full py-2 rounded-lg font-semibold transition ${
                          available
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {available ? 'Book Now' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white text-lg">No rooms available in this hotel</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}