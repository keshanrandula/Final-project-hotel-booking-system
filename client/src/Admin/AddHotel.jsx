// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // export default function AddHotel() {
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     description: "",
// // //     location: "",
// // //     pricePerNight: "",
// // //     amenities: "",
// // //   });
// // //   const [images, setImages] = useState([]);

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleImageChange = (e) => {
// // //     setImages(e.target.files);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const formData = new FormData();
// // //       Object.keys(form).forEach((key) => formData.append(key, form[key]));
// // //       for (let i = 0; i < images.length; i++) {
// // //         formData.append("images", images[i]);
// // //       }

// // //       await axios.post("http://localhost:5000/api/hotels/add", formData, {
// // //         headers: { "Content-Type": "multipart/form-data" },
// // //       });

// // //       alert("Hotel added successfully!");
// // //       setForm({
// // //         name: "",
// // //         description: "",
// // //         location: "",
// // //         pricePerNight: "",
// // //         amenities: "",
// // //       });
// // //       setImages([]);
// // //     } catch (error) {
// // //       alert(error.response?.data?.message || "Error adding hotel");
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex justify-center min-h-screen bg-gray-100">
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
// // //       >
// // //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// // //           Add Hotel
// // //         </h2>

// // //         {["name", "description", "location", "pricePerNight", "amenities"].map(
// // //           (field) => (
// // //             <div className="mb-4" key={field}>
// // //               <label className="block text-gray-700 capitalize mb-1">
// // //                 {field}
// // //               </label>
// // //               <input
// // //                 name={field}
// // //                 type="text"
// // //                 value={form[field]}
// // //                 onChange={handleChange}
// // //                 placeholder={`Enter ${field}`}
// // //                 required
// // //                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// // //               />
// // //             </div>
// // //           )
// // //         )}

// // //         <div className="mb-4">
// // //           <label className="block text-gray-700 mb-1">Images</label>
// // //           <input
// // //             type="file"
// // //             multiple
// // //             onChange={handleImageChange}
// // //             className="w-full px-4 py-2 border rounded-lg"
// // //           />
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
// // //         >
// // //           Add Hotel
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // /////////////


// // import React, { useState } from "react";
// // import axios from "axios";

// // export default function AddHotel() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     description: "",
// //     location: "",
// //     amenities: "",
// //   });
// //   const [images, setImages] = useState([]);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     setImages(e.target.files);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       Object.keys(form).forEach((key) => formData.append(key, form[key]));
// //       for (let i = 0; i < images.length; i++) {
// //         formData.append("images", images[i]);
// //       }

// //       await axios.post("http://localhost:5000/api/hotels/add", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       alert("Hotel added successfully!");
// //       setForm({
// //         name: "",
// //         description: "",
// //         location: "",
// //         amenities: "",
// //       });
// //       setImages([]);
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Error adding hotel");
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
// //       >
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Add Hotel
// //         </h2>

// //         {["name", "description", "location", "amenities"].map((field) => (
// //           <div className="mb-4" key={field}>
// //             <label className="block text-gray-700 capitalize mb-1">
// //               {field}
// //             </label>
// //             <input
// //               name={field}
// //               type="text"
// //               value={form[field]}
// //               onChange={handleChange}
// //               placeholder={`Enter ${field}`}
// //               required
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// //             />
// //           </div>
// //         ))}

// //         <div className="mb-4">
// //           <label className="block text-gray-700 mb-1">Images</label>
// //           <input
// //             type="file"
// //             multiple
// //             onChange={handleImageChange}
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
// //         >
// //           Add Hotel
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // //////////////
// // AddHotel.jsx
// import React, { useState } from "react";
// import axios from "axios";

// export default function AddHotel() {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     location: "",
//     amenities: "",
//     email: "",
//     password: "",
//   });
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(form).forEach((key) => formData.append(key, form[key]));
//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }

//       await axios.post("http://localhost:5000/api/hotels/add", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Hotel added successfully!");
//       setForm({
//         name: "",
//         description: "",
//         location: "",
//         amenities: "",
//         email: "",
//         password: "",
//       });
//       setImages([]);
//     } catch (error) {
//       alert(error.response?.data?.message || "Error adding hotel");
//     }
//   };

//   return (
//     <div className="flex justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Add Hotel
//         </h2>

//         {["name", "description", "location", "amenities", "email", "password"].map((field) => (
//           <div className="mb-4" key={field}>
//             <label className="block text-gray-700 capitalize mb-1">
//               {field}
//             </label>
//             <input
//               name={field}
//               type={field === "password" ? "password" : "text"}
//               value={form[field]}
//               onChange={handleChange}
//               placeholder={`Enter ${field}`}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//         ))}

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImageChange}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
//         >
//           Add Hotel
//         </button>
//       </form>
//     </div>
//   );
// }

