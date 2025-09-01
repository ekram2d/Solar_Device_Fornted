import React from "react";

import useAuth from "../../../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import { UserInfoData } from "../../../data/UserInfoData";

export default function UserInfo() {
  const { user } = useAuth();
  const { data, isLoading, error } = UserInfoData(user?.access);

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
      <p className="text-center text-red-500 mt-4">❌ Error loading devices.</p>
    );
  }

  console.log("Devices:", data);

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // TODO: open edit modal or redirect to edit page
  };

  const handleDelete = (id) => {
    console.log("Delete user with id:", id);
    // TODO: call API to delete user
  };

  return (
    <div className=" px-6">
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
                    onClick={() => handleEdit(item.id)}
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
    </div>
  );
}
