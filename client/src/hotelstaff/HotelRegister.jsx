// // // // HotelRegister.jsx
// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { 
// // //   Building2, 
// // //   MapPin, 
// // //   FileText, 
// // //   Wifi, 
// // //   Mail, 
// // //   Lock, 
// // //   X,
// // //   Upload,
// // //   UserCircle,
// // //   Phone,
// // //   Hotel,
// // //   Key,
// // //   Eye,
// // //   EyeOff,
// // //   AlertCircle
// // // } from "lucide-react";

// // // export default function HotelRegister() {
// // //   const [form, setForm] = useState({
// // //     // Hotel Details
// // //     name: "",
// // //     description: "",
// // //     location: "",
// // //     amenities: "",
    
// // //     // Login Details
// // //     email: "",
// // //     password: "",
// // //     confirmPassword: "",
    
// // //     // New Fields (Optional)
// // //     ownerName: "",
// // //     ownerPhone: "",
// // //     hotelPhone: "",
// // //   });
  
// // //   const [images, setImages] = useState([]);
// // //   const [imagePreviews, setImagePreviews] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [error, setError] = useState("");

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //     setError("");
// // //   };

// // //   const handleImageChange = (e) => {
// // //     const files = Array.from(e.target.files);
// // //     if (files.length > 5) {
// // //       setError("You can only upload up to 5 images");
// // //       return;
// // //     }
    
// // //     // Clean up old previews
// // //     imagePreviews.forEach(url => URL.revokeObjectURL(url));
    
// // //     setImages(files);
// // //     const previews = files.map(file => URL.createObjectURL(file));
// // //     setImagePreviews(previews);
// // //   };

// // //   const removeImage = (index) => {
// // //     const newImages = [...images];
// // //     const newPreviews = [...imagePreviews];
    
// // //     URL.revokeObjectURL(newPreviews[index]);
    
// // //     newImages.splice(index, 1);
// // //     newPreviews.splice(index, 1);
    
// // //     setImages(newImages);
// // //     setImagePreviews(newPreviews);
// // //   };

// // //   const validateForm = () => {
// // //     // Required fields
// // //     if (!form.name || !form.description || !form.location || !form.email || !form.password) {
// // //       setError("Please fill in all required fields");
// // //       return false;
// // //     }
    
// // //     if (form.password.length < 6) {
// // //       setError("Password must be at least 6 characters long!");
// // //       return false;
// // //     }
    
// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     if (!emailRegex.test(form.email)) {
// // //       setError("Please enter a valid email address");
// // //       return false;
// // //     }
    
// // //     if (form.password !== form.confirmPassword) {
// // //       setError("Passwords do not match!");
// // //       return false;
// // //     }
    
// // //     // Optional phone validation (if provided)
// // //     if (form.ownerPhone) {
// // //       const phoneRegex = /^(?:\+94|0)[1-9][0-9]{8}$/;
// // //       if (!phoneRegex.test(form.ownerPhone.replace(/\s/g, ''))) {
// // //         setError("Please enter a valid Sri Lankan phone number for owner");
// // //         return false;
// // //       }
// // //     }
    
// // //     if (form.hotelPhone) {
// // //       const phoneRegex = /^(?:\+94|0)[1-9][0-9]{8}$/;
// // //       if (!phoneRegex.test(form.hotelPhone.replace(/\s/g, ''))) {
// // //         setError("Please enter a valid Sri Lankan phone number for hotel");
// // //         return false;
// // //       }
// // //     }
    
