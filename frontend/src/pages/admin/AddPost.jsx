import React, { useContext, useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import GlobalButton from "../../components/GlobalButton";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CategoryContext } from "../../hooks/CategoryContext";

const AddPost = () => {
  const { handleAddCategory, allCategoriesById, setAllCategoriesById } =
    useContext(CategoryContext);

  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [addToCategory, setAddToCategory] = useState(false);

  const [catFormData, setCatFormData] = useState({
    name: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    status: "draft",
    content: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/categories/me", {
        withCredentials: true,
      });
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/posts/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Post created successfully!");
      setFormData({
        title: "",
        slug: "",
        category: "",
        tags: "",
        status: "draft",
        content: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  const handleCatChange = (e) => {
    setCatFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newCategory = await handleAddCategory(catFormData);

      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
        setCatFormData({ name: "", description: "" });
        setAddToCategory(false); // ✅ correct modal close
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[80%] mx-auto p-6 bg-white rounded shadow mt-6">
      <div className="flex items-center gap-3 justify-between">
        <h2 className="text-2xl font-semibold">Add New Post</h2>
        <Link
          to="/dashboard/posts"
          className="bg-secondary px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-lg shadow-secondary/30 my-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        >
          All Posts
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <InputField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Enter post title"
        />

        <InputField
          label="Slug"
          type="text"
          name="slug"
          readOnly
          value={formData.slug}
          className="w-full border p-2 rounded"
        />
        <p className="text-right text-xs font-medium mt-1">
          Slug will be generated from title
        </p>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-48 h-32 object-cover border rounded"
            />
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        {/* Category */}
        <div className="flex justify-between items-center gap-10 w-full">
          <div className="flex-1 w-full">
            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories
                .filter((cat) => cat && cat._id && cat.name)
                .map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setAddToCategory(true)}
              className="text-sm bg-blue-500 text-white px-3 py-2 rounded shadow hover:bg-blue-600 transition"
            >
              Add Category
            </button>
            <small className="text-xs text-green-600">
              New category will appear in the dropdown instantly.
            </small>
          </div>
        </div>

        {/* Tags */}
        <InputField
          label="Tags"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="e.g. react, css, nodejs"
        />

        {/* Status */}
        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "draft", label: "Draft" },
            { value: "pending", label: "Pending" },
            { value: "published", label: "Published" },
          ]}
        />

        <GlobalButton
          type="submit"
          title={loading ? "Submitting..." : "Add Post"}
          disabled={loading}
        />
      </form>

      {/* Add Category Modal */}
      {addToCategory && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => setAddToCategory(false)} // close on outside click
        >
          <form
            className="flex flex-col gap-4 bg-white p-6 rounded-lg w-full max-w-md shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
            onSubmit={handleCategorySubmit}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-lg">Add Category</span>
              <button
                type="button"
                onClick={() => setAddToCategory(false)}
                className="text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <InputField
              label="Category Name"
              type="text"
              name="name"
              value={catFormData.name}
              onChange={handleCatChange}
              placeholder="Enter category name"
            />

            <div>
              <label className="block text-sm font-medium">
                Description (optional)
              </label>
              <textarea
                name="description"
                value={catFormData.description}
                onChange={handleCatChange}
                className="w-full text-sm p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:border-secondary"
                rows="3"
                placeholder="Add some details"
              />
            </div>

            <GlobalButton
              type="submit"
              title={loading ? "Adding..." : "Add Category"}
              disabled={loading}
            />
          </form>
        </div>
      )}

      {/* Animation Styles */}
      <style>
        {`
          .animate-scale-in {
            animation: scaleIn 0.25s ease-out;
          }
          @keyframes scaleIn {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AddPost;
