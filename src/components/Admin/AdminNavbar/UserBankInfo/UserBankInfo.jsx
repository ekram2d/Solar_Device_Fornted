import React, { useState } from "react";

import { FaSpinner } from "react-icons/fa";
import { UserBankInfoData } from "../../../../data/UserBankInfoData";
import useAuth from "../../../../hooks/useAuth";

export default function UserBankInfo() {
  const { user } = useAuth()
  const { data, isLoading, error } = UserBankInfoData(user?.access);

  const [search, setSearch] = useState("");

  if (!user) {
    return <p className="text-center text-red-500 mt-4">❌ User not found.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">❌ Failed to load data.</p>
    );
  }

  // 🔍 filter by email OR custom_user (string match)
  const filteredData = data?.filter(
    (item) =>
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.custom_user && item.custom_user.toString().includes(search))

    // (item) =>
    //   item.email.toLowerCase().includes(search.toLowerCase()) ||
    //   item.custom_user.toString().includes(search)
  );
// const filteredData= data
console.log(data)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        🏦 Bank Information
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email or custom_user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Bank</th>
              <th className="px-4 py-2 text-left">Account No</th>
              <th className="px-4 py-2 text-left">Custom User</th>
              <th className="px-4 py-2 text-left">Terms</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.full_name}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.phone_number}</td>
                  <td className="px-4 py-2 capitalize">{item.bank_name}</td>
                  <td className="px-4 py-2">{item.account_number}</td>
                  <td className="px-4 py-2">{item.custom_user}</td>
                  <td className="px-4 py-2">
                    {item.terms_accepted ? "✅ Yes" : "❌ No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
