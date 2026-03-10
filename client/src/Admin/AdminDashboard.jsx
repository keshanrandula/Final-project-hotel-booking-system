

// // src/components/admin/AdminDashboard.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Menu,
//   X,
//   Home,
//   Hotel,
//   Users,
//   Calendar,
//   UserCircle,
//   Settings,
//   LogOut,
//   TrendingUp,
//   DollarSign,
//   UserCheck,
//   Building,
//   ChevronRight,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Edit,
//   Trash2,
//   Bell,
//   HelpCircle,
//   MessageSquare,
//   Key,
//   BedDouble,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [admin, setAdmin] = useState(null);
//   const [stats, setStats] = useState({
//     totalHotels: 0,
//     totalStaff: 0,
//     totalBookings: 0,
//     totalAdmins: 0,
//     recentBookings: [],
//     monthlyStats: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         if (!token) {
//           navigate("/admin/login");
//           return;
//         }

//         // Fetch admin profile
//         const profileResponse = await fetch(
//           "http://localhost:5000/api/admin/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!profileResponse.ok) {
//           throw new Error("Failed to fetch profile");
//         }

//         const profileData = await profileResponse.json();
//         if (profileData.success) {
//           setAdmin(profileData.admin);
//         }

//         // Fetch dashboard stats
//         const statsResponse = await fetch(
//           "http://localhost:5000/api/admin/dashboard/stats",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (statsResponse.ok) {
//           const statsData = await statsResponse.json();
//           if (statsData.success) {
//             setStats(statsData.stats);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, [navigate]);

