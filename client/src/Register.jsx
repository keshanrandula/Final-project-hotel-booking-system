

// // import { useState } from "react";
// // import axios from "axios";

// // export default function Register() {
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     phone: "",
// //     address: "",
// //   });
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/register", form);

// //       if (res.data.success) {
// //         alert("Registration Successful!");
// //         window.location.href = "/login";
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Registration failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //       <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-lg">
// //         <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

// //         {error && <p className="text-red-600 mb-3">{error}</p>}

// //         <form onSubmit={handleRegister} className="space-y-4">
// //           <div className="grid grid-cols-2 gap-3">
// //             <input
// //               type="text"
// //               name="firstName"
// //               className="border p-3 rounded-lg"
// //               placeholder="First Name"
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="lastName"
// //               className="border p-3 rounded-lg"
// //               placeholder="Last Name"
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>

// //           <input
// //             type="email"
// //             name="email"
// //             className="border p-3 rounded-lg w-full"
// //             placeholder="Email"
// //             onChange={handleChange}
// //             required
// //           />

// //           <input
// //             type="password"
// //             name="password"
// //             className="border p-3 rounded-lg w-full"
// //             placeholder="Password"
// //             onChange={handleChange}
// //             required
// //           />

// //           <input
// //             type="text"
// //             name="phone"
// //             className="border p-3 rounded-lg w-full"
// //             placeholder="Phone Number"
// //             onChange={handleChange}
// //           />

// //           <input
// //             type="text"
// //             name="address"
// //             className="border p-3 rounded-lg w-full"
// //             placeholder="Address"
// //             onChange={handleChange}
// //           />

// //           <button
// //             type="submit"
// //             className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
// //           >
// //             Register
// //           </button>

// //           <p className="text-center mt-3">
// //             Already have an account?{" "}
// //             <a href="/login" className="text-blue-600 font-semibold">
// //               Login
// //             </a>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// /////////////////////////////////////

// // import { useState } from "react";
// // import axios from "axios";

// // export default function Register() {
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     phone: "",
// //     address: "",
// //   });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     if (error) setError("");
// //   };

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/register", form);

// //       if (res.data.success) {
// //         alert("Registration Successful! Welcome to ParadiseLankaStay!");
// //         window.location.href = "/login";
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Registration failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
// //       {/* Decorative ocean wave elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         {/* Wave pattern background */}
// //         <div className="absolute top-0 left-0 w-full h-64 opacity-10">
// //           <svg className="w-full h-full text-blue-600" viewBox="0 0 1200 120" preserveAspectRatio="none">
// //             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
// //           </svg>
// //         </div>
// //         <div className="absolute bottom-0 left-0 w-full h-64 opacity-10 transform rotate-180">
// //           <svg className="w-full h-full text-blue-600" viewBox="0 0 1200 120" preserveAspectRatio="none">
// //             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
// //           </svg>
// //         </div>
        
// //         {/* Floating bubbles */}
// //         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
// //         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"></div>
// //         <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-lg opacity-20 animate-float animation-delay-1000"></div>
// //         <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-3000"></div>
// //       </div>

// //       {/* Main Card */}
// //       <div className="relative bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-2xl transform transition-all hover:scale-105 duration-300 border border-white/20 z-10">
// //         {/* Header with Paradise theme */}
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full mb-4 shadow-lg">
// //             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
// //             </svg>
// //           </div>
// //           <h2 className="text-3xl font-bold text-gray-800 mb-2">
// //             Welcome to <span className="text-blue-600">ParadiseLanka</span>Stay
// //           </h2>
// //           <p className="text-gray-500">Create your account and start your journey with us</p>
// //         </div>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
// //             <div className="flex items-center">
// //               <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //               <span className="text-red-700 text-sm">{error}</span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Form */}
// //         <form onSubmit={handleRegister} className="space-y-5">
// //           {/* Name Fields - Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {/* First Name */}
// //             <div className="relative">
// //               <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //                 First Name
// //               </label>
// //               <div className="relative">
// //                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                   </svg>
// //                 </span>
// //                 <input
// //                   type="text"
// //                   name="firstName"
// //                   value={form.firstName}
// //                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                   placeholder="John"
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Last Name */}
// //             <div className="relative">
// //               <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //                 Last Name
// //               </label>
// //               <div className="relative">
// //                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                   </svg>
// //                 </span>
// //                 <input
// //                   type="text"
// //                   name="lastName"
// //                   value={form.lastName}
// //                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                   placeholder="Doe"
// //                   onChange={handleChange}
// //                   required
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Email */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //               Email Address
// //             </label>
// //             <div className="relative">
// //               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                 </svg>
// //               </span>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={form.email}
// //                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                 placeholder="john.doe@example.com"
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>

// //           {/* Password */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //                 </svg>
// //               </span>
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 name="password"
// //                 value={form.password}
// //                 className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                 placeholder="Create a strong password"
// //                 onChange={handleChange}
// //                 required
// //                 minLength={6}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
// //               >
// //                 {showPassword ? (
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
// //                   </svg>
// //                 ) : (
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
// //                   </svg>
// //                 )}
// //               </button>
// //             </div>
// //             <p className="text-xs text-gray-500 mt-1 ml-1">
// //               Must be at least 6 characters
// //             </p>
// //           </div>

// //           {/* Phone */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //               Phone Number
// //             </label>
// //             <div className="relative">
// //               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
// //                 </svg>
// //               </span>
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 value={form.phone}
// //                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                 placeholder="+94 77 123 4567"
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>

