import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { DeviceInformationData } from "../../../../data/DeviceInformationData";

export default function InverterInformation() {
     const select_brand = JSON.parse(localStorage.getItem("selectedBrand"));
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = DeviceInformationData(user?.access, select_brand?.id);

  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No device information found.</p>;
  console.log(data)
  const handleBack = () => navigate(-1);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="text-2xl font-bold">
          ← <span>Device Information</span>
        </button>
      </div>

      <h2 className="rounded-xl p-4 text-green-500 font-bold mb-2">
        Inverter Information ({data.length})
      </h2>

      {data.map((device) => (
        <div
          key={device.id}
          className="flex items-center justify-between rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-green-100"
        >
          {/* Brand */}
          <div className="flex items-center gap-2">
            {device.brand_image && (
              <img
                src={device.brand_image}
                alt={device.brand_name}
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
            <p className="text-base font-medium">{device.brand_name}</p>
          </div>

          {/* Capacity */}
          <div className="flex justify-center items-center gap-6">
            <div>
              <p className="text-base font-medium">{device.capacity}</p>
              <p>KWp</p>
            </div>
            <NavLink
              to="/device/device-address"
              className="text-3xl text-gray-400 font-bold"
            >
              &gt;
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}