//   // Update active menu based on current route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/admin/dashboard") setActiveMenu("dashboard");
//     else if (path === "/admin/hotelmanage") setActiveMenu("hotels");
//     else if (path === "/admin/roommanage") setActiveMenu("rooms");
//     else if (path === "/admin/staff") setActiveMenu("staff");
//     else if (path === "/admin/bookingmanage") setActiveMenu("bookings");
//     else if (path === "/admin/admins") setActiveMenu("admins");
//     else if (path === "/admin/managefeedback") setActiveMenu("feedback");
//     else if (path === "/admin/settings") setActiveMenu("settings");
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   const handleNavigation = (menuId) => {
//     setActiveMenu(menuId);
//     switch(menuId) {
//       case "dashboard":
//         navigate("/admin/dashboard");
//         break;
//       case "hotels":
//         navigate("/admin/hotelmanage");
//         break;
//       case "rooms":
//         navigate("/admin/roommanage");
//         break;
//       case "staff":
//         navigate("/admin/staff");
//         break;
//       case "bookings":
//         navigate("/admin/bookingmanagement");
//         break;
//       case "admins":
//         navigate("/admin/admins");
//         break;
//       case "feedback":
//         navigate("/admin/managefeedback");
//         break;
//       case "settings":
//         navigate("/admin/settings");
//         break;
//       default:
//         navigate("/admin/dashboard");
//     }
//   };

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
//     { id: "hotels", label: "Hotel Management", icon: <Hotel size={20} /> },
//     { id: "rooms", label: "Room Management", icon: <BedDouble size={20} /> },
//     { id: "staff", label: "Staff Management", icon: <Users size={20} /> },
//     { id: "bookings", label: "Booking Management", icon: <Calendar size={20} /> },
//     { id: "admins", label: "Admin Management", icon: <UserCircle size={20} /> },
//     { id: "feedback", label: "Feedback Management", icon: <MessageSquare size={20} /> },
//     { id: "settings", label: "Settings", icon: <Settings size={20} /> },
//   ];

//   const statCards = [
//     {
//       title: "Total Hotels",
//       value: stats.totalHotels || 0,
//       icon: <Building size={24} />,
//       color: "bg-gradient-to-r from-blue-500 to-cyan-500",
//       change: "+12%",
//       trend: "up",
//       onClick: () => handleNavigation("hotels"),
//     },
//     {
//       title: "Total Staff",
//       value: stats.totalStaff || 0,
//       icon: <Users size={24} />,
//       color: "bg-gradient-to-r from-green-500 to-emerald-500",
//       change: "+8%",
//       trend: "up",
//       onClick: () => handleNavigation("staff"),
//     },
//     {
//       title: "Total Bookings",
//       value: stats.totalBookings || 0,
//       icon: <Calendar size={24} />,
//       color: "bg-gradient-to-r from-orange-500 to-amber-500",
//       change: "+23%",
//       trend: "up",
//       onClick: () => handleNavigation("bookings"),
//     },
//     {
//       title: "Total Admins",
//       value: stats.totalAdmins || 0,
//       icon: <UserCheck size={24} />,
//       color: "bg-gradient-to-r from-purple-500 to-pink-500",
//       change: "+5%",
//       trend: "up",
//       onClick: () => handleNavigation("admins"),
//     },
//   ];

//   // Quick action buttons
//   const quickActions = [
//     { label: "Add New Hotel", icon: <Hotel size={16} />, onClick: () => navigate("/addhotel"), color: "bg-blue-500" },
//     { label: "Manage Rooms", icon: <BedDouble size={16} />, onClick: () => navigate("/admin/roommanage"), color: "bg-green-500" },
//     { label: "View Feedback", icon: <MessageSquare size={16} />, onClick: () => navigate("/admin/managefeedback"), color: "bg-purple-500" },
//     { label: "Manage Bookings", icon: <Calendar size={16} />, onClick: () => navigate("/admin/bookingmanagement"), color: "bg-orange-500" },
//   ];

//   // Chart data
//   const chartData = [
//     { month: "Jan", revenue: 4000, bookings: 24 },
//     { month: "Feb", revenue: 3000, bookings: 13 },
//     { month: "Mar", revenue: 2000, bookings: 98 },
//     { month: "Apr", revenue: 2780, bookings: 39 },
//     { month: "May", revenue: 1890, bookings: 48 },
//     { month: "Jun", revenue: 2390, bookings: 38 },
//     { month: "Jul", revenue: 3490, bookings: 43 },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
//             >
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//             <div className="flex items-center cursor-pointer" onClick={() => handleNavigation("dashboard")}>
//               <Hotel className="w-8 h-8 text-primary-600" />
//               <span className="ml-2 text-xl font-bold text-gray-800">
//                 ParadiseLankaStay
//               </span>
//               <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
//                 Admin
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="p-2 rounded-full hover:bg-gray-100 relative">
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <HelpCircle size={20} />
//             </button>
//             <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/admin/profile")}>
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {admin?.name || "Admin User"}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {admin?.role || "Administrator"}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
//                 {admin?.name?.charAt(0) || "A"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside
//           className={`bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px] transition-all duration-300 ${
//             sidebarOpen ? "w-64" : "w-0 lg:w-20"
//           } overflow-hidden`}
//         >
//           <nav className="p-4 space-y-1">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigation(item.id)}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
//                   activeMenu === item.id
//                     ? "bg-gradient-to-r from-primary-50 to-blue-50 text-primary-600 border border-primary-100"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <div
//                   className={`${
//                     activeMenu === item.id
//                       ? "text-primary-600"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {item.icon}
//                 </div>
//                 {sidebarOpen && (
//                   <>
//                     <span className="font-medium">{item.label}</span>
//                     {activeMenu === item.id && (
//                       <ChevronRight size={16} className="ml-auto" />
//                     )}
//                   </>
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Logout Button */}
//           <div className="p-4 border-t border-gray-200 mt-4">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
//             >
//               <LogOut size={20} />
//               {sidebarOpen && <span className="font-medium">Logout</span>}
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className={`flex-1 p-6 transition-all duration-300 ${
//           sidebarOpen ? "lg:ml-0" : "lg:ml-0"
//         }`}>
//           {/* Welcome Banner */}
//           <div className="mb-8 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">
//                   Welcome back, {admin?.name || "Admin"}! 👋
//                 </h1>
//                 <p className="text-blue-100">
//                   Here's what's happening with your hotel business today.
//                 </p>
//               </div>
              
//               {/* Quick Actions */}
//               <div className="hidden lg:flex space-x-3">
//                 {quickActions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={action.onClick}
//                     className={`${action.color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity`}
//                   >
//                     {action.icon}
//                     <span className="text-sm">{action.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid - Clickable Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {statCards.map((card, index) => (
//               <div
//                 key={index}
//                 onClick={card.onClick}
//                 className="stat-card animate-fade-in cursor-pointer transform hover:scale-105 transition-all duration-200"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`p-3 ${card.color} rounded-xl text-white`}>
//                     {card.icon}
//                   </div>
//                   <div
//                     className={`flex items-center text-sm ${
//                       card.trend === "up"
//                         ? "text-green-600 bg-green-50"
//                         : "text-red-600 bg-red-50"
//                     } px-2 py-1 rounded-full`}
//                   >
//                     <TrendingUp size={12} className="mr-1" />
//                     {card.change}
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-1">
//                   {card.value}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{card.title}</p>
//               </div>
//             ))}
//           </div>