// // //     return true;
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     if (!validateForm()) {
// // //       return;
// // //     }
    
// // //     setLoading(true);
// // //     setError("");
    
// // //     try {
// // //       const formData = new FormData();
      
// // //       // Required fields
// // //       formData.append("name", form.name);
// // //       formData.append("description", form.description);
// // //       formData.append("location", form.location);
// // //       formData.append("email", form.email);
// // //       formData.append("password", form.password);
// // //       formData.append("amenities", form.amenities);
      
// // //       // Optional fields (only if they have values)
// // //       if (form.ownerName) formData.append("ownerName", form.ownerName);
// // //       if (form.ownerPhone) formData.append("ownerPhone", form.ownerPhone);
// // //       if (form.hotelPhone) formData.append("hotelPhone", form.hotelPhone);
      
// // //       // Images
// // //       for (let i = 0; i < images.length; i++) {
// // //         formData.append("images", images[i]);
// // //       }

// // //       console.log("Sending registration data...");
// // //       console.log("- name:", form.name);
// // //       console.log("- email:", form.email);
// // //       console.log("- ownerName:", form.ownerName || "Not provided");
// // //       console.log("- ownerPhone:", form.ownerPhone || "Not provided");
// // //       console.log("- hotelPhone:", form.hotelPhone || "Not provided");
// // //       console.log("- images:", images.length);

// // //       const response = await axios.post(
// // //         "http://localhost:5000/api/hotels/add",
// // //         formData, 
// // //         {
// // //           headers: { 
// // //             "Content-Type": "multipart/form-data" 
// // //           },
// // //           timeout: 10000,
// // //         }
// // //       );

// // //       console.log("✅ Registration successful!", response.data);
      
// // //       alert("✅ Hotel registration successful! You can now login.");
      
// // //       // Reset form
// // //       setForm({
// // //         name: "",
// // //         description: "",
// // //         location: "",
// // //         amenities: "",
// // //         email: "",
// // //         password: "",
// // //         confirmPassword: "",
// // //         ownerName: "",
// // //         ownerPhone: "",
// // //         hotelPhone: "",
// // //       });
      
// // //       // Clean up previews
// // //       imagePreviews.forEach(url => URL.revokeObjectURL(url));
// // //       setImages([]);
// // //       setImagePreviews([]);
// // //       setCurrentStep(1);
      
// // //     } catch (error) {
// // //       console.error("❌ Registration error:", error);
      
// // //       if (error.code === 'ECONNABORTED') {
// // //         setError("Request timeout. Server is not responding.");
// // //       } else if (error.response) {
// // //         console.error("Server response:", error.response.data);
        
// // //         if (error.response.status === 400) {
// // //           setError(error.response.data?.message || "Bad request. Check your input.");
// // //         } else if (error.response.status === 404) {
// // //           setError("API endpoint not found. Check if the URL is correct.");
// // //         } else if (error.response.status === 500) {
// // //           setError("Server error. Please try again later.");
// // //         } else {
// // //           setError(error.response.data?.message || `Server error: ${error.response.status}`);
// // //         }
// // //       } else if (error.request) {
// // //         setError("Cannot connect to server. Make sure backend is running on http://localhost:5000");
// // //       } else {
// // //         setError(`Error: ${error.message}`);
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const nextStep = () => {
// // //     setError("");
    
// // //     if (currentStep === 1) {
// // //       if (!form.name || !form.description || !form.location) {
// // //         setError("Please fill in all required hotel details");
// // //         return;
// // //       }
// // //     } else if (currentStep === 2) {
// // //       if (!form.email || !form.password || !form.confirmPassword) {
// // //         setError("Please fill in all login details");
// // //         return;
// // //       }
      
// // //       if (form.password !== form.confirmPassword) {
// // //         setError("Passwords do not match!");
// // //         return;
// // //       }
      
// // //       if (form.password.length < 6) {
// // //         setError("Password must be at least 6 characters");
// // //         return;
// // //       }
// // //     }
// // //     setCurrentStep(currentStep + 1);
// // //   };

// // //   const prevStep = () => {
// // //     setError("");
// // //     setCurrentStep(currentStep - 1);
// // //   };

// // //   const getFieldIcon = (field) => {
// // //     switch(field) {
// // //       case 'name': return <Building2 className="w-5 h-5 text-gray-400" />;
// // //       case 'description': return <FileText className="w-5 h-5 text-gray-400" />;
// // //       case 'location': return <MapPin className="w-5 h-5 text-gray-400" />;
// // //       case 'amenities': return <Wifi className="w-5 h-5 text-gray-400" />;
// // //       case 'email': return <Mail className="w-5 h-5 text-gray-400" />;
// // //       case 'password': return <Lock className="w-5 h-5 text-gray-400" />;
// // //       case 'ownerName': return <UserCircle className="w-5 h-5 text-gray-400" />;
// // //       case 'ownerPhone': return <Phone className="w-5 h-5 text-gray-400" />;
// // //       case 'confirmPassword': return <Key className="w-5 h-5 text-gray-400" />;
// // //       case 'hotelPhone': return <Phone className="w-5 h-5 text-gray-400" />;
// // //       default: return null;
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
// // //       {/* Decorative Header */}
// // //       <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-emerald-400 to-teal-500 transform -skew-y-3"></div>
      
// // //       <div className="relative max-w-4xl mx-auto">
// // //         {/* Header */}
// // //         <div className="text-center mb-10">
// // //           <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4">
// // //             <Hotel className="w-12 h-12 text-emerald-600" />
// // //           </div>
// // //           <h1 className="text-4xl font-bold text-gray-800 mb-2">Hotel Registration</h1>
// // //           <p className="text-gray-600 text-lg">Register your hotel and become a partner with us</p>
// // //         </div>

// // //         {/* Progress Steps */}
// // //         <div className="flex justify-between mb-8 px-4">
// // //           {[1, 2, 3].map((step) => (
// // //             <div key={step} className="flex-1 text-center">
// // //               <div className={`relative`}>
// // //                 <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
// // //                   currentStep >= step 
// // //                     ? 'bg-emerald-500 text-white' 
// // //                     : 'bg-gray-200 text-gray-600'
// // //                 }`}>
// // //                   {step}
// // //                 </div>
// // //                 <div className={`h-1 w-full absolute top-5 -z-10 ${
// // //                   step < 3 ? 'block' : 'hidden'
// // //                 } ${
// // //                   currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'
// // //                 }`}></div>
// // //                 <p className="text-sm mt-2 font-medium text-gray-600">
// // //                   {step === 1 ? 'Hotel Details' : step === 2 ? 'Account Info' : 'Hotel Images'}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Main Form Card */}
// // //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// // //           <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          
// // //           <form onSubmit={handleSubmit} className="p-8">
// // //             {/* Error Display */}
// // //             {error && (
// // //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
// // //                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
// // //                 <div>
// // //                   <p className="text-red-700 font-medium">Registration Error</p>
// // //                   <p className="text-red-600 text-sm mt-1">{error}</p>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 1: Hotel Details */}
// // //             {currentStep === 1 && (
// // //               <div className="space-y-6">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Information</h2>
                
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   {/* Hotel Name */}
// // //                   <div className="md:col-span-2">
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Hotel Name <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('name')}
// // //                       </div>
// // //                       <input
// // //                         name="name"
// // //                         type="text"
// // //                         value={form.name}
// // //                         onChange={handleChange}
// // //                         placeholder="Enter your hotel name"
// // //                         required
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Description */}
// // //                   <div className="md:col-span-2">
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Description <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute top-3 left-0 pl-3 pointer-events-none">
// // //                         {getFieldIcon('description')}
// // //                       </div>
// // //                       <textarea
// // //                         name="description"
// // //                         value={form.description}
// // //                         onChange={handleChange}
// // //                         placeholder="Describe your hotel, its unique features, and services"
// // //                         required
// // //                         rows="4"
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Location */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Location <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('location')}
// // //                       </div>
// // //                       <input
// // //                         name="location"
// // //                         type="text"
// // //                         value={form.location}
// // //                         onChange={handleChange}
// // //                         placeholder="Full address"
// // //                         required
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Amenities */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Amenities
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('amenities')}
// // //                       </div>
// // //                       <input
// // //                         name="amenities"
// // //                         type="text"
// // //                         value={form.amenities}
// // //                         onChange={handleChange}
// // //                         placeholder="WiFi, Parking, Pool (comma separated)"
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Hotel Phone (New) */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Hotel Phone <span className="text-gray-400 text-xs">(Optional)</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('hotelPhone')}
// // //                       </div>
// // //                       <input
// // //                         name="hotelPhone"
// // //                         type="tel"
// // //                         value={form.hotelPhone}
// // //                         onChange={handleChange}
// // //                         placeholder="0771234567"
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 2: Account Information */}
// // //             {currentStep === 2 && (
// // //               <div className="space-y-6">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
                
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   {/* Email */}
// // //                   <div className="md:col-span-2">
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Email Address <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('email')}
// // //                       </div>
// // //                       <input
// // //                         name="email"
// // //                         type="email"
// // //                         value={form.email}
// // //                         onChange={handleChange}
// // //                         placeholder="hotel@example.com"
// // //                         required
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Password */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Password <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('password')}
// // //                       </div>
// // //                       <input
// // //                         name="password"
// // //                         type={showPassword ? "text" : "password"}
// // //                         value={form.password}
// // //                         onChange={handleChange}
// // //                         placeholder="Min. 6 characters"
// // //                         required
// // //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => setShowPassword(!showPassword)}
// // //                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
// // //                       >
// // //                         {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Confirm Password */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Confirm Password <span className="text-red-500">*</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('confirmPassword')}
// // //                       </div>
// // //                       <input
// // //                         name="confirmPassword"
// // //                         type={showConfirmPassword ? "text" : "password"}
// // //                         value={form.confirmPassword}
// // //                         onChange={handleChange}
// // //                         placeholder="Re-enter password"
// // //                         required
// // //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
// // //                       >
// // //                         {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   {/* Owner Name (New) */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Owner Name <span className="text-gray-400 text-xs">(Optional)</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('ownerName')}
// // //                       </div>
// // //                       <input
// // //                         name="ownerName"
// // //                         type="text"
// // //                         value={form.ownerName}
// // //                         onChange={handleChange}
// // //                         placeholder="Full name of owner"
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   {/* Owner Phone (New) */}
// // //                   <div>
// // //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// // //                       Owner Phone <span className="text-gray-400 text-xs">(Optional)</span>
// // //                     </label>
// // //                     <div className="relative">
// // //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                         {getFieldIcon('ownerPhone')}
// // //                       </div>
// // //                       <input
// // //                         name="ownerPhone"
// // //                         type="tel"
// // //                         value={form.ownerPhone}
// // //                         onChange={handleChange}
// // //                         placeholder="0771234567"
// // //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* Step 3: Hotel Images */}
// // //             {currentStep === 3 && (
// // //               <div className="space-y-6">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Images</h2>
                
