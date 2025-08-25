// components/auth/LoginForm.jsx
import axios from "axios";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const LoginForm = ({setIsLoading, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();


  if (user) {
    navigate("/user");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successful 🎉");
      navigate("/user");
    } catch (error) {
      console.log(error?.response?.data?.non_field_errors[0]);
      const twistMessages = [
        "Oops! That combo didn’t work. Try again like a boss! 💪",
        "Login failed. But hey, even Batman needed Alfred.",
        "Are you sure those credentials weren't for Hogwarts? 🧙‍♂️",
        "Wrong email or password. Try again, hacker-in-training. 🕵️",
        "Hmm... Seems like the login gods are not pleased. 😅",
      ];
      const randomTwist =
        twistMessages[Math.floor(Math.random() * twistMessages.length)];

      const rawError =
        error?.response?.data?.non_field_errors[0] ||
        error?.response?.data?.detail ||
        "Login failed";
      setError(rawError);
      toast.error(`${rawError} — ${randomTwist}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 text-sm animate-fade-in" autoClose={300}>{error}</p>}
    </form>
  );
};

export default LoginForm;
