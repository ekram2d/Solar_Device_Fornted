/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useBrands } from "../../../data/useBrands";
import useAuth from "../../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

export default function BrandList() {
  const { user } = useAuth();
  const { data: brands, isLoading, error } = useBrands(user?.access);

  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    // Check if the user previously chose to hide the modal
    const dontShow = localStorage.getItem("hideAnnouncementModal");
    if (dontShow === "true") {
      setShowModal(false);
    }
  }, []);

  const handleBrandClick = (brand) => {
    const dontShowAgain = localStorage.getItem("hideAnnouncementModal");

    // Save brand info to localStorage
    localStorage.setItem("selectedBrand", JSON.stringify(brand));

    if (dontShowAgain === "true") {
      // Proceed without showing modal
      console.log("Modal skipped. Brand stored.");
      localStorage.setItem("hideAnnouncementModal", "false");
      
    } else {
      // Show modal
       localStorage.setItem("hideAnnouncementModal", "true");
      setSelectedBrand(brand);
      setShowModal(true);
    }
  
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBrand(null);
    navigate("/device/device-information");
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("hideAnnouncementModal", "true");
    setShowModal(false);
    navigate("/device/device-information");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading brands!</p>;

  return (
    <>
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-4">Available Brands</h2>
        <ul className="bg-green-100 text-green-600 font-bold m-2">
          <div className="grid grid-cols-1 gap-4">
            {brands?.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleBrandClick(brand)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={brand.brand_image}
                    alt={brand.brand_name}
                    className="w-20 h-20 object-contain"
                  />
                  <p className="text-base font-medium">{brand.brand_name}</p>
                </div>
                <NavLink
                  to="/device/device-information"
                  className="text-3xl text-gray-400 font-bold"
                >
                  &gt;
                </NavLink>
              </div>
            ))}
          </div>
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="text-green-600 text-2xl font-bold mb-2">✓</div>
            <h3 className="text-lg font-semibold mb-2">Announcement</h3>
            <p className="text-sm mb-4">
              Based on Sales & Purchase Policy, REConnect currently supports
              devices from Singapore, Malaysia, and one other country. <br />
              For further information, please contact our support team via:{" "}
              <span className="text-blue-600 font-medium">
                support@asiacarbonx.com
              </span>
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Close
              </button>
              <button
                onClick={handleDontShowAgain}
                className="bg-gray-200 text-sm text-gray-600 py-1 px-3 rounded hover:bg-gray-300"
              >
                Don't show this again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