// // //                 {/* Image Preview Grid */}
// // //                 {imagePreviews.length > 0 && (
// // //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
// // //                     {imagePreviews.map((preview, index) => (
// // //                       <div key={index} className="relative group">
// // //                         <img
// // //                           src={preview}
// // //                           alt={`Preview ${index + 1}`}
// // //                           className="w-full h-32 object-cover rounded-lg shadow-md"
// // //                         />
// // //                         <button
// // //                           type="button"
// // //                           onClick={() => removeImage(index)}
// // //                           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
// // //                         >
// // //                           <X className="w-4 h-4" />
// // //                         </button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}

// // //                 {/* Upload Button */}
// // //                 <div className="flex items-center justify-center w-full">
// // //                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
// // //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
// // //                       <Upload className="w-8 h-8 text-gray-400 mb-2" />
// // //                       <p className="mb-2 text-sm text-gray-500">
// // //                         <span className="font-semibold">Click to upload</span> or drag and drop
// // //                       </p>
// // //                       <p className="text-xs text-gray-500">
// // //                         PNG, JPG, JPEG (Max 5 images)
// // //                       </p>
// // //                     </div>
// // //                     <input
// // //                       type="file"
// // //                       multiple
// // //                       accept="image/*"
// // //                       onChange={handleImageChange}
// // //                       className="hidden"
// // //                     />
// // //                   </label>
// // //                 </div>
                
// // //                 <p className="text-sm text-gray-500 mt-2">
// // //                   * Upload at least one image of your hotel. Good quality images help attract more customers.
// // //                 </p>
// // //               </div>
// // //             )}

// // //             {/* Navigation Buttons */}
// // //             <div className="flex justify-between mt-8">
// // //               {currentStep > 1 && (
// // //                 <button
// // //                   type="button"
// // //                   onClick={prevStep}
// // //                   className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
// // //                 >
// // //                   Previous
// // //                 </button>
// // //               )}
              
// // //               {currentStep < 3 ? (
// // //                 <button
// // //                   type="button"
// // //                   onClick={nextStep}
// // //                   className="ml-auto px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
// // //                 >
// // //                   Next Step
// // //                 </button>
// // //               ) : (
// // //                 <button
// // //                   type="submit"
// // //                   disabled={loading}
// // //                   className="ml-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                 >
// // //                   {loading ? (
// // //                     <div className="flex items-center">
// // //                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                       </svg>
// // //                       Registering...
// // //                     </div>
// // //                   ) : (
// // //                     'Complete Registration'
// // //                   )}
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </form>
// // //         </div>

// // //         {/* Footer */}
// // //         <p className="text-center text-sm text-gray-500 mt-6">
// // //           By registering, you agree to our Terms of Service and Privacy Policy.
// // //           <br />
// // //           <span className="text-xs">Fields marked with <span className="text-red-500">*</span> are required.</span>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // ///////////////////////////////////////////////////////

