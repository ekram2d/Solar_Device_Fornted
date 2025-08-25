import React from 'react'
import { NavLink } from 'react-router-dom';

export default function CreateInverterBrand() {
  return (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-3 ">Create New Inverter Brand</h2>

      <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 mt-2">
        <div className="flex items-center gap-4">
          <button className=" border-1 rounded-lg p-3 bg-green-300">+</button>
          <p className="text-base font-medium">Create New Brand</p>
        </div>
        <NavLink
          to="/device/brand-list"
          className="text-3xl text-gray-400 font-bold"
        >
          &gt;
        </NavLink>
      </div>
    </div>
  );
}
