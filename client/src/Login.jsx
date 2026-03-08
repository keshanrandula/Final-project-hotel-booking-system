

// import { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         alert("Login Successful!");
//         window.location.href = "/profile";
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         {error && <p className="text-red-600 mb-3">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             className="w-full p-3 border rounded-lg"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="w-full p-3 border rounded-lg"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 font-semibold">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


// ///////////////////////////////////////////////////////////

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Toast success
        toast.success("Login Successful! Welcome to ParadiseLankaStay!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        // keep your alert too (content unchanged)
        alert("Login Successful!");

        setTimeout(() => {
          window.location.href = "/profile";
        }, 800);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);

      // ✅ Toast error
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <ToastContainer />

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-100">
        {/* ✅ Added inside container */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome to <span className="text-blue-600">ParadiseLanka</span>Stay
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}