// /////////////////


////////////////////////new add previous one is work//
// // AddHotel.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { 
//   Building2, 
//   MapPin, 
//   FileText, 
//   Wifi, 
//   Mail, 
//   Lock,
//   Upload,
//   X,
//   Hotel,
//   Image as ImageIcon,
//   CheckCircle,
//   AlertCircle,
//   Eye,
//   EyeOff
// } from "lucide-react";

// export default function AddHotel() {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     location: "",
//     amenities: "",
//     email: "",
//     password: "",
//   });
  
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Check max files (5)
//     if (files.length > 5) {
//       setError("You can only upload up to 5 images");
//       return;
//     }
    
//     // Check each file size (max 5MB)
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     for (let file of files) {
//       if (file.size > maxSize) {
//         setError(`File "${file.name}" is too large. Max size is 5MB`);
//         return;
//       }
//     }
    
//     // Check file types
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     for (let file of files) {
//       if (!validTypes.includes(file.type)) {
//         setError(`File "${file.name}" is not a valid image. Please upload JPG, PNG, or WEBP`);
//         return;
//       }
//     }
    
//     // Clean up old previews
//     imagePreviews.forEach(url => URL.revokeObjectURL(url));
    
//     setImages(files);
    
//     // Create preview URLs
//     const previews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(previews);
//     setError("");
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     const newPreviews = [...imagePreviews];
    
//     // Clean up the URL object
//     URL.revokeObjectURL(newPreviews[index]);
    
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setImages(newImages);
//     setImagePreviews(newPreviews);
//   };

//   const validateForm = () => {
//     if (!form.name || !form.description || !form.location || !form.email || !form.password) {
//       setError("Please fill in all required fields");
//       return false;
//     }
    
//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters long!");
//       return false;
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
//     setError("");
//     setSuccess("");
//     setUploadProgress(0);
    
//     try {
//       const formData = new FormData();
      
//       // Append form fields
//       Object.keys(form).forEach((key) => {
//         formData.append(key, form[key]);
//       });
      
//       // Append images
//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }

//       console.log("Sending hotel data...");
//       console.log("- Name:", form.name);
//       console.log("- Email:", form.email);
//       console.log("- Images:", images.length);

//       const response = await axios.post(
//         "http://localhost:5000/api/hotels/add",
//         formData, 
//         {
//           headers: { 
//             "Content-Type": "multipart/form-data" 
//           },
//           timeout: 30000,
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       console.log("✅ Hotel added successfully!", response.data);
      
//       setSuccess("✅ Hotel added successfully!");
      
//       // Reset form
//       setForm({
//         name: "",
//         description: "",
//         location: "",
//         amenities: "",
//         email: "",
//         password: "",
//       });
      
//       // Clean up previews
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       setImages([]);
//       setImagePreviews([]);
//       setUploadProgress(0);
      
//       // Auto hide success message after 3 seconds
//       setTimeout(() => setSuccess(""), 3000);
      
//     } catch (error) {
//       console.error("❌ Error adding hotel:", error);
      
//       if (error.response) {
//         setError(error.response.data?.message || `Server error: ${error.response.status}`);
//       } else if (error.request) {
//         setError("Cannot connect to server. Make sure backend is running on http://localhost:5000");
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
//             <Hotel className="w-10 h-10 text-indigo-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Hotel</h1>
//           <p className="text-gray-600">Fill in the details to register a new hotel</p>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Top Gradient Bar */}
//           <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
//           {/* Status Messages */}
//           {error && (
//             <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-red-700 font-medium">Error</p>
//                 <p className="text-red-600 text-sm mt-1">{error}</p>
//               </div>
//             </div>
//           )}
          
//           {success && (
//             <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
//               <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-green-700 font-medium">Success</p>
//                 <p className="text-green-600 text-sm mt-1">{success}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="p-6">
//             {/* Form Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Hotel Name */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Building2 className="w-4 h-4 inline mr-1" />
//                   Hotel Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="name"
//                   type="text"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Enter hotel name"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//                 />
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <FileText className="w-4 h-4 inline mr-1" />
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   placeholder="Describe the hotel, its unique features, and services"
//                   required
//                   rows="3"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <MapPin className="w-4 h-4 inline mr-1" />
//                   Location <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="location"
//                   type="text"
//                   value={form.location}
//                   onChange={handleChange}
//                   placeholder="Full address"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//                 />
//               </div>

//               {/* Amenities */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Wifi className="w-4 h-4 inline mr-1" />
//                   Amenities
//                 </label>
//                 <input
//                   name="amenities"
//                   type="text"
//                   value={form.amenities}
//                   onChange={handleChange}
//                   placeholder="WiFi, Pool, Parking (comma separated)"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Mail className="w-4 h-4 inline mr-1" />
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="hotel@example.com"
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   <Lock className="w-4 h-4 inline mr-1" />
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Min. 6 characters"
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     {showPassword ? 
//                       <EyeOff className="w-5 h-5 text-gray-400" /> : 
//                       <Eye className="w-5 h-5 text-gray-400" />
//                     }
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Image Upload Section */}
//             <div className="mt-8">
//               <label className="block text-sm font-semibold text-gray-700 mb-4">
//                 <ImageIcon className="w-4 h-4 inline mr-1" />
//                 Hotel Images
//               </label>
              
//               {/* Upload Info */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                 <p className="text-sm text-blue-700">
//                   <span className="font-semibold">📸 Image Requirements:</span><br />
//                   • Maximum 5 images<br />
//                   • Each image max 5MB<br />
//                   • Formats: JPG, PNG, WEBP
//                 </p>
//               </div>
              
//               {/* Image Preview Grid */}
//               {imagePreviews.length > 0 && (
//                 <div className="mb-4">
//                   <p className="text-sm font-semibold text-gray-700 mb-2">
//                     Selected Images ({imagePreviews.length}/5)
//                   </p>
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     {imagePreviews.map((preview, index) => (
//                       <div key={index} className="relative group">
//                         <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
//                           <img
//                             src={preview}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Upload Button */}
//               <div className="flex items-center justify-center w-full">
//                 <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition duration-150 ease-in-out ${
//                   images.length >= 5 
//                     ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
//                     : 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100'
//                 }`}>
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <Upload className={`w-8 h-8 mb-2 ${
//                       images.length >= 5 ? 'text-gray-400' : 'text-indigo-500'
//                     }`} />
//                     <p className="mb-1 text-sm text-gray-500">
//                       <span className="font-semibold">
//                         {images.length >= 5 ? 'Maximum images reached' : 'Click to upload images'}
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {images.length >= 5 
//                         ? 'Remove some images to upload more' 
//                         : 'PNG, JPG, JPEG, WEBP (Max 5MB)'}
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                     onChange={handleImageChange}
//                     className="hidden"
//                     disabled={images.length >= 5}
//                   />
//                 </label>
//               </div>
              
//               {/* Upload Progress Bar */}
//               {loading && uploadProgress > 0 && (
//                 <div className="mt-4">
//                   <div className="flex justify-between text-sm text-gray-600 mb-1">
//                     <span>Uploading...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${uploadProgress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Adding Hotel... {uploadProgress}%
//                   </div>
//                 ) : (
//                   'Add Hotel'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Footer Note */}
//         <p className="text-center text-sm text-gray-500 mt-4">
//           Fields marked with <span className="text-red-500">*</span> are required
//         </p>
//       </div>
//     </div>
//   );
// }




//////////////////////////////////////////////
// AddHotel.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Building2,
  MapPin,
  FileText,
  Wifi,
  Mail,
  Lock,
  Upload,
  X,
  Hotel,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AddHotel() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    amenities: "",
    email: "",
    password: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check max files (5)
    if (files.length > 5) {
      const msg = "You can only upload up to 5 images";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
      return;
    }

    // Check each file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let file of files) {
      if (file.size > maxSize) {
        const msg = `File "${file.name}" is too large. Max size is 5MB`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000 });
        return;
      }
    }

    // Check file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    for (let file of files) {
      if (!validTypes.includes(file.type)) {
        const msg = `File "${file.name}" is not a valid image. Please upload JPG, PNG, or WEBP`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000 });
        return;
      }
    }

    // Clean up old previews
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setError("");
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    // Clean up the URL object
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.description ||
      !form.location ||
      !form.email ||
      !form.password
    ) {
      const msg = "Please fill in all required fields";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
      return false;
    }

    if (form.password.length < 6) {
      const msg = "Password must be at least 6 characters long!";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      const msg = "Please enter a valid email address";
      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setUploadProgress(0);

    try {
      const formData = new FormData();

      // Append form fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // Append images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      console.log("Sending hotel data...");
      console.log("- Name:", form.name);
      console.log("- Email:", form.email);
      console.log("- Images:", images.length);

      const response = await axios.post(
        "http://localhost:5000/api/hotels/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log("✅ Hotel added successfully!", response.data);

      const successMsg = "✅ Hotel added successfully!";
      setSuccess(successMsg);
      toast.success(successMsg, { position: "top-right", autoClose: 3000 });

      // Reset form
      setForm({
        name: "",
        description: "",
        location: "",
        amenities: "",
        email: "",
        password: "",
      });

      // Clean up previews
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
      setUploadProgress(0);

      // Auto hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("❌ Error adding hotel:", error);

      let msg = "";
      if (error.response) {
        msg =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        msg =
          "Cannot connect to server. Make sure backend is running on http://localhost:5000";
      } else {
        msg = `Error: ${error.message}`;
      }

      setError(msg);
      toast.error(msg, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <ToastContainer />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
            <Hotel className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
             ParadiseLankaStay
          </h1>
          <p className="text-gray-600">
            Fill in the details to register a new hotel
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          {/* Status Messages */}
          {error && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 font-medium">Error</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 font-medium">Success</p>
                <p className="text-green-600 text-sm mt-1">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hotel Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Hotel Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter hotel name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the hotel, its unique features, and services"
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Full address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Wifi className="w-4 h-4 inline mr-1" />
                  Amenities
                </label>
                <input
                  name="amenities"
                  type="text"
                  value={form.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, Pool, Parking (comma separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hotel@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Hotel Images
              </label>

              {/* Upload Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">📸 Image Requirements:</span>
                  <br />
                  • Maximum 5 images
                  <br />
                  • Each image max 5MB
                  <br />
                  • Formats: JPG, PNG, WEBP
                </p>
              </div>

              {/* Image Preview Grid */}
              {imagePreviews.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Images ({imagePreviews.length}/5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex items-center justify-center w-full">
                <label
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition duration-150 ease-in-out ${
                    images.length >= 5
                      ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                      : "border-blue-300 bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className={`w-8 h-8 mb-2 ${
                        images.length >= 5 ? "text-gray-400" : "text-blue-500"
                      }`}
                    />
                    <p className="mb-1 text-sm text-gray-500">
                      <span className="font-semibold">
                        {images.length >= 5
                          ? "Maximum images reached"
                          : "Click to upload images"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {images.length >= 5
                        ? "Remove some images to upload more"
                        : "PNG, JPG, JPEG, WEBP (Max 5MB)"}
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={images.length >= 5}
                  />
                </label>
              </div>

              {/* Upload Progress Bar */}
              {loading && uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Hotel... {uploadProgress}%
                  </div>
                ) : (
                  "Add Hotel"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
}