// // // HotelRegister.jsx
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { 
// //   Building2, 
// //   MapPin, 
// //   FileText, 
// //   Wifi, 
// //   Mail, 
// //   Lock, 
// //   X,
// //   Upload,
// //   UserCircle,
// //   Phone,
// //   Hotel,
// //   Key,
// //   Eye,
// //   EyeOff,
// //   AlertCircle
// // } from "lucide-react";

// // export default function HotelRegister() {
// //   const [form, setForm] = useState({
// //     // Required fields
// //     name: "",
// //     description: "",
// //     location: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
    
// //     // Optional fields
// //     amenities: "",
// //     ownerName: "",
// //     ownerPhone: "",
// //     hotelPhone: "",
// //   });
  
// //   const [images, setImages] = useState([]);
// //   const [imagePreviews, setImagePreviews] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     setError("");
// //   };

// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     if (files.length > 5) {
// //       setError("You can only upload up to 5 images");
// //       return;
// //     }
    
// //     // Clean up old previews
// //     imagePreviews.forEach(url => URL.revokeObjectURL(url));
    
// //     setImages(files);
// //     const previews = files.map(file => URL.createObjectURL(file));
// //     setImagePreviews(previews);
// //   };

// //   const removeImage = (index) => {
// //     const newImages = [...images];
// //     const newPreviews = [...imagePreviews];
    
// //     URL.revokeObjectURL(newPreviews[index]);
    
// //     newImages.splice(index, 1);
// //     newPreviews.splice(index, 1);
    
// //     setImages(newImages);
// //     setImagePreviews(newPreviews);
// //   };

// //   const validateForm = () => {
// //     // Required fields
// //     if (!form.name || !form.description || !form.location || !form.email || !form.password) {
// //       setError("Please fill in all required fields");
// //       return false;
// //     }
    
// //     if (form.password.length < 6) {
// //       setError("Password must be at least 6 characters long!");
// //       return false;
// //     }
    
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(form.email)) {
// //       setError("Please enter a valid email address");
// //       return false;
// //     }
    
// //     if (form.password !== form.confirmPassword) {
// //       setError("Passwords do not match!");
// //       return false;
// //     }
    
// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }
    
// //     setLoading(true);
// //     setError("");
    
// //     try {
// //       const formData = new FormData();
      
// //       // Required fields
// //       formData.append("name", form.name);
// //       formData.append("description", form.description);
// //       formData.append("location", form.location);
// //       formData.append("email", form.email);
// //       formData.append("password", form.password);
      
// //       // Optional fields (send empty string if not provided)
// //       formData.append("amenities", form.amenities || "");
// //       formData.append("ownerName", form.ownerName || "");
// //       formData.append("ownerPhone", form.ownerPhone || "");
// //       formData.append("hotelPhone", form.hotelPhone || "");
      
// //       // Images
// //       for (let i = 0; i < images.length; i++) {
// //         formData.append("images", images[i]);
// //       }

// //       console.log("Sending registration data...");
// //       console.log("- name:", form.name);
// //       console.log("- email:", form.email);
// //       console.log("- ownerName:", form.ownerName || "Not provided");
// //       console.log("- ownerPhone:", form.ownerPhone || "Not provided");
// //       console.log("- hotelPhone:", form.hotelPhone || "Not provided");
// //       console.log("- images:", images.length);

// //       const response = await axios.post(
// //         "http://localhost:5000/api/hotels/add",
// //         formData, 
// //         {
// //           headers: { 
// //             "Content-Type": "multipart/form-data" 
// //           },
// //           timeout: 10000,
// //         }
// //       );

// //       console.log("✅ Registration successful!", response.data);
      
// //       alert("✅ Hotel registration successful! You can now login.");
      
// //       // Reset form
// //       setForm({
// //         name: "",
// //         description: "",
// //         location: "",
// //         amenities: "",
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //         ownerName: "",
// //         ownerPhone: "",
// //         hotelPhone: "",
// //       });
      
// //       // Clean up previews
// //       imagePreviews.forEach(url => URL.revokeObjectURL(url));
// //       setImages([]);
// //       setImagePreviews([]);
// //       setCurrentStep(1);
      
// //     } catch (error) {
// //       console.error("❌ Registration error:", error);
      
// //       if (error.response) {
// //         // Server responded with error
// //         console.error("Server response:", error.response.data);
// //         setError(error.response.data?.message || `Server error: ${error.response.status}`);
// //       } else if (error.request) {
// //         // No response received
// //         setError("Cannot connect to server. Make sure backend is running on http://localhost:5000");
// //       } else {
// //         setError(`Error: ${error.message}`);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const nextStep = () => {
// //     setError("");
    
// //     if (currentStep === 1) {
// //       if (!form.name || !form.description || !form.location) {
// //         setError("Please fill in all required hotel details");
// //         return;
// //       }
// //     } else if (currentStep === 2) {
// //       if (!form.email || !form.password || !form.confirmPassword) {
// //         setError("Please fill in all login details");
// //         return;
// //       }
      
// //       if (form.password !== form.confirmPassword) {
// //         setError("Passwords do not match!");
// //         return;
// //       }
      
// //       if (form.password.length < 6) {
// //         setError("Password must be at least 6 characters");
// //         return;
// //       }
// //     }
// //     setCurrentStep(currentStep + 1);
// //   };

// //   const prevStep = () => {
// //     setError("");
// //     setCurrentStep(currentStep - 1);
// //   };

// //   const getFieldIcon = (field) => {
// //     switch(field) {
// //       case 'name': return <Building2 className="w-5 h-5 text-gray-400" />;
// //       case 'description': return <FileText className="w-5 h-5 text-gray-400" />;
// //       case 'location': return <MapPin className="w-5 h-5 text-gray-400" />;
// //       case 'amenities': return <Wifi className="w-5 h-5 text-gray-400" />;
// //       case 'email': return <Mail className="w-5 h-5 text-gray-400" />;
// //       case 'password': return <Lock className="w-5 h-5 text-gray-400" />;
// //       case 'ownerName': return <UserCircle className="w-5 h-5 text-gray-400" />;
// //       case 'ownerPhone': return <Phone className="w-5 h-5 text-gray-400" />;
// //       case 'confirmPassword': return <Key className="w-5 h-5 text-gray-400" />;
// //       case 'hotelPhone': return <Phone className="w-5 h-5 text-gray-400" />;
// //       default: return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
// //       {/* Decorative Header */}
// //       <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-emerald-400 to-teal-500 transform -skew-y-3"></div>
      
// //       <div className="relative max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-10">
// //           <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4">
// //             <Hotel className="w-12 h-12 text-emerald-600" />
// //           </div>
// //           <h1 className="text-4xl font-bold text-gray-800 mb-2">Hotel Registration</h1>
// //           <p className="text-gray-600 text-lg">Register your hotel and become a partner with us</p>
// //         </div>

// //         {/* Progress Steps */}
// //         <div className="flex justify-between mb-8 px-4">
// //           {[1, 2, 3].map((step) => (
// //             <div key={step} className="flex-1 text-center">
// //               <div className={`relative`}>
// //                 <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
// //                   currentStep >= step 
// //                     ? 'bg-emerald-500 text-white' 
// //                     : 'bg-gray-200 text-gray-600'
// //                 }`}>
// //                   {step}
// //                 </div>
// //                 <div className={`h-1 w-full absolute top-5 -z-10 ${
// //                   step < 3 ? 'block' : 'hidden'
// //                 } ${
// //                   currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'
// //                 }`}></div>
// //                 <p className="text-sm mt-2 font-medium text-gray-600">
// //                   {step === 1 ? 'Hotel Details' : step === 2 ? 'Account Info' : 'Hotel Images'}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Main Form Card */}
// //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// //           <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          
// //           <form onSubmit={handleSubmit} className="p-8">
// //             {/* Error Display */}
// //             {error && (
// //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
// //                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
// //                 <div>
// //                   <p className="text-red-700 font-medium">Registration Error</p>
// //                   <p className="text-red-600 text-sm mt-1">{error}</p>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 1: Hotel Details */}
// //             {currentStep === 1 && (
// //               <div className="space-y-6">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Information</h2>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Hotel Name */}
// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Hotel Name <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('name')}
// //                       </div>
// //                       <input
// //                         name="name"
// //                         type="text"
// //                         value={form.name}
// //                         onChange={handleChange}
// //                         placeholder="Enter your hotel name"
// //                         required
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Description */}
// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Description <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute top-3 left-0 pl-3 pointer-events-none">
// //                         {getFieldIcon('description')}
// //                       </div>
// //                       <textarea
// //                         name="description"
// //                         value={form.description}
// //                         onChange={handleChange}
// //                         placeholder="Describe your hotel, its unique features, and services"
// //                         required
// //                         rows="4"
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Location */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Location <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('location')}
// //                       </div>
// //                       <input
// //                         name="location"
// //                         type="text"
// //                         value={form.location}
// //                         onChange={handleChange}
// //                         placeholder="Full address"
// //                         required
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Amenities */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Amenities
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('amenities')}
// //                       </div>
// //                       <input
// //                         name="amenities"
// //                         type="text"
// //                         value={form.amenities}
// //                         onChange={handleChange}
// //                         placeholder="WiFi, Parking, Pool (comma separated)"
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                     <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
// //                   </div>

