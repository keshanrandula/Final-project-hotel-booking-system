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

// //////////////
// AddHotel.jsx
import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("http://localhost:5000/api/hotels/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Hotel added successfully!");
      setForm({
        name: "",
        description: "",
        location: "",
        amenities: "",
        email: "",
        password: "",
      });
      setImages([]);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding hotel");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mt-10"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Hotel
        </h2>

        {["name", "description", "location", "amenities", "email", "password"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize mb-1">
              {field}
            </label>
            <input
              name={field}
              type={field === "password" ? "password" : "text"}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
}

/////////////////


