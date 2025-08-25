import React from 'react'
import { NavLink } from 'react-router-dom';

export default function AddBank() {
return (
  <div>
    <div className=" bg-orange-200  flex  flex-col md:flex-row  md:justify-between items-center  p-4">
      <div>
        <NavLink to="/add-bank-form" className="bg-blue-500 text-white p-4  rounded hover:bg-green-600 transition ">
          Add Bank Account
        </NavLink>
        
      </div>
      <div className="bg-gray-100 p-4 rounded-full p-2 shadow-md mt-4 flex items-center justify-between ">
        <span className="mr-2 w-full text-2xl">💵</span>
      </div>
    </div>
  </div>
);
}
