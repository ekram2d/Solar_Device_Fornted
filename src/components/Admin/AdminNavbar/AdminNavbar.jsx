import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gray-900 text-white shadow-lg fixed top-0 mb-10 w-full z-50">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <span className="text-2xl font-bold text-indigo-400">AdminPanel</span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="h-full px-3 py-6 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">📊 Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/user-info"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">User</span>
                {/* <span className="ml-auto bg-indigo-500 text-xs px-2 py-1 rounded-full">
                  Pro
                </span> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/user-bank"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">BankInfo</span>
               
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/brand-info"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">BrandInfo</span>
                {/* <span className="ml-auto bg-indigo-500 text-xs px-2 py-1 rounded-full">
                  Pro
                </span> */}
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">📦 Products</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">🔑 Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <span className="ms-3">📝 Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Push content right when sidebar is open on large screens */}
     
    </>
  );
}
