import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import AddHotel from "./Admin/AddHotel"
import HotelList from "./HotelList";
import StaffRegister from "./hotelstaff/StaffRegister";
import StaffLogin from "./hotelstaff/staffLogin";
import StaffProfile from "./hotelstaff/staffProfile";
import  Addroom from "./hotelstaff/Addroom";
import RoomList from "./RoomList";
import AdminHotelManage from "./Admin/Adminhotelmanage";  
import HotelShow from "./HotelShow";
import HotelLogin from "./HotelLogin";
import HotelDashboard from "./hotelstaff/HotelDashboard";
import RoomManage from "./hotelstaff/RoomManage";
import HotelRoom from "./HotelRoom";
import Booking from "./Booking";
import EditHotelProfile from "./hotelstaff/EditHotelProfile";
import UserProfile from "./profile";
import Home from "./Home";  
import Contact from "./Contact";  
import AdminRegister from "./Admin/AdminRegister";  
import AdminLogin from "./Admin/AdminLogin";  
import AdminRoomManage from "./Admin/AdminRoomMAnage";
import AdminDashboard from "./Admin/AdminDashboard";
import UserHotels from "./UserHotels";
import UserRooms from "./UserRooms";
import AvailableRooms from "./AvailableRooms";
import AdminBooking from "./Admin/AdminBooking";
import check from "./check";  
import Feedback from "./Feedback";
import AdminManageFeedback from "./Admin/AdminManageFeedback";
import MyBookings from "./MyBookings";
import AdminBookingManagement from "./Admin/AdminBookingManagement"; 
import HotelBookingManagement from "./hotelstaff/HotelBookingManagement";   
import HotelDetails from "./HotelDetails";
import PaymentPage from "./Payment";
import HotelRegister from "./hotelstaff/HotelRegister";
import AdminProfile from "./Admin/AdminProfie"; 
import HotelReviews from "./hotelstaff/HotelReviews";
  






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addhotel" element={<AddHotel />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/staffregister" element={<StaffRegister />} />
        <Route path="/stafflogin" element={<StaffLogin />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/addroom" element={<Addroom />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/admin/hotelmanage" element={<AdminHotelManage />} />
        <Route path="/hotels/:id" element={<HotelShow />} />
        <Route path="/hotellogin" element={<HotelLogin />} />
        <Route path="/hoteldashboard" element={<HotelDashboard />} />
        <Route path="/roommanage" element={<RoomManage />} />
        <Route path="/hotelroom" element={<HotelRoom />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/edithotelprofile" element={<EditHotelProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/admin/roommanage" element={<AdminRoomManage />} />

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />  
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/userhotels" element={<UserHotels />} />
         <Route path="/userhotels/:id/rooms" element={<UserRooms />} />
          <Route path="/availablerooms" element={<AvailableRooms />} />
          <Route path="/admin/bookings" element={<AdminBooking />} />
          <Route path="/check" element={<check />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin/managefeedback" element={<AdminManageFeedback />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/admin/bookingmanagement" element={<AdminBookingManagement />} />
          <Route path="/hotel/bookingmanagement" element={<HotelBookingManagement />} />
             
               <Route path="/hotel/:id" element={<HotelDetails />} />
               <Route path="/payment/:bookingId" element={<PaymentPage />} />
                <Route path="/hotelregister" element={<HotelRegister />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/hotelreviews" element={<HotelReviews />} />
 
 
       
        
       
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
