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
       
        
       
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