// //                   {/* Hotel Phone (New) */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Hotel Phone <span className="text-gray-400 text-xs">(Optional)</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('hotelPhone')}
// //                       </div>
// //                       <input
// //                         name="hotelPhone"
// //                         type="tel"
// //                         value={form.hotelPhone}
// //                         onChange={handleChange}
// //                         placeholder="0771234567"
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 2: Account Information */}
// //             {currentStep === 2 && (
// //               <div className="space-y-6">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Email */}
// //                   <div className="md:col-span-2">
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Email Address <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('email')}
// //                       </div>
// //                       <input
// //                         name="email"
// //                         type="email"
// //                         value={form.email}
// //                         onChange={handleChange}
// //                         placeholder="hotel@example.com"
// //                         required
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Password */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Password <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('password')}
// //                       </div>
// //                       <input
// //                         name="password"
// //                         type={showPassword ? "text" : "password"}
// //                         value={form.password}
// //                         onChange={handleChange}
// //                         placeholder="Min. 6 characters"
// //                         required
// //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                       >
// //                         {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Confirm Password */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Confirm Password <span className="text-red-500">*</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('confirmPassword')}
// //                       </div>
// //                       <input
// //                         name="confirmPassword"
// //                         type={showConfirmPassword ? "text" : "password"}
// //                         value={form.confirmPassword}
// //                         onChange={handleChange}
// //                         placeholder="Re-enter password"
// //                         required
// //                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                       >
// //                         {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Owner Name (New) */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Owner Name <span className="text-gray-400 text-xs">(Optional)</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('ownerName')}
// //                       </div>
// //                       <input
// //                         name="ownerName"
// //                         type="text"
// //                         value={form.ownerName}
// //                         onChange={handleChange}
// //                         placeholder="Full name of owner"
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Owner Phone (New) */}
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Owner Phone <span className="text-gray-400 text-xs">(Optional)</span>
// //                     </label>
// //                     <div className="relative">
// //                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                         {getFieldIcon('ownerPhone')}
// //                       </div>
// //                       <input
// //                         name="ownerPhone"
// //                         type="tel"
// //                         value={form.ownerPhone}
// //                         onChange={handleChange}
// //                         placeholder="0771234567"
// //                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 3: Hotel Images */}
// //             {currentStep === 3 && (
// //               <div className="space-y-6">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Images</h2>
                
// //                 {/* Image Preview Grid */}
// //                 {imagePreviews.length > 0 && (
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
// //                     {imagePreviews.map((preview, index) => (
// //                       <div key={index} className="relative group">
// //                         <img
// //                           src={preview}
// //                           alt={`Preview ${index + 1}`}
// //                           className="w-full h-32 object-cover rounded-lg shadow-md"
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => removeImage(index)}
// //                           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
// //                         >
// //                           <X className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}

// //                 {/* Upload Button */}
// //                 <div className="flex items-center justify-center w-full">
// //                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
// //                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //                       <Upload className="w-8 h-8 text-gray-400 mb-2" />
// //                       <p className="mb-2 text-sm text-gray-500">
// //                         <span className="font-semibold">Click to upload</span> or drag and drop
// //                       </p>
// //                       <p className="text-xs text-gray-500">
// //                         PNG, JPG, JPEG (Max 5 images)
// //                       </p>
// //                     </div>
// //                     <input
// //                       type="file"
// //                       multiple
// //                       accept="image/*"
// //                       onChange={handleImageChange}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                 </div>
                
// //                 <p className="text-sm text-gray-500 mt-2">
// //                   * Upload images of your hotel. Good quality images help attract more customers.
// //                 </p>
// //               </div>
// //             )}

// //             {/* Navigation Buttons */}
// //             <div className="flex justify-between mt-8">
// //               {currentStep > 1 && (
// //                 <button
// //                   type="button"
// //                   onClick={prevStep}
// //                   className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
// //                 >
// //                   Previous
// //                 </button>
// //               )}
              
// //               {currentStep < 3 ? (
// //                 <button
// //                   type="button"
// //                   onClick={nextStep}
// //                   className="ml-auto px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
// //                 >
// //                   Next Step
// //                 </button>
// //               ) : (
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="ml-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {loading ? (
// //                     <div className="flex items-center">
// //                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                       </svg>
// //                       Registering...
// //                     </div>
// //                   ) : (
// //                     'Complete Registration'
// //                   )}
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         </div>

// //         {/* Footer */}
// //         <p className="text-center text-sm text-gray-500 mt-6">
// //           By registering, you agree to our Terms of Service and Privacy Policy.
// //           <br />
// //           <span className="text-xs">Fields marked with <span className="text-red-500">*</span> are required.</span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// /////////////////////////////////////////////

// // HotelRegister.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { 
//   Building2, 
//   MapPin, 
//   FileText, 
//   Wifi, 
//   Mail, 
//   Lock, 
//   X,
//   Upload,
//   UserCircle,
//   Phone,
//   Hotel,
//   Key,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   Image as ImageIcon
// } from "lucide-react";

