// components/UserDevices.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDevices } from "../../../../data/Devices";
import SolarDevice from "./SolarDevice";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";

const UserDevices = () => {
  const {user}= useAuth();

  const accessToken = user?.access; // Assuming you stored the JWT access token under 'access'

  const { data, isLoading, error } = useQuery({
    queryKey: ["deviceData", user?.user_id],
    queryFn: () => getDevices(user?.user_id, accessToken),
    enabled: !!user?.user_id && !!accessToken,
  });
  if (!user) {
    return <p className="text-center text-red-500 mt-4">❌ User not found.</p>;
  }
  console.log(data);

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

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Solar Devices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] mx-auto m-3 p-3 items-center justify-center">
        {data?.map((device) => (
          <div
            key={device.id}
            className="w-full lg:w-[80%] h-auto bg-white/30 text-black backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 duration-300 mx-auto"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={device.image_field}
                alt={device.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-black space-y-1">
              <h3 className="text-xl font-semibold">{device.name}</h3>
              <p
                className={`${
                  device.status === "approved"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                } text-white font-medium border-2 border-gray-300 p-2 rounded-lg w-[40%] text-center capitalize`}
              >
                <strong>{device.status}</strong>
              </p>
              <p>
                <strong>Capacity:</strong> {device.capacity_kwp} kWp
              </p>
              <p>
                <strong>Installed:</strong> {device.install_date}
              </p>
              <p>
                <strong>Tier Field:</strong> {device.tier_field_until}
              </p>
              <p>
                <strong>User ID:</strong> {device.user}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 flex flex-col items-center justify-center gap-3 border-2 border-gray-300 p-4 w-full lg:w-[80%] h-auto mx-auto rounded-lg shadow hover:shadow-lg transition-shadow duration-200  bg-black dark:bg-white dark:text-black">
          <SolarDevice userId={user?.user_id} />
        </div>
      </div>
    </div>
  );
};

export default UserDevices;
