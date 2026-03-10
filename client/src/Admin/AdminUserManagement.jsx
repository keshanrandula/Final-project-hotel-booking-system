import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    if (!token) {
      toast.error("Please login first");
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    const possibleEndpoints = [
      "http://localhost:5000/api/auth",
      "http://localhost:5000/api/users",
      "http://localhost:5000/api/auth/users",
    ];

    let success = false;
    let lastError = "";

    for (const url of possibleEndpoints) {
      try {
        const res = await axios.get(url, { headers });

        const fetchedUsers = res.data?.users || res.data || [];
        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
          success = true;
          break;
        }
      } catch (err) {
        lastError =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch users";
      }
    }

    if (!success) {
      toast.error(lastError || "Failed to fetch users");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    const possibleDeleteEndpoints = [
      `http://localhost:5000/api/auth/${id}`,
      `http://localhost:5000/api/users/${id}`,
      `http://localhost:5000/api/auth/users/${id}`,
    ];

    let success = false;
    let lastError = "";

    for (const url of possibleDeleteEndpoints) {
      try {
        await axios.delete(url, { headers });

        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
        success = true;
        break;
      } catch (err) {
        lastError =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete user";
      }
    }

    if (!success) {
      toast.error(lastError || "Failed to delete user");
    }

    setDeletingId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <ToastContainer />

      <div className="mx-auto max-w-7xl rounded-3xl border border-blue-100 bg-white shadow-xl">
        <div className="flex flex-col gap-4 border-b border-blue-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-700">
              Customer Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View registered customers and delete accounts
            </p>
          </div>

          <button
            onClick={fetchUsers}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center px-6 py-10">
            <p className="text-lg font-medium text-blue-700">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center px-6 py-10">
            <p className="text-center text-base text-slate-500">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-blue-100">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      First Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Last Name
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Email
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Phone
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Address
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Role
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Status
                    </th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-blue-900">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-50 bg-white">
                  {users.map((user) => (
                    <tr key={user._id} className="transition hover:bg-blue-50/60">
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {user.firstName || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {user.lastName || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {user.email || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {user.phone || "-"}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        {user.address || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                        {user.role || "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        {user.isActive ? (
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === user._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}