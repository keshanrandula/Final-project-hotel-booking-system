import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HotelRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state || {};
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  // Filter rooms based on type and price
  const filteredRooms = hotel.rooms?.filter(room => {
    const matchesType = filterType === "all" || room.type?.toLowerCase() === filterType.toLowerCase();
    const matchesPrice = room.price <= priceRange;
    const isAvailable = room.available !== false;
    
    return matchesType && matchesPrice && isAvailable;
  }) || [];

  // Handle book now - navigate to booking page
  const handleBookNow = (room) => {
    navigate('/booking', { 
      state: { 
        room: room,
        hotel: hotel
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4"
          >
            ← Back to Hotels
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <p className="text-gray-600 mt-2">📍 {hotel.location}</p>
          <p className="text-gray-500 mt-1">{hotel.description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="executive">Executive</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price: Rs. {priceRange}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Rs. 500</span>
                <span>Rs. 10,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Rooms</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {filteredRooms.length} rooms available
          </span>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-4xl mb-3">😔</div>
            <p className="text-gray-600">No rooms available matching your criteria</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room, roomIndex) => (
              <div
                key={roomIndex}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Room Image */}
                {room.images && room.images.length > 0 ? (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {/* Room Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Type:</span> {room.type}
                  </p>
                  
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium">Price:</span> 
                    <span className="text-green-600 font-bold text-lg ml-1">
                      Rs. {room.price}
                    </span>
                    <span className="text-gray-500 text-sm">/night</span>
                  </p>

                  {room.description && (
                    <p className="text-gray-500 text-sm mb-4">
                      {room.description}
                    </p>
                  )}

                  {/* Room Features */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>🛏️ {room.type}</span>
                      <span>👥 {room.type === 'Single' ? '1' : '2'} Guest</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(room)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
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
  );
}