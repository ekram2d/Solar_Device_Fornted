/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { DeviceInformationData } from "../../../../data/DeviceInformationData";

export default function AddInverter() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const { user } = useAuth();
  const device_brand = JSON.parse(localStorage.getItem("device_brand"));

  const { data, isLoading } = DeviceInformationData(
    user?.access,
    user?.custom_user_id
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Prefill form values once data is available
  useEffect(() => {
    if (data && data[0]) {
      reset({
        brand: data[0].brand_name || "",
       serial_number: "",
        province: "",
        postal_code: "",
      });
    }
  }, [data, reset]);

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        device: data[0]?.id, // pick device id from API
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/inverter/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );

      toast.success("✅ Device Location registered successfully!");
      console.log("Response:", res.data);
      localStorage.setItem("device_brand", JSON.stringify(res.data));
      confirm();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "❌ Failed to register device.");
    }
  };

  const confirm = () => {
    if (device_brand) {
      setTimeout(() => {
        navigate("/device/device-address");
      }, 1000);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Add Inverter</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
        >
          {/* brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select your brand name*
            </label>
            <input
              {...register("brand", { required: "Full brand is required" })}
              placeholder="Your full brand"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          {/*serial_number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              serial_number
            </label>

            <input
              {...register("serial_number", {
                required: "Full serial number is required",
              })}
              placeholder="Your  serial number"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              type="text"
            />
            {errors.serial_number && (
              <p className="text-red-500 text-sm">
                {errors.serial_number.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              inverter_capacity
            </label>

            <input
              {...register("inverter_capacity", {
                required: "Full inverter_capacity is required",
              })}
              placeholder="Your  inverter_capacity"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              type="text"
            />
            {errors.inverter_capacity && (
              <p className="text-red-500 text-sm">
                {errors.inverter_capacity.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                localStorage.removeItem("device_info");
                toast.error("Deleted");
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
