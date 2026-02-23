// // // import Navbar from "./components/Navbar";
// // // import Footer from "./components/Footer";

// // // export default function Home() {
// // //   return (
// // //     <>
// // //       <Navbar />

// // //       {/* Hero Section */}
// // //       <div className="h-screen bg-cover bg-center flex items-center justify-center"
// // //         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb2104f')" }}>
        
// // //         <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center text-white">
// // //           <h1 className="text-4xl font-bold mb-4">Welcome to HotelEase</h1>
// // //           <p className="text-lg mb-6">Book your dream stay with comfort and luxury.</p>

// // //           <a
// // //             href="/rooms"
// // //             className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
// // //           >
// // //             Explore Rooms
// // //           </a>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </>
// // //   );
// // // }


// // ////////////////////////////////

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import {
//   MagnifyingGlassIcon,
//   CalendarDaysIcon,
//   UserGroupIcon,
//   CheckCircleIcon,
//   StarIcon,
//   ShieldCheckIcon
// } from "@heroicons/react/24/outline";

// export default function Home() {
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guests, setGuests] = useState(1);

//   // Set default dates
//   useEffect(() => {
//     const today = new Date();
//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);
    
//     setCheckIn(today.toISOString().split('T')[0]);
//     setCheckOut(tomorrow.toISOString().split('T')[0]);
//   }, []);

//   const features = [
//     {
//       icon: <CheckCircleIcon className="h-8 w-8 text-blue-600" />,
//       title: "Easy Booking",
//       description: "Book your stay in just a few clicks"
//     },
//     {
//       icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
//       title: "Secure Payments",
//       description: "100% secure payment processing"
//     },
//     {
//       icon: <StarIcon className="h-8 w-8 text-yellow-500" />,
//       title: "Best Price",
//       description: "Guaranteed lowest prices"
//     }
//   ];

//   const roomTypes = [
//     {
//       name: "Standard Room",
//       price: "$99/night",
//       image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
//       features: ["1-2 Guests", "Free WiFi", "Breakfast Included"]
//     },
//     {
//       name: "Deluxe Suite",
//       price: "$199/night",
//       image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
//       features: ["2-4 Guests", "Sea View", "Private Balcony"]
//     },
//     {
//       name: "Presidential Suite",
//       price: "$399/night",
//       image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
//       features: ["4-6 Guests", "Butler Service", "Private Pool"]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Hero Section */}
//       <div 
//         className="relative h-[85vh] bg-cover bg-center flex items-center"
//         style={{
//           backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
//           backgroundPosition: "center"
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50"></div>
        
//         <div className="relative max-w-7xl mx-auto px-6 text-white z-10 w-full">
//           <div className="max-w-2xl">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//               Experience Luxury &<br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
//                 Comfort Redefined
//               </span>
//             </h1>
//             <p className="text-xl mb-8 text-gray-200">
//               Discover the perfect blend of luxury, comfort, and hospitality at our premium hotels worldwide.
//             </p>
//           </div>

//           {/* Search Box */}
//           <div className="mt-10 bg-white rounded-2xl shadow-2xl p-6 max-w-4xl">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Check-in
//                 </label>
//                 <div className="relative">
//                   <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="date"
//                     value={checkIn}
//                     onChange={(e) => setCheckIn(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Check-out
//                 </label>
//                 <div className="relative">
//                   <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     type="date"
//                     value={checkOut}
//                     onChange={(e) => setCheckOut(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Guests
//                 </label>
//                 <div className="relative">
//                   <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <select
//                     value={guests}
//                     onChange={(e) => setGuests(parseInt(e.target.value))}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//                   >
//                     {[1,2,3,4,5,6].map(num => (
//                       <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="flex items-end">
//                 <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
//                   <MagnifyingGlassIcon className="h-5 w-5" />
//                   <span>Search Rooms</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Why Choose HotelEase?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Room Types */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex justify-between items-center mb-12">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-800">Featured Rooms</h2>
//               <p className="text-gray-600 mt-2">Experience luxury in every room</p>
//             </div>
//             <Link 
//               to="/rooms" 
//               className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
//             >
//               <span>View All Rooms</span>
//               <ArrowRightIcon className="h-5 w-5" />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {roomTypes.map((room, index) => (
//               <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//                 <div className="relative h-48 overflow-hidden">
//                   <img 
//                     src={room.image} 
//                     alt={room.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                     <span className="font-bold text-gray-800">{room.price}</span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3">{room.name}</h3>
//                   <ul className="space-y-2 mb-6">
//                     {room.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-gray-600">
//                         <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                   <Link
//                     to="/booking"
//                     className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                   >
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             What Our Guests Say
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1,2,3].map((_, index) => (
//               <div key={index} className="bg-gray-50 rounded-xl p-6">
//                 <div className="flex items-center mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 italic mb-6">
//                   "Amazing experience! The service was exceptional and the rooms were luxurious."
//                 </p>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//                     J
//                   </div>
//                   <div className="ml-3">
//                     <h4 className="font-semibold">John Doe</h4>
//                     <p className="text-sm text-gray-500">Business Traveler</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// // Helper Components
// function ArrowRightIcon(props) {
//   return (
//     <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//     </svg>
//   );
// }

// function CheckIcon(props) {
//   return (
//     <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   );
// }

/////////////////////////////////////////////

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setCheckIn(today.toISOString().split("T")[0]);
    setCheckOut(tomorrow.toISOString().split("T")[0]);
  }, []);

  const features = [
    {
      icon: <CheckCircleIcon className="h-8 w-8 text-blue-600" />,
      title: "Easy Booking",
      description: "Book your stay in just a few clicks",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8 text-green-600" />,
      title: "Secure Payments",
      description: "100% secure payment processing",
    },
    {
      icon: <StarIcon className="h-8 w-8 text-yellow-500" />,
      title: "Best Price",
      description: "Guaranteed lowest prices",
    },
  ];

  const roomTypes = [
    {
      name: "Standard Room",
      price: "$99/night",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      features: ["1-2 Guests", "Free WiFi", "Breakfast Included"],
    },
    {
      name: "Deluxe Suite",
      price: "$199/night",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      features: ["2-4 Guests", "Sea View", "Private Balcony"],
    },
    {
      name: "Presidential Suite",
      price: "$399/night",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      features: ["4-6 Guests", "Butler Service", "Private Pool"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-[85vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Experience Luxury &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Comfort Redefined
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Discover the perfect blend of luxury, comfort, and hospitality at our premium hotels worldwide.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-10 bg-white rounded-2xl shadow-2xl p-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <div className="relative">
                  <UserGroupIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search Rooms</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose HotelEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

