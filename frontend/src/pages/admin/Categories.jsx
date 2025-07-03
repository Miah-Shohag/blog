import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { CategoryContext } from "../../hooks/CategoryContext";

const Categories = () => {
  const {
    getAllCategories,
    setAllCategoriesById,
    allCategoriesById,
    handleEditCategory,
    handleCategoryDelete,
  } = useContext(CategoryContext);

  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleEditCategory(formData, editCategory._id);
      setEditCategory(null);
      setFormData({
        name: "",
        description: "",
      });
      setLoading(false);
    } catch (error) {
      toast.error("Update failed", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await handleCategoryDelete(id);
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                S/N
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Author
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {allCategoriesById?.map((cat, index) => (
              <tr key={cat._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-secondary font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-semibold">{cat.name}</td>
                <td className="px-6 py-4 text-sm">
                  {cat.description.substring(0, 30)}...
                </td>
                <td className="px-6 py-4 text-xs text-green-700 font-medium">
                  {cat.user?.username}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 w-full items-center justify-center flex gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 text-blue-600 bg-blue-200 hover:bg-blue-300 text-xs font-medium  rounded-full  transition-colors duration-300 ease-in-out cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="px-3 py-1 text-red-600 bg-red-200 rounded-full hover:bg-red-300 font-medium text-xs transition-colors duration-300 ease-in-out cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {categoryToDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <span className="flex justify-center items-center mb-2">
              <ImCancelCircle size={28} className="text-red-600" />
            </span>
            <span className="text-center text-xl block font-bold">
              Are you sure?
            </span>
            <span className="text-xs block text-center my-3">
              Are you sure you want to delete the task from the record? This
              process cannot be undone.
            </span>
            <div className="text-right flex gap-5 justify-center items-center mt-5">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-3 py-1 text-sm font-medium capitalize bg-gray-200 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(categoryToDelete._id)}
                disabled={loading}
                className={`px-3 py-1 text-sm font-medium capitalize bg-red-600 text-white rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editCategory && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative"
          >
            <button
              type="button"
              onClick={() => setEditCategory(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
              >
                {loading ? "Updating" : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
