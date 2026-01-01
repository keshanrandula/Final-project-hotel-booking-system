// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-blue-600">
//           HotelBooking
//         </h1>

//         {/* Menu */}
//         <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
//           <li><a href="/" className="hover:text-blue-600">Home</a></li>
//           <li><a href="/hotels" className="hover:text-blue-600">Hotels</a></li>
//           <li><a href="/about" className="hover:text-blue-600">About</a></li>
//           <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
//         </ul>

//         {/* Login / Register */}
//         <div>
//           <a
//             href="/login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// }


// ////////////////////
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        HotelEase
      </Link>

      {/* Navigation */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/rooms" className="hover:text-blue-600">Rooms</Link>
        <Link to="/contact" className="hover:text-blue-600">Contacts</Link>

        {/* If NO USER -> show login button */}
        {!user && (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        )}

        {/* If USER LOGGED -> show profile letter */}
        {user && (
          <div className="flex items-center space-x-4">
            {/* Profile Circle */}
            <Link
              to="/profile"
              className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold"
            >
              {user.firstName?.charAt(0).toUpperCase()}
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

///////////////////////////////////////////

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { 
//   HomeIcon, 
//   BuildingOfficeIcon, 
//   PhoneIcon, 
//   UserCircleIcon,
//   ArrowRightOnRectangleIcon
// } from "@heroicons/react/24/outline";

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
//       isScrolled 
//         ? 'bg-white/95 backdrop-blur-md shadow-lg' 
//         : 'bg-gradient-to-r from-blue-600 to-indigo-700'
//     }`}>
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2 group">
//           <div className={`p-2 rounded-lg ${
//             isScrolled ? 'bg-blue-100' : 'bg-white/20'
//           }`}>
//             <BuildingOfficeIcon className={`h-6 w-6 ${
//               isScrolled ? 'text-blue-600' : 'text-white'
//             }`} />
//           </div>
//           <span className={`text-xl font-bold ${
//             isScrolled ? 'text-gray-800' : 'text-white'
//           } group-hover:text-blue-600 transition-colors`}>
//             HotelEase
//           </span>
//         </Link>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8">
//           <Link 
//             to="/" 
//             className={`flex items-center space-x-2 font-medium transition-colors ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
//             }`}
//           >
//             <HomeIcon className="h-5 w-5" />
//             <span>Home</span>
//           </Link>
          
//           <Link 
//             to="/rooms" 
//             className={`flex items-center space-x-2 font-medium transition-colors ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
//             }`}
//           >
//             <BuildingOfficeIcon className="h-5 w-5" />
//             <span>Rooms</span>
//           </Link>
          
//           <Link 
//             to="/contact" 
//             className={`flex items-center space-x-2 font-medium transition-colors ${
//               isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
//             }`}
//           >
//             <PhoneIcon className="h-5 w-5" />
//             <span>Contact</span>
//           </Link>
//         </div>

//         {/* User Actions */}
//         <div className="flex items-center space-x-4">
//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                   isScrolled 
//                     ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                     : 'bg-white text-blue-600 hover:bg-gray-100'
//                 }`}
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:opacity-90 transition-opacity"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <div className="flex items-center space-x-3">
//               {/* Welcome Message */}
//               <span className={`font-medium ${
//                 isScrolled ? 'text-gray-700' : 'text-white'
//               }`}>
//                 Hi, {user.firstName}!
//               </span>
              
//               {/* Profile Dropdown */}
//               <div className="relative group">
//                 <button className="flex items-center space-x-2 focus:outline-none">
//                   <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition-colors ${
//                     isScrolled 
//                       ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                       : 'bg-white text-blue-600 hover:bg-gray-100'
//                   }`}>
//                     {user.firstName?.charAt(0).toUpperCase()}
//                   </div>
//                 </button>
                
//                 {/* Dropdown Menu */}
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border">
//                   <div className="py-1">
//                     <Link
//                       to="/profile"
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
//                     >
//                       <UserCircleIcon className="h-5 w-5 mr-3" />
//                       My Profile
//                     </Link>
//                     <Link
//                       to="/bookings"
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
//                     >
//                       <BuildingOfficeIcon className="h-5 w-5 mr-3" />
//                       My Bookings
//                     </Link>
//                     <button
//                       onClick={logout}
//                       className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50"
//                     >
//                       <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
