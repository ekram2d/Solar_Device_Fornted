import React from "react";
import { useNavigate } from "react-router-dom";
import { DeviceInformationData } from "../../../data/DeviceInformationData";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function UserSign() {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  if (isLoading) return <p>Loading...</p>;

  const handleBack = () => {
    navigate(-1);
  };

  // Submit for each device
const onSubmit = async (formData, deviceId) => {
  if (!formData.signature || formData.signature.length === 0) {
    toast.error("❌ Please select a signature image.");
    return;
  }

  const form = new FormData();
  form.append("signature", formData.signature[0]);

  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/device-info/sign/${deviceId}/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      }
    );

    toast.success("✅ Signature uploaded successfully!");
    reset();
    console.log("Response:", res.data);

    // Navigate after 2 seconds
    setTimeout(() => {
      navigate("/device/confirm"); // replace with your route
    }, 2000);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "❌ Failed to upload signature.");
  }
};

  return (
    <>
      <div className="w-[90%] mx-auto mt-10">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-2xl font-bold">
            ← <span>Back</span>
          </button>
        </div>

        {/* Loop through device info */}
        {data?.map((device) => (
          <div
            key={device.id}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mb-8"
          >
            {/* Show device details */}
            <h2 className="text-lg font-semibold mb-4">
              Device Type: {device.device_type || "N/A"}
            </h2>
            <p className="text-gray-600">Capacity: {device.capacity}</p>
            <p className="text-gray-600">
              Brand: {device.brand_name || "No brand"}
            </p>
            {device.signature ? (
              <div className="mt-4">
                <p className="text-green-600 font-semibold">
                  Signature Uploaded ✅
                </p>
                <img
                  src={device.signature}
                  alt="Signature"
                  className="mt-2 w-40 border rounded"
                />

                <button
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => navigate("/device/confirm")}
                >
                  Next
                </button>
              </div>
            ) : (
              <>
                {/* Signature Upload Form */}
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmit(formData, device.id)
                  )}
                  className="space-y-4 mt-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Signature
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("signature", {
                        required: "Signature is required",
                      })}
                      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                    />
                    {errors.signature && (
                      <p className="text-red-500 text-sm">
                        {errors.signature.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    Upload Signature
                  </button>
                </form>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