// //           {/* Address */}
// //           <div className="relative">
// //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
// //               Address
// //             </label>
// //             <div className="relative">
// //               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                 </svg>
// //               </span>
// //               <input
// //                 type="text"
// //                 name="address"
// //                 value={form.address}
// //                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
// //                 placeholder="Your address"
// //                 onChange={handleChange}
// //               />
// //             </div>
// //           </div>

// //           {/* Terms and Conditions */}
// //           <div className="flex items-center mt-4">
// //             <input
// //               type="checkbox"
// //               id="terms"
// //               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //               required
// //             />
// //             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
// //               I agree to the{" "}
// //               <a href="/terms" className="text-blue-600 hover:underline">
// //                 Terms of Service
// //               </a>{" "}
// //               and{" "}
// //               <a href="/privacy" className="text-blue-600 hover:underline">
// //                 Privacy Policy
// //               </a>
// //             </label>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
// //           >
// //             {loading ? (
// //               <div className="flex items-center justify-center">
// //                 <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// //                 </svg>
// //                 <span>Creating Account...</span>
// //               </div>
// //             ) : (
// //               "Create Account"
// //             )}
// //           </button>
// //         </form>

// //         {/* Footer */}
// //         <div className="mt-8 text-center">
// //           <p className="text-gray-600 text-sm">
// //             Already have an account?{" "}
// //             <a 
// //               href="/login" 
// //               className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300"
// //             >
// //               Sign In
// //             </a>
// //           </p>
          
// //           {/* Decorative dots */}
// //           <div className="mt-4 flex justify-center space-x-2">
// //             <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
// //             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></span>
// //             <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-400"></span>
// //           </div>

// //           {/* Welcome note */}
// //           <p className="mt-4 text-xs text-gray-400 flex items-center justify-center">
// //             <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l7 7-7 7-7-7 7-7zM12 22l7-7-7-7-7 7 7 7z" />
// //             </svg>
// //             Join ParadiseLankaStay and experience true paradise
// //           </p>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes float {
// //           0% { transform: translate(0px, 0px) scale(1); }
// //           33% { transform: translate(30px, -50px) scale(1.1); }
// //           66% { transform: translate(-20px, 20px) scale(0.9); }
// //           100% { transform: translate(0px, 0px) scale(1); }
// //         }
// //         @keyframes shake {
// //           0%, 100% { transform: translateX(0); }
// //           10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
// //           20%, 40%, 60%, 80% { transform: translateX(5px); }
// //         }
// //         .animate-float {
// //           animation: float 7s infinite;
// //         }
// //         .animate-shake {
// //           animation: shake 0.5s ease-in-out;
// //         }
// //         .animation-delay-200 {
// //           animation-delay: 200ms;
// //         }
// //         .animation-delay-400 {
// //           animation-delay: 400ms;
// //         }
// //         .animation-delay-1000 {
// //           animation-delay: 1000ms;
// //         }
// //         .animation-delay-2000 {
// //           animation-delay: 2000ms;
// //         }
// //         .animation-delay-3000 {
// //           animation-delay: 3000ms;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }




// ////////////////////////////////////////////////////
// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Register() {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", form);

//       if (res.data.success) {
//         toast.success("Registration Successful! Welcome to ParadiseLankaStay!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//       toast.error(err.response?.data?.message || "Registration failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
//       <ToastContainer />
      
//       {/* Main Card */}
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl border border-blue-100">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">
//             Welcome to <span className="text-blue-600">ParadiseLanka</span>Stay
//           </h2>
//           <p className="text-gray-500 text-sm">Create your account</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm text-center">{error}</p>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleRegister} className="space-y-4">
//           {/* Name Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={form.firstName}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//                 placeholder="John"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={form.lastName}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//                 placeholder="Doe"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               placeholder="john.doe@example.com"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white pr-10"
//                 placeholder="Create a password"
//                 onChange={handleChange}
//                 required
//                 minLength={6}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
//               >
//                 {showPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={form.phone}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               placeholder="+94 77 123 4567"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={form.address}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               placeholder="Your address"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Terms */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="terms"
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               required
//             />
//             <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//               I agree to the{" "}
//               <a href="/terms" className="text-blue-600 hover:underline">
//                 Terms
//               </a>{" "}
//               and{" "}
//               <a href="/privacy" className="text-blue-600 hover:underline">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{" "}
//             <a 
//               href="/login" 
//               className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
//             >
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



//////////////////////////////////////////
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // ✅ field errors
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    // Simple & strict enough to catch "kesha@gmail"
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const isValidPhone = (phone) => {
    if (!phone) return true; // optional field
    // allow + and digits, length 9-15 (basic)
    return /^\+?\d{9,15}$/.test(phone.replace(/\s/g, ""));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email.trim())) {
      newErrors.email = "Invalid email format (e.g., kesha@gmail.com)";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isValidPhone(form.phone)) {
      newErrors.phone = "Invalid phone number (use digits, optional +, 9-15 length)";
    }

    // address optional -> no validation (keep content same)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");

    // ✅ clear field error while typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Frontend validation before API call
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      if (res.data.success) {
        toast.success("Registration Successful! Welcome to ParadiseLankaStay!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <ToastContainer />

      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl border border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome to <span className="text-blue-600">ParadiseLanka</span>Stay
          </h2>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-white
                  ${errors.firstName ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
                placeholder="John"
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-white
                  ${errors.lastName ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
                placeholder="Doe"
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-white
                ${errors.email ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
              placeholder="john.doe@example.com"
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-white pr-10
                  ${errors.password ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
                placeholder="Create a password"
                onChange={handleChange}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password ? (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            ) : (
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-white
                ${errors.phone ? "border-red-400 focus:ring-1 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
              placeholder="+94 77 123 4567"
              onChange={handleChange}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              placeholder="Your address"
              onChange={handleChange}
            />
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}