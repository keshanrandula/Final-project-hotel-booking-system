// src/pages/HotelDetailPage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  Car, 
  Dumbbell, 
  Waves,
  Check,
  Users,
  Calendar,
  Share2,
  Heart
} from 'lucide-react';

// Mock data
const hotelDetails = {
  id: 1,
  name: "Grand Marina Hotel",
  location: "Colombo, Sri Lanka",
  rating: 4.8,
  reviews: 1248,
  price: 25000,
  description: "Experience unparalleled luxury at Grand Marina Hotel, located in the heart of Colombo with stunning ocean views. Our five-star property offers world-class amenities and exceptional service.",
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=1200&auto=format&fit=crop"
  ],
  amenities: [
    { icon: <Wifi />, name: "Free WiFi" },
    { icon: <Coffee />, name: "Breakfast Included" },
    { icon: <Car />, name: "Free Parking" },
    { icon: <Dumbbell />, name: "Fitness Center" },
    { icon: <Waves />, name: "Swimming Pool" }
  ],
  rooms: [
    {
      id: 101,
      type: "Deluxe Room",
      description: "Spacious room with city view",
      price: 25000,
      capacity: 2,
      amenities: ["King Bed", "TV", "AC", "Free WiFi"],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop"
    },
    {
      id: 102,
      type: "Executive Suite",
      description: "Luxury suite with ocean view",
      price: 45000,
      capacity: 3,
      amenities: ["King Bed", "Living Area", "Minibar", "Jacuzzi"],
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop"
    },
    {
      id: 103,
      type: "Presidential Suite",
      description: "Ultimate luxury experience",
      price: 75000,
      capacity: 4,
      amenities: ["2 Bedrooms", "Private Pool", "Butler", "Spa Access"],
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop"
    }
  ],
  policies: [
    "Check-in: 2:00 PM",
    "Check-out: 12:00 PM",
    "Free cancellation up to 48 hours",
    "No smoking in rooms",
    "Pets not allowed"
  ]
};

const HotelDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{hotelDetails.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600">{hotelDetails.location}</span>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="font-semibold">{hotelDetails.rating}</span>
              <span className="text-gray-600 ml-1">({hotelDetails.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <img 
            src={hotelDetails.images[selectedImage]} 
            alt="Main"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {hotelDetails.images.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className={`w-full h-44 object-cover rounded-xl cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">About This Hotel</h2>
            <p className="text-gray-700 mb-6">{hotelDetails.description}</p>
            
            <h3 className="text-lg font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotelDetails.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {amenity.icon}
                  </div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Available Rooms</h2>
            <div className="space-y-6">
              {hotelDetails.rooms.map(room => (
                <div key={room.id} className={`border rounded-xl p-6 ${selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <img 
                      src={room.image} 
                      alt={room.type}
                      className="w-full md:w-64 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold mb-1">{room.type}</h3>
                          <p className="text-gray-600 mb-3">{room.description}</p>
                          <div className="flex items-center text-gray-600 mb-4">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Up to {room.capacity} guests</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">Rs. {room.price.toLocaleString()}</div>
                          <div className="text-gray-500">per night</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setSelectedRoom(room)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        Select Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600">Rs. {hotelDetails.price.toLocaleString()}</div>
              <div className="text-gray-500">per night</div>
            </div>

            {selectedRoom && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{selectedRoom.type}</span>
                  <span className="font-bold text-green-700">Rs. {selectedRoom.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{selectedRoom.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  Up to {selectedRoom.capacity} guests
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-medium mb-2">Dates</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Check-in"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Check-out"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">Guests</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Rs. {selectedRoom?.price || hotelDetails.price} x 3 nights</span>
                <span>Rs. {(selectedRoom?.price || hotelDetails.price) * 3}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>Rs. 2,500</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rs. {((selectedRoom?.price || hotelDetails.price) * 3 + 2500).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Link 
              to={`/booking/${id}/${selectedRoom?.id || 'default'}`}
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all mb-4"
            >
              Book Now
            </Link>

            <div className="text-center text-gray-500 text-sm">
              <Check className="h-4 w-4 inline mr-1" />
              Free cancellation until 48 hours before check-in
            </div>
          </div>

          {/* Hotel Policies */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold mb-4">Hotel Policies</h3>
            <ul className="space-y-2">
              {hotelDetails.policies.map((policy, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;