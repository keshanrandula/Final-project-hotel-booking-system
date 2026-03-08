
// import { useState } from "react";
// import axios from "axios";

// export default function AdminLogin() {
//   const [form, setForm] = useState({
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
//         "http://localhost:5000/api/admin/login",
//         form
//       );

//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//         window.location.href = "/admin/dashboard";
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

//         {error && (
//           <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             onChange={handleChange}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm">
//           Don’t have an admin account?{" "}
//           <a href="/admin/register" className="text-blue-600 font-semibold">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


///////////////////////////////////////////////////

// import { useState } from "react";
// import axios from "axios";

// export default function AdminLogin() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

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
//         "http://localhost:5000/api/admin/login",
//         form
//       );

//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//         // Show success message before redirect
//         alert("Login successful! Redirecting to dashboard...");
//         window.location.href = "/admin/dashboard";
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
//       </div>

//       {/* Main Card */}
//       <div className="relative bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20 z-10">
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
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
//               />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500">Sign in to your admin account</p>
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
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={form.password}
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//                 onChange={handleChange}
//                 required
//               />
//               {/* Password toggle button */}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
//               >
//                 {showPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <div className="flex justify-end mt-1">
//               <a 
//                 href="/admin/forgot-password" 
//                 className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-all"
//               >
//                 Forgot password?
//               </a>
//             </div>
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
//                 <span>Signing In...</span>
//               </div>
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         {/* Footer Links */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-600 text-sm">
//             Don't have an admin account?{" "}
//             <a 
//               href="/admin/register" 
//               className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-300"
//             >
//               Register here
//             </a>
//           </p>
          
//           {/* Decorative dots */}
//           <div className="mt-4 flex justify-center space-x-2">
//             <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
//             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></span>
//             <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-400"></span>
//           </div>

//           {/* Security note */}
//           <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
//             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             <span>Secure admin access only</span>
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


////////////////

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      const msg = "Please enter a valid email address (e.g., admin@gmail.com)";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);

        toast.success("Login successful! Redirecting to dashboard...", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1500);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      <ToastContainer />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
      </div>

      {/* Main Card */}
      <div className="relative bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300 border border-white/20 z-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500">Sign in to your admin account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an admin account?{" "}
            <a
              href="/admin/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
