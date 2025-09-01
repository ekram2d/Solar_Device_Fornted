import React from "react";
import {
  FaUsers,
  FaDatabase,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";
import UserInfo from "./UserInfo";

const dummyStats = [
  {
    title: "Total Users",
    value: 150,
    icon: <FaUsers className="text-white text-2xl" />,
    color: "bg-blue-500",
  },
  {
    title: "Active Devices",
    value: 320,
    icon: <FaDatabase className="text-white text-2xl" />,
    color: "bg-green-500",
  },
  {
    title: "Transactions",
    value: "$12,345",
    icon: <FaDollarSign className="text-white text-2xl" />,
    color: "bg-yellow-500",
  },
  {
    title: "Pending Requests",
    value: 8,
    icon: <FaClipboardList className="text-white text-2xl" />,
    color: "bg-red-500",
  },
];

// const dummyUsers = [
//   {
//     id: 1,
//     name: "Ekram Hossain",
//     email: "ek@gmail.com",
//     phone: "01712345678",
//     type: "Admin",
//   },
//   {
//     id: 2,
//     name: "Piya Rahman",
//     email: "piya@gmail.com",
//     phone: "01798765432",
//     type: "User",
//   },
//   {
//     id: 3,
//     name: "Habiba Akter",
//     email: "habiba@gmail.com",
//     phone: "01812345678",
//     type: "User",
//   },
// ];

export default function AdminHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        👋 Welcome, Admin
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dummyStats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow ${stat.color} text-white`}
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      {/* <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Users Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <UserInfo></UserInfo>
    </div>
  );
}
