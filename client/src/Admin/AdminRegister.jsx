

// import { useState } from "react";
// import axios from "axios";

// export default function AdminRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/register",
//         form
//       );

//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//         alert("Admin registered successfully");
//         window.location.href = "/admin/login";
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Admin registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Admin Registration
//         </h2>

//         {error && (
//           <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Admin Name"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm">
//           Already have an admin account?{" "}
//           <a href="/admin/login" className="text-blue-600 font-semibold">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


///////////////////////////////design////////////////////////////////

// import { useState } from "react";
// import axios from "axios";

// export default function AdminRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/register",
//         form
//       );

//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//         alert("Admin registered successfully! Redirecting to login...");
//         window.location.href = "/admin/login";
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Admin registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
//       </div>

//       {/* Main Card */}
//       <div className="relative bg-white backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20 z-10">
//         {/* Header with icon */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full mb-4 shadow-lg">
//             <svg 
//               className="w-10 h-10 text-white" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
//               />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Admin Registration
//           </h2>
//           <p className="text-gray-500">Create your admin account</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-red-700 text-sm">{error}</span>
//             </div>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name Input */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//               Full Name
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </span>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 placeholder="Enter your full name"
//                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Input */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </span>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//               Password
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </span>
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                 onChange={handleChange}
//                 required
//                 minLength={8}
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1 ml-1">
//               Password must be at least 8 characters
//             </p>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 <span>Creating Account...</span>
//               </div>
//             ) : (
//               "Register Admin"
//             )}
//           </button>
//         </form>

//         {/* Footer Links */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an admin account?{" "}
//             <a 
//               href="/admin/login" 
//               className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300"
//             >
//               Sign In
//             </a>
//           </p>
          
//           <div className="mt-4 flex justify-center space-x-2">
//             <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
//             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></span>
//             <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-400"></span>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
//           20%, 40%, 60%, 80% { transform: translateX(5px); }
//         }
//         .animate-float {
//           animation: float 7s infinite;
//         }
//         .animate-shake {
//           animation: shake 0.5s ease-in-out;
//         }
//         .animation-delay-200 {
//           animation-delay: 200ms;
//         }
//         .animation-delay-400 {
//           animation-delay: 400ms;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//       `}</style>
//     </div>
//   );
// }


//////////////////////////////////////
// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AdminRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/register",
//         form
//       );

//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);

//         toast.success("Admin registered successfully! Redirecting to login...", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "light",
//         });

//         setTimeout(() => {
//           window.location.href = "/admin/login";
//         }, 900);
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || "Admin registration failed";
//       setError(msg);
//       toast.error(msg, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "light",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
//       <ToastContainer />

//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-blue-100">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">
//             ParadiseLankaStay 
//           </h2>
//           <p className="text-gray-500 text-sm">Admin Registration</p>
//         </div>

//         {error && (
//           <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm text-center">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
//               onChange={handleChange}
//               required
//               minLength={8}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Password must be at least 8 characters
//             </p>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
//           >
//             {loading ? "Creating Account..." : "Register Admin"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an admin account?{" "}
//             <a
//               href="/admin/login"
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


//////////////////////////////////////////////////////////////////////

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Email validation (example: thisara@gmail -> invalid)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      const msg = "Please enter a valid email address (e.g., thisara@gmail.com)";
      setError(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/register",
        form
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);

        toast.success("Admin registered successfully! Redirecting to login...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 900);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Admin registration failed";
      setError(msg);
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Admin Registration
          </h2>
          <p className="text-gray-500 text-sm">Create your admin account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              onChange={handleChange}
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Creating Account..." : "Register Admin"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an admin account?{" "}
            <a
              href="/admin/login"
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