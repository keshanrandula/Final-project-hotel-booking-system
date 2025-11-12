import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  UserIcon, 
  EnvelopeIcon, 
  Cog6ToothIcon, 
  PencilSquareIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

export default function StaffProfile() {
  const [staff, setStaff] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "" 
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("staffToken");
      const res = await axios.get("http://localhost:5000/api/staff/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
      setForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        password: "",
      });
    } catch (err) {
      showMessage('error', "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), duration);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("staffToken");
      const res = await axios.put("http://localhost:5000/api/staff/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
      setEditing(false);
      showMessage('success', "Profile updated successfully!");
    } catch (err) {
      showMessage('error', err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    showMessage('success', "Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  if (loading && !staff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Message Toast */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {message.type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 mr-2" />
          ) : (
            <XCircleIcon className="h-5 w-5 mr-2" />
          )}
          {message.text}
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {staff?.firstName} {staff?.lastName}
                </h1>
                <p className="text-blue-100 opacity-90">{staff?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
              <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            </div>

            {!editing ? (
              <div className="space-y-6">
                {/* Info Items */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">
                        {staff?.firstName} {staff?.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{staff?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Cog6ToothIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-gray-900 capitalize">{staff?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gray-400 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <XCircleIcon className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <CheckCircleIcon className="h-4 w-4" />
                    )}
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}