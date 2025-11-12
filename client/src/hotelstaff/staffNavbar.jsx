import React, { useEffect, useState } from "react";

export default function StaffNavbar() {
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    const staffInfo = JSON.parse(localStorage.getItem("staffInfo"));
    if (staffInfo?.hotel?.name) {
      setHotelName(staffInfo.hotel.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffInfo");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold">🏨 Staff Dashboard</h1>
        {hotelName && (
          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
            {hotelName}
          </span>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
