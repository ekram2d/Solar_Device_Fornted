import React from 'react'
import { useNavigate } from 'react-router-dom';
import { DeviceInformationData } from '../../../data/DeviceInformationData';
import useAuth from '../../../hooks/useAuth';

export default function UserSign() {
  const navigate = useNavigate();
  const{user}=useAuth()
  const brand_info=JSON.parse(localStorage.getItem("selectedBrand"));
  console.log(brand_info.id)
  const {data, isLoading} = DeviceInformationData(user?.access,brand_info.id);

  if (isLoading){

<>
return <p>Loading...</p>
</>
  }
  console.log(data)

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Device Information</span>
        </button>
      </div>
      <div>UserSign</div>
    </>
  );
}
