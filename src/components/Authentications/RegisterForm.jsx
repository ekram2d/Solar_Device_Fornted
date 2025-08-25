/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm({ setIsLogin }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    user_type: "user",
    terms_and_conditions: false,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      toast.success("✅ Registration successful! Please log in.");
      setIsLogin(true);
    } catch (error) {
      const res = error.response?.data;
      // console.log(error)
      // Handle various patterns of error message formats
      if (res?.message) {
        toast.error(`❌ ${res.message}`);
      } else if (typeof res === "object") {
        const firstKey = Object.keys(res)[0];
        const firstError = Array.isArray(res[firstKey])
          ? res[firstKey][0]
          : res[firstKey];
        toast.error(`❌ ${firstKey}: ${firstError}`);
      } else {
        toast.error("❌ Registration failed.");
      }
      console.error("Registration Error:", res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 border-2"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Create an Account
      </h2>

      {[
        "first_name",
        "last_name",
        "email",
        "password",
        "confirm_password",
        "phone_number",
      ].map((field) => (
        <input
          key={field}
          type={
            field.includes("password")
              ? "password"
              : field === "email"
              ? "email"
              : "text"
          }
          name={field}
          placeholder={field
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          value={formData[field]}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="terms_and_conditions"
          checked={formData.terms_and_conditions}
          onChange={handleInputChange}
          required
          className="w-4 h-4"
        />
        <label className="text-sm text-gray-700">
          I agree to the{" "}
          <span className="text-blue-600 underline cursor-pointer">
            terms and conditions
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg transition-all duration-200 font-semibold ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? (
          <span className="flex justify-center items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Registering...
          </span>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
}
