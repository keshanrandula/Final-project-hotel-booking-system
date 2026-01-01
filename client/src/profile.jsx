
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

//   if (!user) return <p className="text-center mt-20">Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
//       <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

//       <div className="space-y-4">
//         <input
//           type="text"
//           className="w-full p-3 border rounded-lg"
//           value={user.firstName}
//           disabled={!edit}
//           onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//         />

//         <input
//           type="text"
//           className="w-full p-3 border rounded-lg"
//           value={user.lastName}
//           disabled={!edit}
//           onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//         />

//         <input
//           type="text"
//           className="w-full p-3 border rounded-lg"
//           value={user.phone || ""}
//           disabled={!edit}
//           onChange={(e) => setUser({ ...user, phone: e.target.value })}
//         />

//         <input
//           type="text"
//           className="w-full p-3 border rounded-lg"
//           value={user.address || ""}
//           disabled={!edit}
//           onChange={(e) => setUser({ ...user, address: e.target.value })}
//         />

//         {!edit ? (
//           <button
//             onClick={() => setEdit(true)}
//             className="w-full bg-blue-600 text-white p-3 rounded-lg"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <button
//             onClick={handleUpdate}
//             className="w-full bg-green-600 text-white p-3 rounded-lg"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

/////////////
import { useEffect, useState } from "react";
import axios from "axios";

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

      alert("Profile updated!");
      setEdit(false);

      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      <div className="space-y-4">

        {/* FIRST NAME */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          value={user.firstName}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />

        {/* LAST NAME */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          value={user.lastName}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />

        {/* EMAIL (READ ONLY) */}
        <input
          type="email"
          className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          value={user.email}
          disabled
        />

        {/* PHONE */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          value={user.phone || ""}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />

        {/* ADDRESS */}
        <input
          type="text"
          className="w-full p-3 border rounded-lg"
          value={user.address || ""}
          disabled={!edit}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />

        {/* BUTTONS */}
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
