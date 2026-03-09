


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Feedback() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [rating, setRating] = useState("");
//   const [comment, setComment] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // 🔹 USER INFO
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");

//   const axiosAuth = axios.create({
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // Fetch my feedback
//   const fetchFeedback = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axiosAuth.get(
//         "http://localhost:5000/api/feedback/my"
//       );
//       setFeedbacks(res.data.feedbacks);
//       setError("");
//     } catch (err) {
//       setError("Unable to fetch feedback");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       window.location.href = "/login";
//     } else {
//       fetchFeedback();
//     }
//   }, []);

//   // Add / Update feedback
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       if (editId) {
//         await axiosAuth.put(
//           `http://localhost:5000/api/feedback/${editId}`,
//           { rating, comment }
//         );
//         setSuccess("Feedback updated successfully!");
//       } else {
//         await axiosAuth.post("http://localhost:5000/api/feedback", {
//           rating,
//           comment,
//         });
//         setSuccess("Feedback submitted successfully!");
//       }

//       setRating("");
//       setComment("");
//       setEditId(null);
//       fetchFeedback();
//     } catch (err) {
//       setError("An error occurred. Please try again");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    
//     try {
//       await axiosAuth.delete(
//         `http://localhost:5000/api/feedback/${id}`
//       );
//       setSuccess("Feedback deleted successfully!");
//       fetchFeedback();
//     } catch (err) {
//       setError("Unable to delete");
//     }
//   };

//   const handleEdit = (fb) => {
//     setEditId(fb._id);
//     setRating(fb.rating);
//     setComment(fb.comment);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setRating("");
//     setComment("");
//   };

//   const getRatingEmoji = (rating) => {
//     if (rating >= 4.5) return "🏆";
//     if (rating >= 4) return "⭐";
//     if (rating >= 3) return "👍";
//     if (rating >= 2) return "😐";
//     return "👎";
//   };

//   const getRatingColor = (rating) => {
//     if (rating >= 4) return "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100";
//     if (rating >= 3) return "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100";
//     if (rating >= 2) return "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100";
//     return "bg-gradient-to-r from-red-50 to-pink-50 border border-red-100";
//   };

//   const getRatingText = (rating) => {
//     if (rating >= 4.5) return "Excellent";
//     if (rating >= 4) return "Very Good";
//     if (rating >= 3) return "Good";
//     if (rating >= 2) return "Average";
//     return "Needs Improvement";
//   };

//   const getRatingTextColor = (rating) => {
//     if (rating >= 4) return "text-green-600 bg-green-50";
//     if (rating >= 3) return "text-blue-600 bg-blue-50";
//     if (rating >= 2) return "text-yellow-600 bg-yellow-50";
//     return "text-red-600 bg-red-50";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-6 md:p-8 text-white shadow-lg">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold mb-2">
//                   👋 Welcome back, {user?.firstName} {user?.lastName}
//                 </h1>
//                 <p className="text-blue-100 opacity-90">{user?.email}</p>
//               </div>
//               <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-inner">
//                 <div className="flex items-center space-x-4">
//                   <div className="text-center">
//                     <p className="text-sm opacity-80">Your Feedback</p>
//                     <p className="text-3xl font-bold">{feedbacks.length}</p>
//                   </div>
//                   <div className="h-12 w-px bg-white/30"></div>
//                   <div className="text-center">
//                     <p className="text-sm opacity-80">Average Rating</p>
//                     <p className="text-3xl font-bold">
//                       {feedbacks.length > 0 
//                         ? (feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length).toFixed(1)
//                         : "0.0"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column - Feedback Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
              
//               {/* Form Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {editId ? "✏️ Edit Feedback" : "💬 Share Your Thoughts"}
//                 </h2>
//                 {editId && (
//                   <button
//                     onClick={handleCancelEdit}
//                     className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
//                   >
//                     <span className="mr-1">×</span> Cancel Edit
//                   </button>
//                 )}
//               </div>

//               {/* Messages */}
//               {success && (
//                 <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-pulse">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-green-600 text-lg">✓</span>
//                     </div>
//                     <p className="text-green-800 font-medium">{success}</p>
//                   </div>
//                 </div>
//               )}

//               {error && (
//                 <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
//                       <span className="text-red-600 text-lg">!</span>
//                     </div>
//                     <p className="text-red-800 font-medium">{error}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Feedback Form */}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Rating Selection */}
//                 <div>
//                   <label className="block text-gray-700 mb-3 font-semibold">
//                     How would you rate your experience?
//                   </label>
//                   <div className="flex items-center justify-between mb-4">
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <button
//                         type="button"
//                         key={num}
//                         onClick={() => setRating(num.toString())}
//                         className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 transform hover:scale-105 ${
//                           rating === num.toString()
//                             ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110"
//                             : "bg-gray-50 text-gray-600 hover:bg-gray-100"
//                         }`}
//                       >
//                         <span className="text-2xl font-bold">{num}</span>
//                         <span className="text-xs mt-1">
//                           {num === 1 ? "Poor" : num === 5 ? "Excellent" : ""}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
                  
//                   <div className="relative pt-1">
//                     <input
//                       type="range"
//                       min="1"
//                       max="5"
//                       step="0.5"
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
//                       value={rating}
//                       onChange={(e) => setRating(e.target.value)}
//                       required
//                     />
//                     <div className="flex justify-between text-xs text-gray-500 mt-2">
//                       <span>1 - Poor</span>
//                       <span>3 - Good</span>
//                       <span>5 - Excellent</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Comment Input */}
//                 <div>
//                   <label className="block text-gray-700 mb-3 font-semibold">
//                     Your Feedback
//                   </label>
//                   <textarea
//                     placeholder="What did you like? What could be improved? Your detailed feedback helps us grow..."
//                     className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-gray-50 hover:bg-white"
//                     rows="5"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     required
//                   />
//                   <div className="flex justify-between items-center mt-2">
//                     <p className="text-xs text-gray-500">
//                       Your honest opinion matters to us
//                     </p>
//                     <div className="text-xs text-gray-500">
//                       {comment.length}/500 characters
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group"
//                 >
//                   {editId ? (
//                     <>
//                       <span className="mr-2 group-hover:rotate-180 transition-transform duration-300">🔄</span>
//                       Update Your Feedback
//                     </>
//                   ) : (
//                     <>
//                       <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">🚀</span>
//                       Submit Feedback
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>

//             {/* Feedback History */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-gray-800 flex items-center">
//                   <span className="mr-2">📋</span> Your Feedback History
//                 </h2>
//                 <div className="text-sm text-gray-500">
//                   {feedbacks.length} {feedbacks.length === 1 ? 'entry' : 'entries'}
//                 </div>
//               </div>

//               {isLoading ? (
//                 <div className="text-center py-12">
//                   <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//                   <p className="mt-4 text-gray-600">Loading your feedback...</p>
//                 </div>
//               ) : feedbacks.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="text-5xl mb-4 opacity-20">💭</div>
//                   <h3 className="text-lg font-medium text-gray-700 mb-2">No feedback yet</h3>
//                   <p className="text-gray-500">Be the first to share your thoughts!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {feedbacks.map((fb, index) => (
//                     <div
//                       key={fb._id}
//                       className={`${getRatingColor(fb.rating)} rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:scale-[1.01]`}
//                     >
//                       <div className="flex flex-col md:flex-row md:items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-start mb-3">
//                             <div className="flex-shrink-0 mr-4">
//                               <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
//                                 <span className="text-2xl">{getRatingEmoji(fb.rating)}</span>
//                               </div>
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex flex-wrap items-center gap-2 mb-2">
//                                 <div className="flex">
//                                   {[1, 2, 3, 4, 5].map((star) => (
//                                     <span
//                                       key={star}
//                                       className={`text-xl ${star <= fb.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                                     >
//                                       ★
//                                     </span>
//                                   ))}
//                                 </div>
//                                 <span className="text-lg font-bold text-gray-800">
//                                   {fb.rating}/5
//                                 </span>
//                                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingTextColor(fb.rating)}`}>
//                                   {getRatingText(fb.rating)}
//                                 </span>
//                               </div>
//                               <p className="text-gray-700 leading-relaxed">
//                                 {fb.comment}
//                               </p>
//                               <div className="flex items-center mt-3 text-sm text-gray-500">
//                                 <span className="mr-3">📅</span>
//                                 {new Date(fb.createdAt).toLocaleDateString('en-US', {
//                                   weekday: 'short',
//                                   year: 'numeric',
//                                   month: 'short',
//                                   day: 'numeric',
//                                   hour: '2-digit',
//                                   minute: '2-digit'
//                                 })}
//                                 {fb.updatedAt !== fb.createdAt && (
//                                   <span className="ml-3 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                                     Edited
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex space-x-2 mt-4 md:mt-0">
//                           <button
//                             onClick={() => handleEdit(fb)}
//                             className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center border border-blue-100 shadow-sm hover:shadow"
//                           >
//                             <span className="mr-2">✏️</span> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(fb._id)}
//                             className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center border border-red-100 shadow-sm hover:shadow"
//                           >
//                             <span className="mr-2">🗑️</span> Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Statistics & Tips */}
//           <div className="lg:col-span-1">
//             <div className="space-y-6">
//               {/* Statistics Card */}
//               <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-6 shadow-xl">
//                 <h3 className="text-lg font-bold mb-4 flex items-center">
//                   <span className="mr-2">📊</span> Your Feedback Stats
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center pb-3 border-b border-white/10">
//                     <span className="text-gray-300">Total Submissions</span>
//                     <span className="text-xl font-bold">{feedbacks.length}</span>
//                   </div>
//                   <div className="flex justify-between items-center pb-3 border-b border-white/10">
//                     <span className="text-gray-300">Average Rating</span>
//                     <span className="text-xl font-bold">
//                       {feedbacks.length > 0 
//                         ? (feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length).toFixed(1)
//                         : "0.0"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-300">Highest Rating</span>
//                     <span className="text-xl font-bold">
//                       {feedbacks.length > 0 
//                         ? Math.max(...feedbacks.map(fb => fb.rating))
//                         : "0"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Tips Card */}
//               <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
//                 <h3 className="text-lg font-bold mb-4 flex items-center text-gray-800">
//                   <span className="mr-2">💡</span> Tips for Great Feedback
//                 </h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm mr-3">1</span>
//                     <span className="text-gray-600">Be specific about what you liked or didn't like</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
//                     <span className="text-gray-600">Suggest improvements when giving lower ratings</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm mr-3">3</span>
//                     <span className="text-gray-600">Keep it constructive and respectful</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">4</span>
//                     <span className="text-gray-600">Update your feedback as your experience changes</span>
//                   </li>
//                 </ul>
//               </div>

//               {/* Quick Actions Card */}
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl border border-blue-100">
//                 <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Actions</h3>
//                 <div className="space-y-3">
//                   <button
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center border border-gray-200"
//                   >
//                     <span className="mr-2">⬆️</span> Back to Top
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditId(null);
//                       setRating("");
//                       setComment("");
//                     }}
//                     className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center border border-blue-200"
//                   >
//                     <span className="mr-2">🆕</span> Write New Feedback
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Star, 
  X, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Hotel, 
  MapPin,
  CheckCircle,
  AlertCircle,
  Edit3,
  Trash2,
  MessageSquare
} from "lucide-react";

