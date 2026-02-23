
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
//       {/* Logo */}
//       <Link to="/" className="text-2xl font-bold text-blue-600">
//         HotelEase
//       </Link>

//       {/* Navigation */}
//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-blue-600">Home</Link>
//         <Link to="/rooms" className="hover:text-blue-600">Rooms</Link>
//         <Link to="/contact" className="hover:text-blue-600">Contacts</Link>

//         {/* If NO USER -> show login button */}
//         {!user && (
//           <Link
//             to="/login"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </Link>
//         )}

//         {/* If USER LOGGED -> show profile letter */}
//         {user && (
//           <div className="flex items-center space-x-4">
//             {/* Profile Circle */}
//             <Link
//               to="/profile"
//               className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold"
//             >
//               {user.firstName?.charAt(0).toUpperCase()}
//             </Link>

//             {/* Logout */}
//             <button
//               onClick={logout}
//               className="text-red-600 hover:text-red-800 font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

///////////////////////////////////////

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
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 transition-all duration-300">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-blue-600 hover:text-blue-800 transition duration-300">
        HotelEase
      </Link>

      {/* Navigation */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-lg text-gray-700 hover:text-blue-600 transition duration-300">
          Home
        </Link>
        <Link to="/rooms" className="text-lg text-gray-700 hover:text-blue-600 transition duration-300">
          Rooms
        </Link>
        <Link to="/hotels" className="text-lg text-gray-700 hover:text-blue-600 transition duration-300">
          Hotels
        </Link>
        <Link to="/contact" className="text-lg text-gray-700 hover:text-blue-600 transition duration-300">
          Contact
        </Link>

        {/* If NO USER -> show login button */}
        {!user && (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
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
              className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold hover:bg-blue-700 transition duration-300"
            >
              {user.firstName?.charAt(0).toUpperCase()}
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-semibold transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
