import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    available: true
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  // Fetch hotel and rooms data
  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      if (!token || !hotelId) {
        setError("Please log in to view rooms");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setHotel(res.data);
        setRooms(res.data.rooms || []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("hotelId");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to fetch rooms");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [token, hotelId, navigate]);

  // Handle room deletion
  const handleDeleteRoom = async (roomIndex) => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      // Create a copy of rooms and remove the room at the specified index
      const updatedRooms = [...rooms];
      updatedRooms.splice(roomIndex, 1);

      // Update the hotel with the new rooms array
      await axios.put(
        `http://localhost:5000/api/hotels/${hotelId}`,
        { rooms: updatedRooms },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setRooms(updatedRooms);
      alert("Room deleted successfully!");
    } catch (err) {
      console.error("Error deleting room:", err);
      alert(err.response?.data?.message || "Failed to delete room");
    }
  };

  // Handle room edit
  const handleEditRoom = (room, index) => {
    setEditingRoom(index);
    setEditForm({
      name: room.name,
      type: room.type,
      price: room.price,
      description: room.description || "",
      available: room.available
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save edited room
  const saveEditedRoom = async () => {
    if (!editForm.name || !editForm.type || !editForm.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const updatedRooms = [...rooms];
      updatedRooms[editingRoom] = {
        ...updatedRooms[editingRoom],
        ...editForm,
        price: Number(editForm.price)
      };

      await axios.put(
        `http://localhost:5000/api/hotels/${hotelId}`,
        { rooms: updatedRooms },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRooms(updatedRooms);
      setEditingRoom(null);
      alert("Room updated successfully!");
    } catch (err) {
      console.error("Error updating room:", err);
      alert(err.response?.data?.message || "Failed to update room");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingRoom(null);
    setEditForm({
      name: "",
      type: "",
      price: "",
      description: "",
      available: true
    });
  };

  // Toggle room availability
  const toggleAvailability = async (roomIndex) => {
    try {
      const updatedRooms = [...rooms];
      updatedRooms[roomIndex].available = !updatedRooms[roomIndex].available;

      await axios.put(
        `http://localhost:5000/api/hotels/${hotelId}`,
        { rooms: updatedRooms },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRooms(updatedRooms);
      alert(`Room marked as ${updatedRooms[roomIndex].available ? 'available' : 'unavailable'}`);
    } catch (err) {
      console.error("Error updating room availability:", err);
      alert(err.response?.data?.message || "Failed to update room availability");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !hotel) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate("/hoteldashboard")}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
              <p className="text-gray-600 mt-1">
                {hotel?.name} - {rooms.length} room{rooms.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/addroom")}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Add New Room
              </button>
              <button
                onClick={() => navigate("/hoteldashboard")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Rooms Grid */}
        {rooms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Rooms Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first room to showcase your hotel's offerings.</p>
            <button
              onClick={() => navigate("/addroom")}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-lg"
            >
              Add Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                  room.available ? 'border-green-500' : 'border-red-500'
                }`}
              >
                {/* Room Images */}
                {room.images && room.images.length > 0 ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {/* Room Info */}
                <div className="p-6">
                  {editingRoom === index ? (
                    // Edit Form
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        placeholder="Room Name"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <select
                        name="type"
                        value={editForm.type}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Twin">Twin</option>
                        <option value="Suite">Suite</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Executive">Executive</option>
                        <option value="Presidential">Presidential</option>
                      </select>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        placeholder="Price"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        rows="2"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="available"
                          checked={editForm.available}
                          onChange={handleEditChange}
                          className="w-4 h-4 text-blue-500 rounded"
                        />
                        <label className="text-sm text-gray-700">Available</label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditedRoom}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Room Display
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          room.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {room.available ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600">
                          <span className="font-semibold">Type:</span> {room.type}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Price:</span> 
                          <span className="text-green-600 font-bold text-lg ml-1">
                            Rs. {room.price}
                          </span>
                          <span className="text-gray-500 text-sm">/night</span>
                        </p>
                        {room.description && (
                          <p className="text-gray-600 text-sm">
                            {room.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleAvailability(index)}
                          className={`flex-1 text-sm py-2 px-3 rounded-lg transition ${
                            room.available
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {room.available ? 'Mark Booked' : 'Mark Available'}
                        </button>
                        <button
                          onClick={() => handleEditRoom(room, index)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(index)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {rooms.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Room Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
                <div className="text-sm text-gray-600">Total Rooms</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {rooms.filter(room => room.available).length}
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {rooms.filter(room => !room.available).length}
                </div>
                <div className="text-sm text-gray-600">Booked</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  Rs. {rooms.reduce((total, room) => total + (room.price || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}