export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-xl font-semibold">HotelBooking</h2>
        <p className="mt-2">Your comfort is our priority.</p>

        <div className="mt-4 flex justify-center space-x-6">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/hotels" className="hover:text-white">Hotels</a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} HotelBooking. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}


////////////////////////////////////////////////////////////////

// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   GlobeAltIcon,
//   FacebookIcon,
//   TwitterIcon,
//   InstagramIcon,
//   LinkedinIcon
// } from "@heroicons/react/24/outline";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   const footerLinks = {
//     "HotelEase": ["About Us", "Careers", "Press", "Blog"],
//     "Support": ["Help Center", "Safety Information", "Cancellation Options", "Report Issue"],
//     "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"]
//   };

//   const contactInfo = [
//     { icon: PhoneIcon, text: "+94 77 123 4567" },
//     { icon: EnvelopeIcon, text: "support@hotelease.com" },
//     { icon: MapPinIcon, text: "123 Hotel Street, Colombo, Sri Lanka" }
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="p-2 bg-white/10 rounded-lg">
//                 <GlobeAltIcon className="h-8 w-8 text-blue-300" />
//               </div>
//               <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
//                 HotelEase
//               </h2>
//             </div>
//             <p className="text-gray-300 mb-6 max-w-md">
//               Experience luxury and comfort like never before. We're committed to providing exceptional hospitality services worldwide.
//             </p>
            
//             {/* Contact Info */}
//             <div className="space-y-3">
//               {contactInfo.map((item, index) => (
//                 <div key={index} className="flex items-center space-x-3 text-gray-300">
//                   <item.icon className="h-5 w-5 text-blue-400" />
//                   <span>{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h3 className="text-lg font-semibold mb-4 text-white">{category}</h3>
//               <ul className="space-y-2">
//                 {links.map((link, index) => (
//                   <li key={index}>
//                     <a 
//                       href="#" 
//                       className="text-gray-300 hover:text-white transition-colors hover:underline"
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Social Media & Newsletter */}
//         <div className="mt-12 pt-8 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             {/* Social Icons */}
//             <div className="flex space-x-4 mb-6 md:mb-0">
//               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition-colors">
//                 <FacebookIcon className="h-6 w-6" />
//               </a>
//               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-400 transition-colors">
//                 <TwitterIcon className="h-6 w-6" />
//               </a>
//               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-pink-600 transition-colors">
//                 <InstagramIcon className="h-6 w-6" />
//               </a>
//               <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-700 transition-colors">
//                 <LinkedinIcon className="h-6 w-6" />
//               </a>
//             </div>

//             {/* Newsletter */}
//             <div className="w-full md:w-auto">
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
//                 />
//                 <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-black/30 py-6">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm mb-4 md:mb-0">
//               © {currentYear} HotelEase. All rights reserved.
//             </p>
//             <div className="flex items-center space-x-6 text-sm text-gray-400">
//               <span>🏳️‍🌈 We support diversity & inclusion</span>
//               <span>🌱 Eco-friendly practices</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }