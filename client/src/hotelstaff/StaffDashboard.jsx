import React from "react";
import StaffNavbar from "./staffNavbar";

export default function StaffDashboard() {
  return (
    <div>
      <StaffNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
        {/* other staff components */}
      </div>
    </div>
  );
}