// export default function HotelRegister() {
//   const [form, setForm] = useState({
//     // Required fields
//     name: "",
//     description: "",
//     location: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
    
//     // Optional fields
//     amenities: "",
//     ownerName: "",
//     ownerPhone: "",
//     hotelPhone: "",
//   });
  
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [error, setError] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
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
    
//     // Clean up old previews to avoid memory leaks
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
//     // Required fields
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
    
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       return false;
//     }
    
//     // Check if at least one image is uploaded
//     if (currentStep === 3 && images.length === 0) {
//       setError("Please upload at least one hotel image");
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
//     setUploadProgress(0);
    
//     try {
//       const formData = new FormData();
      
//       // Required fields
//       formData.append("name", form.name);
//       formData.append("description", form.description);
//       formData.append("location", form.location);
//       formData.append("email", form.email);
//       formData.append("password", form.password);
      
//       // Optional fields (send empty string if not provided)
//       formData.append("amenities", form.amenities || "");
//       formData.append("ownerName", form.ownerName || "");
//       formData.append("ownerPhone", form.ownerPhone || "");
//       formData.append("hotelPhone", form.hotelPhone || "");
      
//       // IMPORTANT: Images - field name MUST match backend (usually "images")
//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }

//       console.log("Sending registration data...");
//       console.log("- Hotel Name:", form.name);
//       console.log("- Email:", form.email);
//       console.log("- Images count:", images.length);
      
//       // Log image details
//       images.forEach((img, index) => {
//         console.log(`  Image ${index + 1}:`, img.name, img.type, (img.size / 1024).toFixed(2), "KB");
//       });

//       const response = await axios.post(
//         "http://localhost:5000/api/hotels/add", // Make sure this URL is correct
//         formData, 
//         {
//           headers: { 
//             "Content-Type": "multipart/form-data" 
//           },
//           timeout: 30000, // 30 seconds timeout for large uploads
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       console.log("✅ Registration successful!", response.data);
      
//       alert("✅ Hotel registration successful! You can now login.");
      
//       // Reset form
//       setForm({
//         name: "",
//         description: "",
//         location: "",
//         amenities: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         ownerName: "",
//         ownerPhone: "",
//         hotelPhone: "",
//       });
      
//       // Clean up previews
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       setImages([]);
//       setImagePreviews([]);
//       setCurrentStep(1);
//       setUploadProgress(0);
      
//     } catch (error) {
//       console.error("❌ Registration error:", error);
      
//       if (error.response) {
//         // Server responded with error
//         console.error("Server response:", error.response.data);
//         setError(error.response.data?.message || `Server error: ${error.response.status}`);
//       } else if (error.request) {
//         // No response received
//         setError("Cannot connect to server. Make sure backend is running on http://localhost:5000");
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     setError("");
    
//     if (currentStep === 1) {
//       if (!form.name || !form.description || !form.location) {
//         setError("Please fill in all required hotel details");
//         return;
//       }
//     } else if (currentStep === 2) {
//       if (!form.email || !form.password || !form.confirmPassword) {
//         setError("Please fill in all login details");
//         return;
//       }
      
//       if (form.password !== form.confirmPassword) {
//         setError("Passwords do not match!");
//         return;
//       }
      
//       if (form.password.length < 6) {
//         setError("Password must be at least 6 characters");
//         return;
//       }
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setError("");
//     setCurrentStep(currentStep - 1);
//   };

//   const getFieldIcon = (field) => {
//     switch(field) {
//       case 'name': return <Building2 className="w-5 h-5 text-gray-400" />;
//       case 'description': return <FileText className="w-5 h-5 text-gray-400" />;
//       case 'location': return <MapPin className="w-5 h-5 text-gray-400" />;
//       case 'amenities': return <Wifi className="w-5 h-5 text-gray-400" />;
//       case 'email': return <Mail className="w-5 h-5 text-gray-400" />;
//       case 'password': return <Lock className="w-5 h-5 text-gray-400" />;
//       case 'ownerName': return <UserCircle className="w-5 h-5 text-gray-400" />;
//       case 'ownerPhone': return <Phone className="w-5 h-5 text-gray-400" />;
//       case 'confirmPassword': return <Key className="w-5 h-5 text-gray-400" />;
//       case 'hotelPhone': return <Phone className="w-5 h-5 text-gray-400" />;
//       default: return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
//       {/* Decorative Header */}
//       <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-emerald-400 to-teal-500 transform -skew-y-3"></div>
      
//       <div className="relative max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4">
//             <Hotel className="w-12 h-12 text-emerald-600" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Hotel Registration</h1>
//           <p className="text-gray-600 text-lg">Register your hotel and become a partner with us</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex justify-between mb-8 px-4">
//           {[1, 2, 3, 4].map((step) => ( // Added step 4 for images
//             <div key={step} className="flex-1 text-center">
//               <div className={`relative`}>
//                 <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
//                   currentStep >= step 
//                     ? 'bg-emerald-500 text-white' 
//                     : 'bg-gray-200 text-gray-600'
//                 }`}>
//                   {step === 4 ? <ImageIcon className="w-5 h-5" /> : step}
//                 </div>
//                 <div className={`h-1 w-full absolute top-5 -z-10 ${
//                   step < 4 ? 'block' : 'hidden'
//                 } ${
//                   currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'
//                 }`}></div>
//                 <p className="text-sm mt-2 font-medium text-gray-600">
//                   {step === 1 ? 'Hotel Details' : 
//                    step === 2 ? 'Account Info' : 
//                    step === 3 ? 'Owner Info' : 
//                    'Hotel Images'}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          
//           <form onSubmit={handleSubmit} className="p-8">
//             {/* Error Display */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-red-700 font-medium">Registration Error</p>
//                   <p className="text-red-600 text-sm mt-1">{error}</p>
//                 </div>
//               </div>
//             )}

