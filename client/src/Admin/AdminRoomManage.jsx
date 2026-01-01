// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminRoomManage = () => {
//   const [hotel, setHotel] = useState(null);
//   const [rooms, setRooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     price: "",
//     description: "",
//     available: true,
//     images: [],
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchHotelRooms();
//   }, []);

//   // Fetch hotel and rooms
//   const fetchHotelRooms = async () => {
//     try {
//       const res = await axios.get("/api/hotels/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHotel(res.data);
//       setRooms(res.data.rooms || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete room
//   const deleteRoom = async (roomId) => {
//     if (!window.confirm("Are you sure you want to delete this room?")) return;

//     try {
//       await axios.delete(`/api/hotels/${hotel._id}/rooms/${roomId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRooms(rooms.filter((room) => room._id !== roomId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Open update modal
//   const openUpdateModal = (room) => {
//     setSelectedRoom(room);
//     setFormData({
//       name: room.name,
//       type: room.type,
//       price: room.price,
//       description: room.description,
//       available: room.available,
//       images: [],
//     });
//     setShowModal(true);
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, images: files });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Submit update
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("type", formData.type);
//     data.append("price", formData.price);
//     data.append("description", formData.description);
//     data.append("available", formData.available);

//     for (let i = 0; i < formData.images.length; i++) {
//       data.append("images", formData.images[i]);
//     }

//     try {
//       const res = await axios.put(
//         `/api/hotels/${hotel._id}/rooms/${selectedRoom._id}`,
//         data,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setRooms(
//         rooms.map((room) => (room._id === selectedRoom._id ? res.data.room : room))
//       );
//       setShowModal(false);
//       setSelectedRoom(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!hotel) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h2 className="text-2xl font-bold mb-6">{hotel.name} - Manage Rooms</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {rooms.map((room) => (
//           <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
//             <img
//               src={room.images?.[0] || "https://via.placeholder.com/400x300?text=Room+Image"}
//               alt={room.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg text-gray-800">{room.name}</h3>
//               <p className="text-gray-600">Type: {room.type}</p>
//               <p className="text-gray-600">Price: Rs. {room.price}</p>
//               <p className="text-gray-600">Available: {room.available ? "Yes" : "No"}</p>
//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => openUpdateModal(room)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteRoom(room._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Update Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//             <h3 className="text-xl font-bold mb-4">Update Room</h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Room Name"
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 placeholder="Room Type"
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Price"
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//                 className="w-full px-3 py-2 border rounded"
//               />
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="available"
//                   checked={formData.available}
//                   onChange={handleChange}
//                 />
//                 Available
//               </label>
//               <input
//                 type="file"
//                 name="images"
//                 multiple
//                 onChange={handleChange}
//                 className="w-full"
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 rounded border"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminRoomManage;

//////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  Alert,
  Snackbar,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  Hotel,
  Bed,
  AttachMoney,
  Visibility,
  Close
} from '@mui/icons-material';

const AdminRoomManage = () => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    available: true
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const API_URL = 'http://localhost:5000/api/hotels';
  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Family', 'Presidential'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      // Fetch all rooms
      const roomsResponse = await axios.get(`${API_URL}/admin/rooms/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(roomsResponse.data);
      
      // Fetch hotels for dropdown
      const hotelsResponse = await axios.get(`${API_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHotels(hotelsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotel) {
      setError('Please select a hotel');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      if (selectedRoom) {
        // Update existing room
        await axios.put(
          `${API_URL}/admin/${selectedHotel}/rooms/${selectedRoom._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setSuccess('Room updated successfully!');
      } else {
        // Add new room
        await axios.post(
          `${API_URL}/admin/${selectedHotel}/rooms`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setSuccess('Room added successfully!');
      }

      setOpenDialog(false);
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setSelectedHotel(room.hotelId);
    setFormData({
      name: room.name,
      type: room.type,
      price: room.price,
      description: room.description || '',
      available: room.available
    });
    setPreviewImages(room.images || []);
    setOpenDialog(true);
  };

  const handleView = (room) => {
    setSelectedRoom(room);
    setOpenViewDialog(true);
  };

  const handleDelete = async (hotelId, roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(
          `${API_URL}/admin/${hotelId}/rooms/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setSuccess('Room deleted successfully!');
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      price: '',
      description: '',
      available: true
    });
    setImages([]);
    setPreviewImages([]);
    setSelectedRoom(null);
    setSelectedHotel('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Room Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Add New Room
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.light' }}>
              <TableCell>Room</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={`${room.hotelId}-${room._id}`} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {room.images?.length > 0 ? (
                      <Avatar
                        src={room.images[0]}
                        sx={{ width: 50, height: 50 }}
                        variant="rounded"
                      />
                    ) : (
                      <Avatar sx={{ width: 50, height: 50 }}>
                        <Bed />
                      </Avatar>
                    )}
                    <Box>
                      <Typography variant="subtitle1">{room.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {room.description?.substring(0, 50)}...
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Hotel fontSize="small" color="action" />
                    <Typography variant="body2">{room.hotelName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={room.type} color="primary" size="small" />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoney fontSize="small" color="action" />
                    <Typography variant="subtitle1">${room.price}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={room.available ? 'Available' : 'Booked'}
                    color={room.available ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleView(room)}
                      color="info"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(room)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(room.hotelId, room._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Room Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRoom ? 'Edit Room' : 'Add New Room'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Select Hotel</InputLabel>
                  <Select
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                    label="Select Hotel"
                  >
                    {hotels.map((hotel) => (
                      <MenuItem key={hotel._id} value={hotel._id}>
                        {hotel.name} - {hotel.location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Room Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Room Type"
                  >
                    {roomTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price per Night"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: <AttachMoney fontSize="small" color="action" sx={{ mr: 1 }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="available"
                      checked={formData.available}
                      onChange={handleSwitchChange}
                      color="primary"
                    />
                  }
                  label="Available"
                  sx={{ mt: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                >
                  Upload Room Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {previewImages.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                    {previewImages.map((src, index) => (
                      <Avatar
                        key={index}
                        src={src}
                        sx={{ width: 80, height: 80 }}
                        variant="rounded"
                      />
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedRoom ? 'Update' : 'Add'} Room
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Room Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Room Details
            <IconButton onClick={() => setOpenViewDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {selectedRoom.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedRoom.description}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Hotel color="action" />
                  <Typography variant="subtitle1">Hotel:</Typography>
                </Box>
                <Typography variant="body1">{selectedRoom.hotelName}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Room Type:</Typography>
                <Chip label={selectedRoom.type} color="primary" />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AttachMoney color="action" />
                  <Typography variant="subtitle1">Price per Night:</Typography>
                </Box>
                <Typography variant="h6">${selectedRoom.price}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Availability:</Typography>
                <Chip
                  label={selectedRoom.available ? 'Available' : 'Booked'}
                  color={selectedRoom.available ? 'success' : 'error'}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>Images:</Typography>
                {selectedRoom.images?.length > 0 ? (
                  <Grid container spacing={2}>
                    {selectedRoom.images.map((image, index) => (
                      <Grid item xs={6} md={4} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={image}
                            alt={`Room image ${index + 1}`}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No images available
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminRoomManage;