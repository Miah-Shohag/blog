import { Category } from "../models/categoryModel.js";

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const newCategory = await Category.create({
      name,
      description,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Opps! You haven't created any categories",
      });
    }
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      user: req.user.id || user.role === "admin",
    }).populate("user", "username email");
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Opps! You haven't created any categories",
      });
    }
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not author of this category!",
      });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    return res.status(200).json({
      success: true,
      message: "Category has been updated!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.user._id.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "You are not author of this category!",
      });
    }

    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Category has been deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createCategory,
  getAllCategories,
  getCategories,
  updateCategory,
  deleteCategory,
};