//             {/* Step 1: Hotel Details */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Hotel Name */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Hotel Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('name')}
//                       </div>
//                       <input
//                         name="name"
//                         type="text"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Enter your hotel name"
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute top-3 left-0 pl-3 pointer-events-none">
//                         {getFieldIcon('description')}
//                       </div>
//                       <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         placeholder="Describe your hotel, its unique features, and services"
//                         required
//                         rows="4"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Location <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('location')}
//                       </div>
//                       <input
//                         name="location"
//                         type="text"
//                         value={form.location}
//                         onChange={handleChange}
//                         placeholder="Full address"
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Amenities */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Amenities
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('amenities')}
//                       </div>
//                       <input
//                         name="amenities"
//                         type="text"
//                         value={form.amenities}
//                         onChange={handleChange}
//                         placeholder="WiFi, Parking, Pool (comma separated)"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Account Information */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Email */}
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Email Address <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('email')}
//                       </div>
//                       <input
//                         name="email"
//                         type="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="hotel@example.com"
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Password */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Password <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('password')}
//                       </div>
//                       <input
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={form.password}
//                         onChange={handleChange}
//                         placeholder="Min. 6 characters"
//                         required
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
//                       </button>
//                     </div>
//                   </div>

//                   {/* Confirm Password */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Confirm Password <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('confirmPassword')}
//                       </div>
//                       <input
//                         name="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         placeholder="Re-enter password"
//                         required
//                         className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Owner Information (New) */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Owner Information (Optional)</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Owner Name */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Owner Name
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('ownerName')}
//                       </div>
//                       <input
//                         name="ownerName"
//                         type="text"
//                         value={form.ownerName}
//                         onChange={handleChange}
//                         placeholder="Full name of owner"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Owner Phone */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Owner Phone
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('ownerPhone')}
//                       </div>
//                       <input
//                         name="ownerPhone"
//                         type="tel"
//                         value={form.ownerPhone}
//                         onChange={handleChange}
//                         placeholder="0771234567"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>

//                   {/* Hotel Phone */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Hotel Phone
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         {getFieldIcon('hotelPhone')}
//                       </div>
//                       <input
//                         name="hotelPhone"
//                         type="tel"
//                         value={form.hotelPhone}
//                         onChange={handleChange}
//                         placeholder="0771234567"
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Hotel Images */}
//             {currentStep === 4 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Images</h2>
                
//                 {/* Upload Info */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                   <p className="text-sm text-blue-700">
//                     <span className="font-semibold">📸 Image Requirements:</span><br />
//                     • Maximum 5 images<br />
//                     • Each image max 5MB<br />
//                     • Formats: JPG, PNG, WEBP<br />
//                     • First image will be the main display image
//                   </p>
//                 </div>
                
