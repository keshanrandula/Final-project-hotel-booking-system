

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [edit, setEdit] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Please login first");
//       window.location.href = "/login";
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data.user);
//       } catch (err) {
//         alert("Auth failed. Login again.");
//         window.location.href = "/login";
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5000/api/auth/profile",
//         user,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Profile updated!");
//       setEdit(false);

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//     } catch (err) {
//       alert("Update failed");
//     }
//   };

//   if (!user) return <p className="text-center mt-20 text-xl font-semibold">Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 space-y-6 border-2 border-gray-200">
//       <h2 className="text-3xl font-semibold text-center text-blue-700 mb-4">My Profile</h2>

//       <div className="space-y-5">

//         {/* FIRST NAME */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">First Name</label>
//           <input
//             type="text"
//             className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.firstName}
//             disabled={!edit}
//             onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//           />
//         </div>

//         {/* LAST NAME */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Last Name</label>
//           <input
//             type="text"
//             className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.lastName}
//             disabled={!edit}
//             onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//           />
//         </div>

//         {/* EMAIL */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full p-4 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 rounded-xl"
//             value={user.email}
//             disabled
//           />
//         </div>

//         {/* PHONE */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//           <input
//             type="text"
//             className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.phone || ""}
//             disabled={!edit}
//             onChange={(e) => setUser({ ...user, phone: e.target.value })}
//           />
//         </div>

//         {/* ADDRESS */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Address</label>
//           <input
//             type="text"
//             className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.address || ""}
//             disabled={!edit}
//             onChange={(e) => setUser({ ...user, address: e.target.value })}
//           />
//         </div>

//         {/* BUTTONS */}
//         <div>
//           {!edit ? (
//             <button
//               onClick={() => setEdit(true)}
//               className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
//             >
//               Edit Profile
//             </button>
//           ) : (
//             <button
//               onClick={handleUpdate}
//               className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all"
//             >
//               Save Changes
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////////////
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        alert("Auth failed. Login again.");
        window.location.href = "/login";
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Toast Success Message
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setEdit(false);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Loading...
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 space-y-6 border-2 border-gray-200">
      
      {/* ✅ Toast Container */}
      <ToastContainer />

      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-4">
        My Profile
      </h2>

      <div className="space-y-5">

        {/* FIRST NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.firstName}
            disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, firstName: e.target.value })
            }
          />
        </div>

        {/* LAST NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.lastName}
            disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, lastName: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-4 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-300 rounded-xl"
            value={user.email}
            disabled
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.phone || ""}
            disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, phone: e.target.value })
            }
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            className="w-full p-4 mt-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.address || ""}
            disabled={!edit}
            onChange={(e) =>
              setUser({ ...user, address: e.target.value })
            }
          />
        </div>

        {/* BUTTONS */}
        <div>
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}