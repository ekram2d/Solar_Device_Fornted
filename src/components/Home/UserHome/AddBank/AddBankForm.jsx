import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

export default function AddBankForm() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const { user } = useAuth();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  // console.log(user)
  if (!user || !user.access) {
    return <p>Please log in to submit your bank information.</p>;
  }


  const handleBack = () => navigate(-1);
  const onSubmit = async (data) => {
    // console.log(data)
    try {
        await axios.post("http://localhost:8000/bank-info/", data, {
        headers: {
          Authorization: `Bearer ${user.access}`, // access token from JWT
        },
      });
      // console.log(res)
      toast.success("Bank info added successfully");
      navigate("/user");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.non_field_errors?.[0] || "Submission failed"
      );
    }
  };

  if (!user) return <div>Please login to continue</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Add Bank Account</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Personal Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>

            <label className="block text-sm font-medium">
              Full Name (as per NID)
            </label>
            <input
              {...register("full_name", { required: "Full Name is required" })}
              placeholder="Your full name"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.full_name.message}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">NID Number</label>
                <input
                  {...register("nid_number", { required: "NID is required" })}
                  placeholder="NID Number"
                  className="w-full p-2 border rounded"
                />
                {errors.nid && (
                  <p className="text-red-500">{errors.nid_number.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  {...register("phone_number", {
                    required: "Phone number is required",
                  })}
                  placeholder="+8801XXXXXXXXX"
                  className="w-full p-2 border rounded"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone_number.message}</p>
                )}
              </div>
            </div>

            <label className="block text-sm font-medium mt-4">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email address"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Bank Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Bank Information</h3>

            <label className="block text-sm font-medium">Select Bank</label>
            <select
              {...register("bank_name", {
                required: "Select a bank",
              })}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Choose Bank --</option>
              <option value="brac_bank">BRAC Bank</option>
              <option value="dutch_bangla_bank">Dutch-Bangla Bank</option>
              <option value="islami_bank">Islami Bank</option>
              <option value="city_bank">City Bank</option>
              <option value="prime_bank">Prime Bank</option>
              <option value="southeast_bank">Southeast Bank</option>
              <option value="standard_chartered">Standard Chartered</option>
            </select>
            {errors.select_bank && (
              <p className="text-red-500">{errors.bank_name.message}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  Account Number
                </label>
                <input
                  type="number"
                  {...register("account_number", {
                    required: "Account Number is required",
                    min: { value: 1, message: "Invalid account number" },
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your account number"
                />
                {errors.account_number && (
                  <p className="text-red-500">
                    {errors.account_number.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  Account Type
                </label>
                <select
                  {...register("account_type", {
                    required: "Account type is required",
                  })}
                  className="w-full p-2 border rounded"
                  defaultValue="savings account"
                >
                  <option value="savings account">Savings Account</option>
                  <option value="current account">Current Account</option>
                </select>
              </div>
            </div>

            <label className="block text-sm font-medium mt-4">
              Branch Name / Code
            </label>
            <input
              type="text"
              {...register("branch_code", {
                required: "Branch name/code is required",
              })}
              className="w-full p-2 border rounded"
              placeholder="Branch Code"
            />
            {errors.branch_code && (
              <p className="text-red-500">{errors.branch_code.message}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Account Verification</h3>
            <p className="bg-yellow-100 p-3 rounded text-sm text-gray-700 mt-2">
              Your bank account will be verified within 24 hours. Please make
              sure all information is correct.
            </p>

            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                {...register("terms_accepted", {
                  required: "You must accept the terms",
                })}
                className="mt-1"
              />
              <p className="text-sm">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  Terms and Conditions
                </a>{" "}
                and Privacy Policy
              </p>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">
                {errors.terms_accepted.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add Bank Account
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                reset();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