//                 {/* Image Preview Grid */}
//                 {imagePreviews.length > 0 && (
//                   <div className="mb-4">
//                     <p className="text-sm font-semibold text-gray-700 mb-2">
//                       Selected Images ({imagePreviews.length}/5)
//                     </p>
//                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative group">
//                           <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
//                             <img
//                               src={preview}
//                               alt={`Preview ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           {index === 0 && (
//                             <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
//                               Main
//                             </span>
//                           )}
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload Button */}
//                 <div className="flex items-center justify-center w-full">
//                   <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition duration-150 ease-in-out ${
//                     images.length >= 5 
//                       ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
//                       : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
//                   }`}>
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className={`w-10 h-10 mb-3 ${
//                         images.length >= 5 ? 'text-gray-400' : 'text-emerald-500'
//                       }`} />
//                       <p className="mb-2 text-sm text-gray-500">
//                         <span className="font-semibold">
//                           {images.length >= 5 ? 'Maximum images reached' : 'Click to upload'}
//                         </span>
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {images.length >= 5 
//                           ? 'Remove some images to upload more' 
//                           : 'PNG, JPG, JPEG, WEBP (Max 5MB each)'}
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       onChange={handleImageChange}
//                       className="hidden"
//                       disabled={images.length >= 5}
//                     />
//                   </label>
//                 </div>
                
//                 {/* Upload Progress Bar */}
//                 {loading && uploadProgress > 0 && (
//                   <div className="mt-4">
//                     <div className="flex justify-between text-sm text-gray-600 mb-1">
//                       <span>Uploading...</span>
//                       <span>{uploadProgress}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                       <div 
//                         className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
//                         style={{ width: `${uploadProgress}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-8">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={prevStep}
//                   className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//                 >
//                   Previous
//                 </button>
//               )}
              
//               {currentStep < 4 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="ml-auto px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
//                 >
//                   Next Step
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={loading || images.length === 0}
//                   className={`ml-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     loading ? 'opacity-75' : ''
//                   }`}
//                 >
//                   {loading ? (
//                     <div className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Registering... {uploadProgress}%
//                     </div>
//                   ) : (
//                     'Complete Registration'
//                   )}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           By registering, you agree to our Terms of Service and Privacy Policy.
//           <br />
//           <span className="text-xs">Fields marked with <span className="text-red-500">*</span> are required.</span>
//         </p>
//       </div>
//     </div>
//   );
// }



////////////////////////////////////new  addd////

// HotelRegister.jsx
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
  X,
  Upload,
  UserCircle,
  Phone,
  Hotel,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";

export default function HotelRegister() {
  const [form, setForm] = useState({
    // Required fields
    name: "",
    description: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Optional fields
    amenities: "",
    ownerName: "",
    ownerPhone: "",
    hotelPhone: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check max files (5)
    if (files.length > 5) {
      setError("You can only upload up to 5 images");
      toast.error("You can only upload up to 5 images", { position: "top-right", autoClose: 3000, theme: "light" });
      return;
    }

    // Check each file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let file of files) {
      if (file.size > maxSize) {
        const msg = `File "${file.name}" is too large. Max size is 5MB`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }
    }

    // Check file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    for (let file of files) {
      if (!validTypes.includes(file.type)) {
        const msg = `File "${file.name}" is not a valid image. Please upload JPG, PNG, or WEBP`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }
    }

    // Clean up old previews to avoid memory leaks
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
    // Required fields
    if (!form.name || !form.description || !form.location || !form.email || !form.password) {
      setError("Please fill in all required fields");
      toast.error("Please fill in all required fields", { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      toast.error("Password must be at least 6 characters long!", { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address", { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      toast.error("Passwords do not match!", { position: "top-right", autoClose: 3000, theme: "light" });
      return false;
    }

    // Check if at least one image is uploaded
    if (currentStep === 3 && images.length === 0) {
      setError("Please upload at least one hotel image");
      toast.error("Please upload at least one hotel image", { position: "top-right", autoClose: 3000, theme: "light" });
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
    setUploadProgress(0);

    try {
      const formData = new FormData();

      // Required fields
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("email", form.email);
      formData.append("password", form.password);

      // Optional fields (send empty string if not provided)
      formData.append("amenities", form.amenities || "");
      formData.append("ownerName", form.ownerName || "");
      formData.append("ownerPhone", form.ownerPhone || "");
      formData.append("hotelPhone", form.hotelPhone || "");

      // IMPORTANT: Images - field name MUST match backend (usually "images")
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      console.log("Sending registration data...");
      console.log("- Hotel Name:", form.name);
      console.log("- Email:", form.email);
      console.log("- Images count:", images.length);

      // Log image details
      images.forEach((img, index) => {
        console.log(`  Image ${index + 1}:`, img.name, img.type, (img.size / 1024).toFixed(2), "KB");
      });

      const response = await axios.post(
        "http://localhost:5000/api/hotels/add", // Make sure this URL is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 30000, // 30 seconds timeout for large uploads
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log("Registration successful!", response.data);

      // ✅ Toast success
      toast.success("Hotel registration successful! You can now login.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Reset form
      setForm({
        name: "",
        description: "",
        location: "",
        amenities: "",
        email: "",
        password: "",
        confirmPassword: "",
        ownerName: "",
        ownerPhone: "",
        hotelPhone: "",
      });

      // Clean up previews
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
      setCurrentStep(1);
      setUploadProgress(0);

    } catch (error) {
      console.error("❌ Registration error:", error);

      if (error.response) {
        // Server responded with error
        console.error("Server response:", error.response.data);
        const msg = error.response.data?.message || `Server error: ${error.response.status}`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
      } else if (error.request) {
        // No response received
        const msg = "Cannot connect to server. Make sure backend is running on http://localhost:5000";
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
      } else {
        const msg = `Error: ${error.message}`;
        setError(msg);
        toast.error(msg, { position: "top-right", autoClose: 3500, theme: "light" });
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setError("");

    if (currentStep === 1) {
      if (!form.name || !form.description || !form.location) {
        setError("Please fill in all required hotel details");
        toast.error("Please fill in all required hotel details", { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }
    } else if (currentStep === 2) {
      if (!form.email || !form.password || !form.confirmPassword) {
        setError("Please fill in all login details");
        toast.error("Please fill in all login details", { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match!");
        toast.error("Passwords do not match!", { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        toast.error("Password must be at least 6 characters", { position: "top-right", autoClose: 3000, theme: "light" });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError("");
    setCurrentStep(currentStep - 1);
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case "name": return <Building2 className="w-5 h-5 text-gray-400" />;
      case "description": return <FileText className="w-5 h-5 text-gray-400" />;
      case "location": return <MapPin className="w-5 h-5 text-gray-400" />;
      case "amenities": return <Wifi className="w-5 h-5 text-gray-400" />;
      case "email": return <Mail className="w-5 h-5 text-gray-400" />;
      case "password": return <Lock className="w-5 h-5 text-gray-400" />;
      case "ownerName": return <UserCircle className="w-5 h-5 text-gray-400" />;
      case "ownerPhone": return <Phone className="w-5 h-5 text-gray-400" />;
      case "confirmPassword": return <Key className="w-5 h-5 text-gray-400" />;
      case "hotelPhone": return <Phone className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      {/* Decorative Header */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-blue-700 transform -skew-y-3"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4">
            <Hotel className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hotel Registration</h1>
          <p className="text-gray-600 text-lg">Register your hotel and become a partner with us</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 px-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 text-center">
              <div className={`relative`}>
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step === 4 ? <ImageIcon className="w-5 h-5" /> : step}
                </div>
                <div
                  className={`h-1 w-full absolute top-5 -z-10 ${step < 4 ? "block" : "hidden"} ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <p className="text-sm mt-2 font-medium text-gray-600">
                  {step === 1 ? "Hotel Details" : step === 2 ? "Account Info" : step === 3 ? "Owner Info" : "Hotel Images"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-700"></div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Registration Error</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Step 1: Hotel Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hotel Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hotel Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("name")}
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your hotel name"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                        {getFieldIcon("description")}
                      </div>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your hotel, its unique features, and services"
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("location")}
                      </div>
                      <input
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Full address"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("amenities")}
                      </div>
                      <input
                        name="amenities"
                        type="text"
                        value={form.amenities}
                        onChange={handleChange}
                        placeholder="WiFi, Parking, Pool (comma separated)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("email")}
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="hotel@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("password")}
                      </div>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Min. 6 characters"
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("confirmPassword")}
                      </div>
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Owner Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Owner Information (Optional)</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Owner Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("ownerName")}
                      </div>
                      <input
                        name="ownerName"
                        type="text"
                        value={form.ownerName}
                        onChange={handleChange}
                        placeholder="Full name of owner"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Owner Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("ownerPhone")}
                      </div>
                      <input
                        name="ownerPhone"
                        type="tel"
                        value={form.ownerPhone}
                        onChange={handleChange}
                        placeholder="0771234567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Hotel Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hotel Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {getFieldIcon("hotelPhone")}
                      </div>
                      <input
                        name="hotelPhone"
                        type="tel"
                        value={form.hotelPhone}
                        onChange={handleChange}
                        placeholder="0771234567"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Hotel Images */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Images</h2>

                {/* Upload Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">📸 Image Requirements:</span><br />
                    • Maximum 5 images<br />
                    • Each image max 5MB<br />
                    • Formats: JPG, PNG, WEBP<br />
                    • First image will be the main display image
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
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              Main
                            </span>
                          )}
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
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition duration-150 ease-in-out ${
                      images.length >= 5
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                        : "border-blue-300 bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload
                        className={`w-10 h-10 mb-3 ${
                          images.length >= 5 ? "text-gray-400" : "text-blue-600"
                        }`}
                      />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          {images.length >= 5 ? "Maximum images reached" : "Click to upload"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {images.length >= 5
                          ? "Remove some images to upload more"
                          : "PNG, JPG, JPEG, WEBP (Max 5MB each)"}
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
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                >
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || images.length === 0}
                  className={`ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    loading ? "opacity-75" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering... {uploadProgress}%
                    </div>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By registering, you agree to our Terms of Service and Privacy Policy.
          <br />
          <span className="text-xs">
            Fields marked with <span className="text-red-500">*</span> are required.
          </span>
        </p>
      </div>
    </div>
  );
}
