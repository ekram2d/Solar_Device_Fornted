/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function DeviceInformation() {
   const select_brand = JSON.parse(localStorage.getItem("selectedBrand"));
   console.log(select_brand.id);

  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
 
  // console.log(select_brand?.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!user || !user.access || !select_brand) {
    return <p>Please log in to submit your device information.</p>;
  }

  const handleBack = () => navigate(-1);
  
  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        capacity: Number(formData.capacity), // ensure numeric
      };
      payload['user']=user?.user_id; 
      payload['custom_user']=user?.custom_user_id;
      payload['brand_info']=select_brand?.id

      console.log("Form Payload:", payload);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/device-info/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );

      toast.success("✅ Device registered successfully!");
      console.log("Response:", res.data);

      reset(); // clear form
      navigate("/device/inverter-information"); // navigate to next page if needed
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "❌ Failed to register device.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-3">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Device Information</span>
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-6 space-y-2">
        <ToastContainer position="top-right" autoClose={3000} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
        >
          <h3 className="text-2xl font-bold text-green-600 border-b pb-2">
            Device Registration
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner's Full Name
            </label>
            <input
              {...register("full_name")}
              value={`${user?.first_name} ${user?.last_name}`}
              readOnly
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email")}
                value={user?.email}
                readOnly
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                {...register("phone_number")}
                value={user?.phone_number}
                readOnly
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
          </div>

          {/* Device Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Type
            </label>
            <select
              {...register("device_type", {
                required: "Device type is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="">-- Choose Device --</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="agricultural">Agricultural</option>
              <option value="hybrid">Hybrid</option>
              <option value="smart">Smart</option>
              <option value="off_grid">Off-Grid</option>
            </select>
            {errors.device_type && (
              <p className="text-red-500 text-sm">
                {errors.device_type.message}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity (KWp)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("capacity", {
                required: "Capacity is required",
                min: { value: 1, message: "Invalid capacity number" },
              })}
              placeholder="Enter your capacity"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">{errors.capacity.message}</p>
            )}
          </div>

          {/* Operation Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commercial Operation Date
            </label>
            <input
              type="date"
              {...register("operations_date", { required: "Date is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.operations_date && (
              <p className="text-red-500 text-sm">
                {errors.operations_date.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {loading ? "Submitting..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
