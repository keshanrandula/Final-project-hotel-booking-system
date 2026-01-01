import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserHotels() {
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hotels.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === hotels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleViewRooms = (hotel) => {
    navigate(`/hotels/${hotel._id}/rooms`, { state: { hotel } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotels...</p>
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
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">🏨</div>
          <p className="text-gray-600 text-lg mb-2">No hotels available</p>
          <p className="text-gray-500">Check back later for new listings.</p>
        </div>
      </div>
    );
  }

  const currentHotel = hotels[currentIndex];

  // Construct image URL
  const imageUrl = currentHotel.images && currentHotel.images.length > 0
    ? currentHotel.images[0].startsWith("http")
      ? currentHotel.images[0]
      : `http://localhost:5000${currentHotel.images[0]}`
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Discover Amazing Hotels
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Browse through our selection of premium hotels
        </p>
        
        {/* Navigation Indicator */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center space-x-2">
            {hotels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-blue-600" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to hotel ${index + 1}`}
              />
            ))}
          </div>
          <span className="ml-4 text-sm text-gray-600">
            {currentIndex + 1} of {hotels.length}
          </span>
        </div>
      </div>

      {/* Main Hotel Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hotel Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src={imageUrl}
              alt={currentHotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous hotel"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next hotel"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            
            {/* Hotel Rating */}
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold flex items-center">
              ⭐ 4.5
            </div>
          </div>

          {/* Hotel Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {currentHotel.name}
                </h2>
                <div className="flex items-center text-gray-600 mb-3">
                  <span className="mr-2">📍</span>
                  <p className="text-lg">{currentHotel.location}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 bg-blue-50 p-4 rounded-xl">
                <p className="text-gray-600 mb-1">Starting from</p>
                <p className="text-2xl font-bold text-blue-600">
                  Rs. {currentHotel.minPrice || "---"} 
                  <span className="text-sm font-normal text-gray-500"> / night</span>
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {currentHotel.description || "Experience luxury and comfort at this premium hotel with excellent amenities and services."}
            </p>

            {/* Features/Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🛏️</div>
                <p className="font-medium text-gray-800">Comfy Beds</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🍽️</div>
                <p className="font-medium text-gray-800">Restaurant</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏊</div>
                <p className="font-medium text-gray-800">Pool</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🚗</div>
                <p className="font-medium text-gray-800">Parking</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleViewRooms(currentHotel)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                👀 View Available Rooms
              </button>
              
              <Link
                to={`/hotels/${currentHotel._id}`}
                className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-xl text-lg text-center transition-all duration-300"
              >
                ℹ️ View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Hotel List (Thumbnails) */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Hotels</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotels.map((hotel, index) => (
              <button
                key={hotel._id}
                onClick={() => setCurrentIndex(index)}
                className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all ${
                  index === currentIndex ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={
                        hotel.images && hotel.images.length > 0
                          ? hotel.images[0].startsWith("http")
                            ? hotel.images[0]
                            : `http://localhost:5000${hotel.images[0]}`
                          : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      }
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 truncate">{hotel.name}</p>
                    <p className="text-sm text-gray-600 truncate">{hotel.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            💡 <span className="font-medium">Tip:</span> Use arrow buttons or click on thumbnails to navigate hotels
          </p>
        </div>
      </div>
    </div>
  );
}