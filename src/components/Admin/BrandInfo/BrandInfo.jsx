import React, { useState } from "react";
import { FaSpinner, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useBrands } from "../../../data/useBrands";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function BrandInfo() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useBrands(user?.access);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [id, setId] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form, setForm] = useState({ brand_name: "", brand_image: null });

  if (!user) {
    return <p className="text-center text-red-500 mt-4">❌ User not found.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <FaSpinner className="text-blue-600 text-4xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">❌ Failed to load data.</p>
    );
  }

  // ✅ Open modal for add or edit
  const openModal = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setForm({ brand_name: brand.brand_name, brand_image: null });
    } else {
      setEditingBrand(null);
      setForm({ brand_name: "", brand_image: null });
    }
    setModalOpen(true);
  };

  // ✅ Handle form submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("brand_name", form.brand_name);
      if (form.brand_image) {
        formData.append("brand_image", form.brand_image);
      }

      if (editingBrand) {
        // update
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/brand-info/${editingBrand.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("✅ Brand updated successfully");
      } else {
        // add new
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/brand-info/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("✅ Brand added successfully");
      }

      setModalOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save brand");
    }
  };

  // ✅ Delete Brand
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/brand-info/${id}/`,
        { headers: { Authorization: `Bearer ${user?.access}` } }
      );
      toast.success("🗑️ Brand deleted successfully");
      setModalOpenDelete(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete brand");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📦 Brand Management</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal()}
        >
          <FaPlus /> Add Brand
        </button>
      </div>

      {/* Brands Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Brand Name</th>
              <th className="px-4 py-2 text-left">Brand Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((brand) => (
              <tr key={brand.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{brand.id}</td>
                <td className="px-4 py-2">{brand.brand_name}</td>
                <td className="px-4 py-2">
                  <img
                    src={brand.brand_image}
                    alt={brand.brand_name}
                    className="h-10 w-20 object-contain"
                  />
                </td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => openModal(brand)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => {
                      setId(brand.id);
                      setModalOpenDelete(true);
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingBrand ? "✏️ Edit Brand" : "➕ Add Brand"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Brand Name"
                className="border px-3 py-2 rounded"
                value={form.brand_name}
                onChange={(e) =>
                  setForm({ ...form, brand_name: e.target.value })
                }
                required
              />
              <input
                type="file"
                accept="image/*"
                className="border px-3 py-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, brand_image: e.target.files[0] })
                }
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingBrand ? "Save Changes" : "Add Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalOpenDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative text-center">
            <h2 className="text-xl font-semibold mb-6">
              ⚠️ Are you sure you want to delete this brand?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setModalOpenDelete(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
