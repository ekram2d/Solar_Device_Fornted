import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import { UserInfoData } from "../../../data/UserInfoData";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserInfo() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = UserInfoData(user?.access);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    user_type: "",
  });

  if (!user) {
    return <p className="text-center text-red-500 mt-4">❌ User not found.</p>;
  }

  if (isLoading) {
    return (
      <div className="w-full absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">❌ Error loading users.</p>
    );
  }

  const handleEdit = (item) => {
    setId(item.id);
    setFormData({
      first_name: item.user?.first_name || "",
      last_name: item.user?.last_name || "",
      phone_number: item.phone_number || "",
      user_type: item.user_type || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/customuser/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      toast.success("✅ User deleted successfully");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete user");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/customuser/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      toast.success("✅ User updated successfully");
      setModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update user");
    }
  };

  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">👤 Users List</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">User Type</th>
              <th className="px-4 py-2 text-left">Terms</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">
                  {item.user
                    ? `${item.user.first_name} ${item.user.last_name}`
                    : "N/A"}
                </td>
                <td className="px-4 py-2">{item.user?.email || "N/A"}</td>
                <td className="px-4 py-2">{item.phone_number || "N/A"}</td>
                <td className="px-4 py-2 capitalize">{item.user_type}</td>
                <td className="px-4 py-2">
                  {item.terms_and_conditions ? "✅ Yes" : "❌ No"}
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              Edit User Information
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border px-3 py-2 rounded"
                required
              /> */}
              {/* <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border px-3 py-2 rounded"
                required
              /> */}
              {/* <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border px-3 py-2 rounded"
              /> */}
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