export default function Feedback({ booking, onClose, onFeedbackSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [existingFeedback, setExistingFeedback] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(null);

  // Get user token from localStorage
  const token = localStorage.getItem("token");

  // Fetch user profile and hotel details on component mount
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
    if (booking && booking.hotelName) {
      fetchHotelDetails(booking.hotelName);
    }
    checkExistingFeedback();
  }, [booking, token]);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // Fetch hotel details by name
  const fetchHotelDetails = async (hotelName) => {
    try {
      // First get all hotels
      const response = await axios.get("http://localhost:5000/api/hotels");
      
      // Find hotel by name (case insensitive)
      const hotel = response.data.find(h => 
        h.name?.toLowerCase() === hotelName?.toLowerCase() ||
        h.hotelName?.toLowerCase() === hotelName?.toLowerCase()
      );
      
      if (hotel) {
        setHotelDetails(hotel);
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err);
    }
  };

  // Check if user already gave feedback for this booking
  const checkExistingFeedback = async () => {
    if (!token || !booking) return;

    try {
      const response = await axios.get("http://localhost:5000/api/feedback/my", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        // Look for feedback that matches this booking
        // In production, you should add bookingId to feedback model
        const matchingFeedback = response.data.feedbacks.find(fb => 
          fb.comment?.toLowerCase().includes(booking.roomName?.toLowerCase()) ||
          fb.comment?.toLowerCase().includes(booking.hotelName?.toLowerCase())
        );

        if (matchingFeedback) {
          setExistingFeedback(matchingFeedback);
          setRating(matchingFeedback.rating);
          setComment(matchingFeedback.comment);
        }
      }
    } catch (err) {
      console.error("Error checking existing feedback:", err);
    }
  };

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    if (!token) {
      setError("You must be logged in to submit feedback");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Enhance comment with booking details for better tracking
      const enhancedComment = `[${booking.hotelName} - ${booking.roomName}]\n${comment}`;

      if (existingFeedback) {
        // Update existing feedback
        const response = await axios.put(
          `http://localhost:5000/api/feedback/${existingFeedback._id}`,
          { 
            rating, 
            comment: enhancedComment 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setSuccess("Feedback updated successfully! Thank you for your review.");
          setExistingFeedback(response.data.feedback);
          
          // Save to localStorage as backup
          localStorage.setItem(`feedback_${booking._id}`, JSON.stringify({
            ...response.data.feedback,
            bookingId: booking._id
          }));
        }
      } else {
        // Create new feedback
        const response = await axios.post(
          "http://localhost:5000/api/feedback",
          { 
            rating, 
            comment: enhancedComment 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setSuccess("Thank you for your valuable feedback! Your review helps us improve.");
          setExistingFeedback(response.data.feedback);
          
          // Save to localStorage as backup
          localStorage.setItem(`feedback_${booking._id}`, JSON.stringify({
            ...response.data.feedback,
            bookingId: booking._id
          }));
        }
      }

      // Notify parent component
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }

      // Auto close after 2 seconds on success
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);

    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(err.response?.data?.message || "Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete feedback
  const handleDelete = async () => {
    if (!existingFeedback || !token) return;
    
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/feedback/${existingFeedback._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess("Feedback deleted successfully");
        setExistingFeedback(null);
        setRating(0);
        setComment("");
        setShowDeleteConfirm(false);
        
        // Remove from localStorage
        localStorage.removeItem(`feedback_${booking._id}`);
        
        // Notify parent
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted();
        }

        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
      setError(err.response?.data?.message || "Failed to delete feedback");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {existingFeedback ? "Update Your Review" : "Share Your Experience"}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Your feedback helps us serve you better
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          
          {/* User Info Section */}
          {user && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Reviewer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700">{user.name || "Not provided"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotel & Room Details */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Hotel className="w-5 h-5 mr-2 text-blue-600" />
              Booking Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <Hotel className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Hotel Name</p>
                    <p className="font-medium text-gray-800">{booking?.hotelName}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Room</p>
                    <p className="font-medium text-gray-800">{booking?.roomName}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking?.roomType} Type</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Stay Period</p>
                    <p className="text-sm text-gray-700">
                      {formatDate(booking?.checkIn)} - {formatDate(booking?.checkOut)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Booking Status</p>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      booking?.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking?.isPaid ? 'Completed & Paid' : 'Pending Payment'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Additional Info */}
            {hotelDetails && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">📍 Location:</span> {hotelDetails.location || "Not specified"}
                </p>
                {hotelDetails.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">📝 About:</span> {hotelDetails.description.substring(0, 100)}...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{success}</p>
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmit}>
            {/* Rating Stars */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transform hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-sm font-medium text-gray-600">
                  {rating > 0 ? `${rating} out of 5` : 'Select rating'}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Tell us about your experience... What did you like? What could be improved?"
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                {comment.length} characters • Minimum 10 characters recommended
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {existingFeedback && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium flex items-center justify-center"
                  disabled={loading}
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete
                </button>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all font-medium flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {existingFeedback ? 'Updating...' : 'Submitting...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {existingFeedback ? 'Update Review' : 'Submit Review'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Guidelines */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
              <Edit3 className="w-4 h-4 mr-1" />
              Review Guidelines
            </h4>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Be honest and constructive in your feedback</li>
              <li>Share specific details about your experience</li>
              <li>Mention both positives and areas for improvement</li>
              <li>Avoid using offensive language</li>
              <li>Your review helps other travelers make informed decisions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Review?</h3>
              <p className="text-gray-600">
                Are you sure you want to delete your review? This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}