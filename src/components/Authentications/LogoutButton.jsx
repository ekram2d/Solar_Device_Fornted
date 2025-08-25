import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

const handleLogout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const refreshToken = user?.refresh;

  if (!refreshToken) return;

  try {
    await fetch("http://localhost:8000/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    localStorage.removeItem("user");
    navigate("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};


  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
