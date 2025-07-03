import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const CategoryContext = createContext();
const backendUrl = "http://localhost:8000/api/categories";
export const CategoryContextProvider = ({ children }) => {
  const [allCategoriesById, setAllCategoriesById] = useState([]);

  // CategoryContext.js
  const handleAddCategory = async (formData) => {
    try {
      const res = await axios.post(`${backendUrl}/add-category`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        return res.data.category; // ✅ return new category
      }
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
      throw error; // ✅ throw so caller knows it failed
    }
  };

  //   Get all categories

  // get category by id
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/me`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setAllCategoriesById(res.data.data);
        getAllCategories();
      }
    } catch (error) {
      console.error("Failed to category", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  // update category
  const handleEditCategory = async (formData, id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/categories/edit-category/${id}`,
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Category updated");
      setAllCategoriesById(res.data.category);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete category
  const handleCategoryDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/categories/${id}`,
        { withCredentials: true }
      );
      setAllCategoriesById((prev) => prev.filter((post) => post._id !== id));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        handleAddCategory,
        getAllCategories,
        handleEditCategory,
        handleCategoryDelete,
        allCategoriesById,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
