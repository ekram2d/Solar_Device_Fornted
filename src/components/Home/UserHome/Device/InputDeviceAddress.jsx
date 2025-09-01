/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { DeviceInformationData } from "../../../../data/DeviceInformationData";

export default function InputDeviceAddress() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const{user}=useAuth()
  const device_info = JSON.parse(localStorage.getItem("device_info")) || {};
  const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand")) || {};
  const device_address = JSON.parse(localStorage.getItem("device_address")) ;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data, isLoading, refetch } = DeviceInformationData(
    user?.access,
    user?.custom_user_id
  );

  if (isLoading) return <p>Loading...</p>;
  console.log(data)
const onSubmit = async (formData) => {
    try {
      
const payload = {
  ...formData,
  device:data[0]?.id, // pick from localStorage or first device
};
   

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/device-location/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );

      toast.success("✅ Device Location registered successfully!");
      console.log("Response:", res.data);
      localStorage.setItem("device_address", JSON.stringify(res.data));
      // reset(); // clear form
      // navigate("#"); // navigate to next page if needed
      confirm()
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "❌ Failed to register device.");
    } 
  };

  const confirm = () => {

   setTimeout(() => {
     navigate("/device/sign");
   }, 1000);
    // <-- Change this to your actual confirmation route
  
}

  const handleBack = () => navigate(-1);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Input Device Address</span>
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6"
        >
          <h3 className="text-2xl font-bold text-green-600 border-b pb-2">
            Device Location
          </h3>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              {...register("address", {
                required: "Full address is required",
              })}
              placeholder="Your full address"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="">-- Select Country --</option>
              <option value="malaysia">Malaysia</option>
              <option value="singapore">Singapore</option>
              <option value="bangladesh">Bangladesh</option>
              <option value="india">India</option>
              <option value="indonesia">Indonesia</option>
              <option value="thailand">Thailand</option>
              <option value="philippines">Philippines</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <select
              {...register("province", {
                required: "Province is required",
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="">-- Select Province --</option>
              <option value="Selangor">Selangor</option>
              <option value="Kuala Lumpur">Kuala Lumpur</option>
              <option value="Johor">Johor</option>
              <option value="Penang">Penang</option>
              <option value="Sabah">Sabah</option>
              <option value="Sarawak">Sarawak</option>
              <option value="Perak">Perak</option>
              <option value="Pahang">Pahang</option>
              <option value="Negeri Sembilan">Negeri Sembilan</option>
              <option value="Malacca">Malacca</option>
              <option value="Kedah">Kedah</option>
              <option value="Kelantan">Kelantan</option>
              <option value="Terengganu">Terengganu</option>
              <option value="Perlis">Perlis</option>
              <option value="Putrajaya">Putrajaya</option>
              <option value="Labuan">Labuan</option>
            </select>
            {errors.province && (
              <p className="text-red-500 text-sm">{errors.province.message}</p>
            )}
          </div>

          {/* Device Type */}

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="number"
              {...register("postal_code", {
                required: "Postal code is required",
                min: { value: 1, message: "Invalid postal code" },
              })}
              placeholder="Enter your postal code"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.postal_code && (
              <p className="text-red-500 text-sm">
                {errors.postal_code.message}
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
                toast.error("Delete");
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Go To Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
