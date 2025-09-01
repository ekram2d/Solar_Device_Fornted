import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeviceInformationData } from "../../../../data/DeviceInformationData";
import useAuth from "../../../../hooks/useAuth";

export default function ConfirmDeviceInformation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isLoading, refetch } = DeviceInformationData(
    user?.access,
    user?.custom_user_id
  );

  if (isLoading) return <p>Loading...</p>;

  const handleBack = () => navigate(-1);

  const handleConfirm = async (deviceId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/device-info/sign/${deviceId}/`,
        { Check: "confirm" },
        {
          headers: { Authorization: `Bearer ${user?.access}` },
        }
      );

      toast.success("✅ Device confirmed successfully!");
      await refetch(); // reload data

      setTimeout(() => {
        navigate("/device/final"); // change this to where you want to go
      }, 2000);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "❌ Failed to confirm device.");
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Back</span>
        </button>
      </div>

      {data?.map((device) => (
        <div
          key={device.id}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mb-8 space-y-4"
        >
          <h1 className="text-black font-bold text-2xl">Device Registration</h1>

          {/* Owner Info */}
          <div className="flex items-center justify-between">
            <p>Owner full Name</p>
            <p className="text-black">
              {device?.first_name} {device?.last_name}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p>Device Type</p>
            <p className="text-black">{device?.device_type || "N/A"}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Device Capacity</p>
            <p className="text-black">{device?.capacity || "N/A"} (Kwp)</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Grid Connection Date</p>
            <p className="text-black">{device?.operations_date || "N/A"}</p>
          </div>

          {/* Inverter Information */}
          <h2 className="text-lg font-semibold mb-2">Inverter Information</h2>
          <div className="flex items-center justify-between font-semibold">
            <p>Brand</p>
            <p>Serial No</p>
            <p>Capacity (Kwp)</p>
          </div>

          {device?.inverters?.length > 0 ? (
            device.inverters.map((inv, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p>{device?.brand_name}</p>
                <p>{inv?.serial_number || "N/A"}</p>
                <p>{device?.capacity || "N/A"} (Kwp)</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No inverters available</p>
          )}

          {/* Address */}
          <h2 className="text-lg font-semibold mb-2">Device Location</h2>
          {device?.locations?.length > 0 ? (
            device.locations.map((loc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p>Address</p>
                  <p>{loc?.address || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Country</p>
                  <p>{loc?.country || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Province</p>
                  <p>{loc?.province || "N/A"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No location available</p>
          )}

          <p className="text-gray-600">
            Check: {device.Check === "confirm" ? "✅ Confirmed" : "Pending"}
          </p>
{/* 
          {device?.brand_image && (
            <img
              src={device.brand_image}
              alt="Brand"
              className="w-32 mt-2 border rounded"
            />
          )} */}

          {/* Confirm Button */}
          {device.Check !== "confirm" && (
            <button
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              onClick={() => handleConfirm(device.id)}
            >
              Confirm
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
