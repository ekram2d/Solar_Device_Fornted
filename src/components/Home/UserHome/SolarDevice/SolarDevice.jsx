/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";

export default function SolarDevice({ userId }) {


  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <NavLink
        className="mt-4 flex flex-col items-center justify-center gap-3 border-2 border-gray-300 p-4 min-h-[200px] rounded-lg shadow hover:shadow-lg transition-shadow duration-200 bg-white text-gray-700"
        to="/device/create-inverter-brand"
      >
        <FontAwesomeIcon icon={faUpload} className="text-blue-500 text-xl" />
        <span className="text-lg font-medium">Add new device</span>
      </NavLink>
    </div>
  );
}
