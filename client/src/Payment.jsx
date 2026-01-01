import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const { bookingData } = useLocation().state;
  const token = localStorage.getItem("token");

  const handlePaymentSuccess = async () => {
    try {
      // 1️⃣ Save booking
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookingId = res.data.booking._id;

      // 2️⃣ Download invoice
      window.open(
        `http://localhost:5000/api/bookings/invoice/${bookingId}`,
        "_blank"
      );

      alert("Payment Successful & Booking Confirmed!");
      navigate("/my-bookings");

    } catch (err) {
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

        <button
          onClick={handlePaymentSuccess}
          className="w-full bg-green-600 text-white py-3 rounded-lg mb-3"
        >
          💳 Pay by Card
        </button>

        <button
          onClick={handlePaymentSuccess}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          💵 Cash Payment
        </button>
      </div>
    </div>
  );
}
