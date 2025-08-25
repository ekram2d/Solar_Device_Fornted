import React from 'react'

import SolarDevice from './SolarDevice/SolarDevice';
import UserDevices from './SolarDevice/UserDevices';
import AddBank from './AddBank/AddBank';
import { NavLink } from 'react-router-dom';
import BrandList from '../Brand/BrandList';

export default function UserHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.email); // "ekram@example.com"
  console.log(user?.user_id); 

return (
  <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
    <div className="flex flex-col md:flex-row  md:justify-between items-center   p-4">
      <div className="text-left text-2xl font-bold md:order-1 order-2">
        Hello, {user?.username}
      </div>
      <div className="bg-gray-100 p-4 rounded-full p-2 shadow-md mt-4 md:order-2 order-1">
        Profile
      </div>
    </div>

    <div>
      <div>
        <div className=" bg-orange-200  flex  flex-col md:flex-row  md:justify-between items-center  p-4">
          <div>
            <NavLink
              to="/add-bank-form"
              className={
                "bg-blue-500 text-white p-4 rounded hover:bg-green-600 transition"
              }
            >
              Add Bank Account
            </NavLink>
          </div>
          <div className="bg-gray-100 p-4 rounded-full p-2 shadow-md mt-4 flex items-center justify-between ">
            <span className="mr-2 w-full text-2xl">💵</span>
          </div>
        </div>
      </div>
    </div>
    <div> {<UserDevices />}
    </div>
    <div>
    {/* <BrandList></BrandList> */}
    </div>
  </div>
);
}