//           {/* Charts and Recent Activity */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//             {/* Revenue Chart */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Revenue Overview
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Monthly revenue and booking trends
//                   </p>
//                 </div>
//                 <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
//                   <option>Last 7 days</option>
//                   <option>Last 30 days</option>
//                   <option>Last 3 months</option>
//                 </select>
//               </div>
//               <div className="h-64">
//                 {/* Simple bar chart visualization */}
//                 <div className="flex items-end h-48 space-x-2">
//                   {chartData.map((item, index) => (
//                     <div key={index} className="flex-1 flex flex-col items-center">
//                       <div className="w-full flex items-end space-x-1">
//                         <div
//                           className="flex-1 bg-gradient-to-t from-primary-500 to-blue-400 rounded-t-lg"
//                           style={{ height: `${(item.revenue / 5000) * 100}%` }}
//                         ></div>
//                         <div
//                           className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg"
//                           style={{ height: `${(item.bookings / 100) * 100}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-gray-500 mt-2">
//                         {item.month}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex items-center justify-center space-x-6 mt-4">
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
//                     <span className="text-sm text-gray-600">Revenue</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                     <span className="text-sm text-gray-600">Bookings</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-6">
//                 Recent Activity
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   { action: "New booking received", time: "2 min ago", type: "booking", link: "/admin/bookingmanage" },
//                   { action: "Hotel added", time: "15 min ago", type: "hotel", link: "/admin/hotelmanage" },
//                   { action: "Staff member registered", time: "1 hour ago", type: "staff", link: "/admin/staff" },
//                   { action: "Payment processed", time: "2 hours ago", type: "payment", link: "/admin/bookingmanage" },
//                   { action: "New feedback received", time: "5 hours ago", type: "feedback", link: "/admin/managefeedback" },
//                 ].map((activity, index) => (
//                   <div 
//                     key={index} 
//                     className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
//                     onClick={() => navigate(activity.link)}
//                   >
//                     <div className={`p-2 rounded-lg ${
//                       activity.type === "booking" ? "bg-blue-100 text-blue-600" :
//                       activity.type === "hotel" ? "bg-green-100 text-green-600" :
//                       activity.type === "staff" ? "bg-purple-100 text-purple-600" :
//                       activity.type === "feedback" ? "bg-yellow-100 text-yellow-600" :
//                       "bg-amber-100 text-amber-600"
//                     }`}>
//                       {activity.type === "booking" && <Calendar size={16} />}
//                       {activity.type === "hotel" && <Hotel size={16} />}
//                       {activity.type === "staff" && <Users size={16} />}
//                       {activity.type === "payment" && <DollarSign size={16} />}
//                       {activity.type === "feedback" && <MessageSquare size={16} />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium text-gray-800">{activity.action}</p>
//                       <p className="text-xs text-gray-500">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Recent Bookings Table */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Recent Bookings
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Latest hotel bookings and reservations
//                 </p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
//                   />
//                 </div>
//                 <button className="btn-secondary flex items-center">
//                   <Filter size={16} className="mr-2" />
//                   Filter
//                 </button>
//                 <button 
//                   onClick={() => navigate("/admin/bookingmanage")}
//                   className="btn-primary flex items-center"
//                 >
//                   <Download size={16} className="mr-2" />
//                   View All
//                 </button>
//               </div>
//             </div>

