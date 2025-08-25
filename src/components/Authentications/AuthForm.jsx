import React, { useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { FaSpinner } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-10 p-8 max-w-md bg-white border rounded-lg shadow">
      {/* Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <FaSpinner className="text-blue-600 text-4xl animate-spin" />
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded transition font-medium ${
            isLogin
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded transition font-medium ${
            !isLogin
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Register
        </button>
      </div>

      {/* Auth Forms */}
      {isLogin ? (
        <LoginForm
          setIsLogin={setIsLogin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <RegisterForm
          setIsLogin={setIsLogin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
