import React from "react";
import { useNavigate } from "react-router-dom";

export default function FinalSubmit() {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/user"); // replace with your home route
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Thank You!
        </h1>
        <p className="text-gray-700 mb-6">
          Your device information has been submitted successfully. <br />
          We will notify you once the registration is approved.
        </p>
        <button
          onClick={handleBackHome}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors duration-300"
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
