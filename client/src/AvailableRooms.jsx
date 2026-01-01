import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

export default function AvailableRooms() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search params from home page or use defaults
  const searchParams = location.state || {};
  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    roomType: "all",
    maxPrice: 10000,
    sortBy: "price_asc"
  });

  const [searchData, setSearchData] = useState({
    checkIn: searchParams.checkIn || new Date().toISOString().split('T')[0],
    checkOut: searchParams.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: searchParams.guests || 1
  });

  // Fetch available rooms
  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: searchData.guests,
        ...(filters.roomType !== 'all' && { roomType: filters.roomType })
      });

      const response = await axios.get(`/api/availability/available?${params}`);
      
      // Apply additional filters
      let filteredRooms = response.data.data;
      
      // Filter by price
      filteredRooms = filteredRooms.filter(room => room.price <= filters.maxPrice);
      
      // Sort rooms
      filteredRooms = sortRooms(filteredRooms, filters.sortBy);
      
      setRooms(filteredRooms);
    } catch (err) {
      setError("Failed to fetch available rooms. Please try again.");
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sort function
  const sortRooms = (rooms, sortBy) => {
    switch (sortBy) {
      case "price_asc":
        return [...rooms].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...rooms].sort((a, b) => b.price - a.price);
      case "rating_desc":
        return [...rooms].sort((a, b) => (b.hotel?.rating || 0) - (a.hotel?.rating || 0));
      default:
        return rooms;
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchAvailableRooms();
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate nights
  const calculateNights = () => {
    const checkIn = new Date(searchData.checkIn);
    const checkOut = new Date(searchData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Initialize
  useEffect(() => {
    if (searchData.checkIn && searchData.checkOut) {
      fetchAvailableRooms();
    }
  }, [filters]);

  // Handle book now
  const handleBookNow = (room) => {
    navigate('/booking', {
      state: {
        room: room,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: searchData.guests,
        nights: calculateNights(),
        totalAmount: room.price * calculateNights()
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                Available Rooms
              </h1>
              <p className="text-gray-600 mt-2">
                {searchData.checkIn} to {searchData.checkOut} • {searchData.guests} {searchData.guests === 1 ? 'Guest' : 'Guests'} • {calculateNights()} nights
              </p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-blue-700 font-medium">
                {rooms.length} rooms available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
                    className="w-full pl-10 p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData(prev => ({...prev, checkOut: e.target.value}))}
                    className="w-full pl-10 p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData(prev => ({...prev, guests: e.target.value}))}
                    className="w-full pl-10 p-2 border rounded-lg"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Search Again
                </button>
              </div>
            </div>
          </form>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                name="roomType"
                value={filters.roomType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Room Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: Rs. {filters.maxPrice}
              </label>
              <input
                type="range"
                name="maxPrice"
                min="500"
                max="50000"
                step="500"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Rs. 500</span>
                <span>Rs. 50,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading available rooms...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchAvailableRooms}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-4xl mb-3">😔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Rooms Available
            </h3>
            <p className="text-gray-600 mb-4">
              Sorry, no rooms are available for your selected dates and criteria.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Change Dates
              </button>
              <Link
                to="/rooms"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              >
                View All Hotels
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-shadow"
              >
                <div className="md:flex">
                  {/* Room Image */}
                  <div className="md:w-1/3">
                    <img
                      src={room.images?.[0] || "https://via.placeholder.com/400x300?text=Room"}
                      alt={room.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  {/* Room Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {room.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {room.hotel?.name} • {room.hotel?.location}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                            {room.type.toUpperCase()}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            <CheckCircleIcon className="h-3 w-3 inline mr-1" />
                            Available
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          Rs. {room.price}
                          <span className="text-sm text-gray-500 font-normal">/night</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                          {calculateNights()} nights • Total: Rs. {room.price * calculateNights()}
                        </p>
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{room.maxGuests} Guests</span>
                      </div>
                      {room.amenities && room.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {room.description && (
                      <p className="mt-4 text-gray-600">
                        {room.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Free cancellation • Breakfast included • Free WiFi
                        </p>
                      </div>
                      <div className="space-x-3">
                        <button
                          onClick={() => handleBookNow(room)}
                          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition"
                        >
                          Book Now
                        </button>
                        <Link
                          to={`/hotel/${room.hotel?._id}`}
                          className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition"
                        >
                          View Hotel
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}