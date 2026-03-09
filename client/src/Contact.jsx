// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { useState } from "react";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your message has been sent!");
//     setForm({ name: "", email: "", message: "" });
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Hero Section */}
//       <div className="mt-20 bg-blue-600 text-white text-center py-16">
//         <h1 className="text-4xl font-bold">Contact Us</h1>
//         <p className="text-lg mt-2">We are here to help you anytime.</p>
//       </div>

//       {/* Contact Content */}
//       <div className="max-w-6xl mx-auto my-12 grid md:grid-cols-2 gap-10 px-6">

//         {/* Contact Info */}
//         <div>
//           <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
//           <p className="text-gray-600 mb-6">
//             Feel free to contact us for reservations, questions, or support.
//           </p>

//           <div className="space-y-4">
//             <p>
//               <strong className="text-blue-600"> Phone:</strong>{" "}
//               +94 77 123 4567
//             </p>
//             <p>
//               <strong className="text-blue-600"> Email:</strong>{" "}
//               support@hoteleese.com
//             </p>
//             <p>
//               <strong className="text-blue-600"> Address:</strong>{" "}
//               Colombo, Sri Lanka
//             </p>
//           </div>

//           <h3 className="text-xl font-semibold mt-8">Follow Us</h3>
//           <div className="flex space-x-4 mt-2">
//             <a href="#" className="text-blue-600 hover:underline">Facebook</a>
//             <a href="#" className="text-blue-600 hover:underline">Instagram</a>
//             <a href="#" className="text-blue-600 hover:underline">Twitter</a>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <div className="bg-white shadow-xl rounded-xl p-6">
//           <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-3 border rounded-lg"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />

//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full p-3 border rounded-lg"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />

//             <textarea
//               placeholder="Your Message"
//               className="w-full p-3 border rounded-lg h-32"
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//               required
//             ></textarea>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Google Map */}
//       <div className="w-full h-64">
//         <iframe
//           title="hotel-location"
//           width="100%"
//           height="100%"
//           loading="lazy"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0057804757633!2d79.86124321528257!3d6.927079094999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2592219b02dfb%3A0x71ba0ee1c58ddc3!2sColombo!5e0!3m2!1sen!2slk!4v1700000000000"
//         ></iframe>
//       </div>

//       <Footer />
//     </>
//   );
// }

///////////////////////////////////////////
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="mt-20 bg-blue-600 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-2">We are here to help you anytime.</p>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto my-12 grid md:grid-cols-2 gap-10 px-6">

        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Feel free to contact us for reservations, questions, or support.
          </p>

          <div className="space-y-4">
            <p>
              <strong className="text-blue-600"> Phone:</strong>{" "}
              +94 77 123 4567
            </p>
            <p>
              <strong className="text-blue-600"> Email:</strong>{" "}
              support@paradiseLankaStay.com
            </p>
            <p>
              <strong className="text-blue-600"> Address:</strong>{" "}
              Colombo, Sri Lanka
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            <a href="#" className="text-blue-600 hover:underline">Instagram</a>
            <a href="#" className="text-blue-600 hover:underline">Twitter</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <textarea
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg h-32"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}