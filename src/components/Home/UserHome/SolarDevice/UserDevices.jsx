// components/UserDevices.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../../../../data/Devices";
import SolarDevice from "./SolarDevice";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";

const UserDevices = () => {
  const { user } = useAuth();
  const accessToken = user?.access;

  const { data, isLoading, error } = useQuery({
    queryKey: ["deviceData", user?.custom_user_id],
    queryFn: () => getDevices(user?.custom_user_id, accessToken),
    enabled: !!user?.custom_user_id && !!accessToken,
  });

  if (!user) {
    return <p className="text-center text-red-500 mt-4">❌ User not found.</p>;
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
        <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">❌ Error loading devices.</p>
    );
  }

  console.log("Devices:", data[0]?.custom_user, user?.custom_user_id);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Solar Devices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] mx-auto m-3 p-3 items-center justify-center">
        {/* ✅ Filter devices for logged-in user */}
        {data
          ?.filter((device) => device?.custom_user == user?.custom_user_id)
          .map((device) => (
            <div
              key={device.id}
              className="w-full lg:w-[80%] h-auto bg-white/30 text-black backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 duration-300 mx-auto"
            >
              {/* Brand image */}
              <div className="w-[90%] mx-auto h-48 overflow-hidden flex items-center justify-center bg-gray-100 shadow-lg">
                <img
                  src={device.brand_image}
                  alt={device.brand_name}
                  className="max-h-48 object-contain"
                />
              </div>

              {/* Device details */}
              <div className="p-5 text-black space-y-2">
                <p
                  className={`${
                    device.status === "accepted"
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  } text-white font-medium border p-2 rounded-lg w-[40%] text-center capitalize`}
                >
                  {device.status}
                </p>

                <div className="flex items-center justify-between">
                  <p>{device.operations_date}</p>
                  <p>{device.inverters?.[0]?.inverter_capacity} kWp</p>
                </div>

                {/* Example signature display */}
                {device.signature && (
                  <div className="mt-3">
                    <strong>Signature:</strong>
                    <img
                      src={device.signature}
                      alt="Signature"
                      className="mt-2 h-20 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

        {/* Form to add new device */}
        <div className="mt-4 flex flex-col items-center justify-center gap-3 border-2 border-gray-300 p-4 w-full lg:w-[80%] h-auto mx-auto rounded-lg shadow hover:shadow-lg transition-shadow duration-200 bg-black dark:bg-white dark:text-black">
          <SolarDevice userId={user?.user_id} />
        </div>
      </div>
    </div>
  );
};

export default UserDevices;