//             <div className="table-container">
//               <table className="w-full">
//                 <thead>
//                   <tr className="table-header">
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Booking ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Hotel
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Check-in
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {[
//                     { id: "BK001", hotel: "Grand Plaza", customer: "John Doe", checkIn: "2024-01-15", status: "Confirmed" },
//                     { id: "BK002", hotel: "Sea View Resort", customer: "Jane Smith", checkIn: "2024-01-16", status: "Pending" },
//                     { id: "BK003", hotel: "Mountain Retreat", customer: "Robert Johnson", checkIn: "2024-01-17", status: "Confirmed" },
//                     { id: "BK004", hotel: "City Center Hotel", customer: "Sarah Wilson", checkIn: "2024-01-18", status: "Cancelled" },
//                     { id: "BK005", hotel: "Luxury Suites", customer: "Michael Brown", checkIn: "2024-01-19", status: "Confirmed" },
//                   ].map((booking, index) => (
//                     <tr 
//                       key={index} 
//                       className="table-row cursor-pointer hover:bg-gray-50"
//                       onClick={() => navigate(`/admin/bookingmanage?booking=${booking.id}`)}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="font-mono text-sm font-medium text-gray-800">
//                           {booking.id}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
//                             <Hotel size={16} className="text-primary-600" />
//                           </div>
//                           <span className="text-sm text-gray-800">{booking.hotel}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {booking.customer}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {booking.checkIn}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`badge ${
//                           booking.status === "Confirmed" ? "badge-success" :
//                           booking.status === "Pending" ? "badge-warning" :
//                           "badge-error"
//                         }`}>
//                           {booking.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
//                           <button 
//                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                             onClick={() => navigate(`/admin/bookingmanage/view/${booking.id}`)}
//                           >
//                             <Eye size={16} />
//                           </button>
//                           <button 
//                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             onClick={() => navigate(`/admin/bookingmanage/edit/${booking.id}`)}
//                           >
//                             <Edit size={16} />
//                           </button>
//                           <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-sm text-gray-600">
//                 Showing 1 to 5 of 24 entries
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
//                   Previous
//                 </button>
//                 <button className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
//                   1
//                 </button>
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//                   2
//                 </button>
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//                   3
//                 </button>
//                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Quick Access Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
//             <div 
//               onClick={() => navigate("/addhotel")}
//               className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
//             >
//               <Hotel size={32} className="mb-4" />
//               <h4 className="text-lg font-semibold mb-2">Add New Hotel</h4>
//               <p className="text-blue-100 text-sm">Register a new hotel property</p>
//             </div>

//             <div 
//               onClick={() => navigate("/admin/roommanage")}
//               className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
//             >
//               <BedDouble size={32} className="mb-4" />
//               <h4 className="text-lg font-semibold mb-2">Manage Rooms</h4>
//               <p className="text-green-100 text-sm">Configure room settings and availability</p>
//             </div>

//             <div 
//               onClick={() => navigate("/admin/managefeedback")}
//               className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
//             >
//               <MessageSquare size={32} className="mb-4" />
//               <h4 className="text-lg font-semibold mb-2">View Feedback</h4>
//               <p className="text-purple-100 text-sm">Review customer feedback and ratings</p>
//             </div>

//             <div 
//               onClick={() => navigate("/admin/bookingmanage")}
//               className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
//             >
//               <Calendar size={32} className="mb-4" />
//               <h4 className="text-lg font-semibold mb-2">Manage Bookings</h4>
//               <p className="text-orange-100 text-sm">Handle all reservations and bookings</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Hotel,
  Users,
  Calendar,
  UserCircle,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  UserCheck,
  Building,
  ChevronRight,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Bell,
  HelpCircle,
  MessageSquare,
  Key,
  BedDouble,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalStaff: 0,
    totalBookings: 0,
    totalAdmins: 0,
    recentBookings: [],
    monthlyStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }

        // Fetch admin profile
        const profileResponse = await fetch(
          "http://localhost:5000/api/admin/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await profileResponse.json();
        if (profileData.success) {
          setAdmin(profileData.admin);
        }

        // Fetch dashboard stats
        const statsResponse = await fetch(
          "http://localhost:5000/api/admin/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          if (statsData.success) {
            setStats(statsData.stats);
          }
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  // Update active menu based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/dashboard") setActiveMenu("dashboard");
    else if (path === "/admin/hotelmanage") setActiveMenu("hotels");
    else if (path === "/admin/roommanage") setActiveMenu("rooms");
    else if (path === "/admin/usermanagement") setActiveMenu("staff");
    else if (path === "/admin/bookingmanage") setActiveMenu("bookings");
    else if (path === "/admin/bookingmanagement") setActiveMenu("bookings");
    else if (path === "/admin/admins") setActiveMenu("admins");
    else if (path === "/admin/managefeedback") setActiveMenu("feedback");
    else if (path === "/admin/settings") setActiveMenu("settings");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleNavigation = (menuId) => {
    setActiveMenu(menuId);
    switch(menuId) {
      case "dashboard":
        navigate("/admin/dashboard");
        break;
      case "hotels":
        navigate("/admin/hotelmanage");
        break;
      case "rooms":
        navigate("/admin/roommanage");
        break;
      case "staff":
        navigate("/admin/usermanagement");
        break;
      case "bookings":
        navigate("/admin/bookingmanagement");
        break;
      case "admins":
        navigate("/admin/admins");
        break;
      case "feedback":
        navigate("/admin/managefeedback");
        break;
      case "settings":
        navigate("/admin/settings");
        break;
      default:
        navigate("/admin/dashboard");
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "hotels", label: "Hotel Management", icon: <Hotel size={20} /> },
    { id: "rooms", label: "Room Management", icon: <BedDouble size={20} /> },
    { id: "staff", label: "User Management", icon: <Users size={20} /> },
    { id: "bookings", label: "Booking Management", icon: <Calendar size={20} /> },
    { id: "admins", label: "Admin Management", icon: <UserCircle size={20} /> },
    { id: "feedback", label: "Feedback Management", icon: <MessageSquare size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const statCards = [
    {
      title: "Total Hotels",
      value: stats.totalHotels || 0,
      icon: <Building size={24} />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      change: "+12%",
      trend: "up",
      onClick: () => handleNavigation("hotels"),
    },
    {
      title: "Total Staff",
      value: stats.totalStaff || 0,
      icon: <Users size={24} />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      change: "+8%",
      trend: "up",
      onClick: () => handleNavigation("staff"),
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: <Calendar size={24} />,
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      change: "+23%",
      trend: "up",
      onClick: () => handleNavigation("bookings"),
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins || 0,
      icon: <UserCheck size={24} />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      change: "+5%",
      trend: "up",
      onClick: () => handleNavigation("admins"),
    },
  ];

  // Quick action buttons
  const quickActions = [
    { label: "Add New Hotel", icon: <Hotel size={16} />, onClick: () => navigate("/addhotel"), color: "bg-blue-500" },
    { label: "Manage Rooms", icon: <BedDouble size={16} />, onClick: () => navigate("/admin/roommanage"), color: "bg-green-500" },
    { label: "View Feedback", icon: <MessageSquare size={16} />, onClick: () => navigate("/admin/managefeedback"), color: "bg-purple-500" },
    { label: "Manage Bookings", icon: <Calendar size={16} />, onClick: () => navigate("/admin/bookingmanagement"), color: "bg-orange-500" },
  ];

  // Chart data
  const chartData = [
    { month: "Jan", revenue: 4000, bookings: 24 },
    { month: "Feb", revenue: 3000, bookings: 13 },
    { month: "Mar", revenue: 2000, bookings: 98 },
    { month: "Apr", revenue: 2780, bookings: 39 },
    { month: "May", revenue: 1890, bookings: 48 },
    { month: "Jun", revenue: 2390, bookings: 38 },
    { month: "Jul", revenue: 3490, bookings: 43 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center cursor-pointer" onClick={() => handleNavigation("dashboard")}>
              <Hotel className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                ParadiseLankaStay
              </span>
              <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <HelpCircle size={20} />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/admin/profile")}>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {admin?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">
                  {admin?.role || "Administrator"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {admin?.name?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px] transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-0 lg:w-20"
          } overflow-hidden`}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeMenu === item.id
                    ? "bg-gradient-to-r from-primary-50 to-blue-50 text-primary-600 border border-primary-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`${
                    activeMenu === item.id
                      ? "text-primary-600"
                      : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {activeMenu === item.id && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 mt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-0" : "lg:ml-0"
        }`}>
          {/* Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {admin?.name || "Admin"}! 👋
                </h1>
                <p className="text-blue-100">
                  Here's what's happening with your hotel business today.
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden lg:flex space-x-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`${action.color} text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-opacity`}
                  >
                    {action.icon}
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid - Clickable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div
                key={index}
                onClick={card.onClick}
                className="stat-card animate-fade-in cursor-pointer transform hover:scale-105 transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${card.color} rounded-xl text-white`}>
                    {card.icon}
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      card.trend === "up"
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-red-50"
                    } px-2 py-1 rounded-full`}
                  >
                    <TrendingUp size={12} className="mr-1" />
                    {card.change}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {card.value}
                </h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Revenue Overview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monthly revenue and booking trends
                  </p>
                </div>
                <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <div className="h-64">
                {/* Simple bar chart visualization */}
                <div className="flex items-end h-48 space-x-2">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end space-x-1">
                        <div
                          className="flex-1 bg-gradient-to-t from-primary-500 to-blue-400 rounded-t-lg"
                          style={{ height: `${(item.revenue / 5000) * 100}%` }}
                        ></div>
                        <div
                          className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg"
                          style={{ height: `${(item.bookings / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Bookings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: "New booking received", time: "2 min ago", type: "booking", link: "/admin/bookingmanage" },
                  { action: "Hotel added", time: "15 min ago", type: "hotel", link: "/admin/hotelmanage" },
                  { action: "Staff member registered", time: "1 hour ago", type: "staff", link: "/admin/usermanagement" },
                  { action: "Payment processed", time: "2 hours ago", type: "payment", link: "/admin/bookingmanage" },
                  { action: "New feedback received", time: "5 hours ago", type: "feedback", link: "/admin/managefeedback" },
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => navigate(activity.link)}
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === "booking" ? "bg-blue-100 text-blue-600" :
                      activity.type === "hotel" ? "bg-green-100 text-green-600" :
                      activity.type === "staff" ? "bg-purple-100 text-purple-600" :
                      activity.type === "feedback" ? "bg-yellow-100 text-yellow-600" :
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {activity.type === "booking" && <Calendar size={16} />}
                      {activity.type === "hotel" && <Hotel size={16} />}
                      {activity.type === "staff" && <Users size={16} />}
                      {activity.type === "payment" && <DollarSign size={16} />}
                      {activity.type === "feedback" && <MessageSquare size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Bookings
                </h3>
                <p className="text-sm text-gray-600">
                  Latest hotel bookings and reservations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <button className="btn-secondary flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button 
                  onClick={() => navigate("/admin/bookingmanage")}
                  className="btn-primary flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  View All
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    // { id: "BK001", hotel: "Grand Plaza", customer: "John Doe", checkIn: "2024-01-15", status: "Confirmed" },
                    // { id: "BK002", hotel: "Sea View Resort", customer: "Jane Smith", checkIn: "2024-01-16", status: "Pending" },
                    // { id: "BK003", hotel: "Mountain Retreat", customer: "Robert Johnson", checkIn: "2024-01-17", status: "Confirmed" },
                    // { id: "BK004", hotel: "City Center Hotel", customer: "Sarah Wilson", checkIn: "2024-01-18", status: "Cancelled" },
                    // { id: "BK005", hotel: "Luxury Suites", customer: "Michael Brown", checkIn: "2024-01-19", status: "Confirmed" },
                  ].map((booking, index) => (
                    <tr 
                      key={index} 
                      className="table-row cursor-pointer hover:bg-gray-50"
                      onClick={() => navigate(`/admin/bookingmanage?booking=${booking.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-medium text-gray-800">
                          {booking.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                            <Hotel size={16} className="text-primary-600" />
                          </div>
                          <span className="text-sm text-gray-800">{booking.hotel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {booking.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {booking.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${
                          booking.status === "Confirmed" ? "badge-success" :
                          booking.status === "Pending" ? "badge-warning" :
                          "badge-error"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => navigate(`/admin/bookingmanage/view/${booking.id}`)}
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            onClick={() => navigate(`/admin/bookingmanage/edit/${booking.id}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing 1 to 5 of 24 entries
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div 
              onClick={() => navigate("/addhotel")}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <Hotel size={32} className="mb-4" />
              <h4 className="text-lg font-semibold mb-2">Add New Hotel</h4>
              <p className="text-blue-100 text-sm">Register a new hotel property</p>
            </div>

            <div 
              onClick={() => navigate("/admin/roommanage")}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <BedDouble size={32} className="mb-4" />
              <h4 className="text-lg font-semibold mb-2">Manage Rooms</h4>
              <p className="text-green-100 text-sm">Configure room settings and availability</p>
            </div>

            <div 
              onClick={() => navigate("/admin/managefeedback")}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquare size={32} className="mb-4" />
              <h4 className="text-lg font-semibold mb-2">View Feedback</h4>
              <p className="text-purple-100 text-sm">Review customer feedback and ratings</p>
            </div>

            <div 
              onClick={() => navigate("/admin/bookingmanage")}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <Calendar size={32} className="mb-4" />
              <h4 className="text-lg font-semibold mb-2">Manage Bookings</h4>
              <p className="text-orange-100 text-sm">Handle all reservations and bookings</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;