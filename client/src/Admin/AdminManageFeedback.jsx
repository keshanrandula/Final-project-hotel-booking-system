// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminManageFeedback() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   const axiosAuth = axios.create({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // 🔐 Protect admin route
//   useEffect(() => {
//     if (!token || user?.role !== "admin") {
//       window.location.href = "/login";
//     } else {
//       fetchAllFeedback();
//     }
//   }, []);

//   // Fetch all feedback
//   const fetchAllFeedback = async () => {
//     try {
//       const res = await axiosAuth.get(
//         "http://localhost:5000/api/admin/feedback"
//       );
//       setFeedbacks(res.data.feedbacks);
//     } catch (err) {
//       setError("Failed to load feedback");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete feedback
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) {
//       return;
//     }

//     try {
//       await axiosAuth.delete(
//         `http://localhost:5000/api/admin/feedback/${id}`
//       );
//       setFeedbacks(feedbacks.filter((f) => f._id !== id));
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-semibold">Loading feedback...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">

//         {/* HEADER */}
//         <div className="mb-6 border-b pb-4">
//           <h2 className="text-2xl font-bold">Manage Feedback</h2>
//           <p className="text-gray-600">
//             Admin panel – view & manage user feedback
//           </p>
//         </div>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         {/* TABLE */}
//         {feedbacks.length === 0 ? (
//           <p className="text-gray-500 text-center">No feedback available</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border text-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3 border">User</th>
//                   <th className="p-3 border">Email</th>
//                   <th className="p-3 border">Rating</th>
//                   <th className="p-3 border">Comment</th>
//                   <th className="p-3 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {feedbacks.map((fb) => (
//                   <tr key={fb._id} className="hover:bg-gray-50">
//                     <td className="p-3 border">
//                       {fb.user?.firstName} {fb.user?.lastName}
//                     </td>
//                     <td className="p-3 border">{fb.user?.email}</td>
//                     <td className="p-3 border text-center">
//                       ⭐ {fb.rating}
//                     </td>
//                     <td className="p-3 border">{fb.comment}</td>
//                     <td className="p-3 border text-center">
//                       <button
//                         onClick={() => handleDelete(fb._id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


///////////////////////////////////////////////////////



import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminManageFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");
  const admin = JSON.parse(localStorage.getItem("admin"));

  const axiosAdmin = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      fetchFeedback();
    }
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axiosAdmin.get(
        "http://localhost:5000/api/admin/feedback"
      );
      setFeedbacks(res.data.feedbacks);
    } catch (err) {
      setError("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;

    await axiosAdmin.delete(
      `http://localhost:5000/api/admin/feedback/${id}`
    );

    setFeedbacks(feedbacks.filter((f) => f._id !== id));
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* ADMIN HEADER */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Admin Feedback Management</h2>
          <p className="text-gray-600">
            Logged in as {admin?.name} ({admin?.role})
          </p>
        </div>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Comment</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb._id}>
                <td className="border p-2">
                  {fb.user?.firstName} {fb.user?.lastName}
                </td>
                <td className="border p-2">{fb.user?.email}</td>
                <td className="border p-2 text-center">⭐ {fb.rating}</td>
                <td className="border p-2">{fb.comment}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

