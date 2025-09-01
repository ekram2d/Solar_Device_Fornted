import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/Admin/AdminNavbar/AdminNavbar';

export default function AdminMain() {
  return (
    <div className="flex items-center justify-center gap-10 mt-20">
      <div className='sm:w-[30%]'>
        <AdminNavbar></AdminNavbar>
      </div>
      <div className='w-full '>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
