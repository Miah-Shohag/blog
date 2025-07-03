import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategories,
  updateCategory,
} from "../controllers/categoryControllers.js";
import { adminOnly, Protected } from "../middlewares/protected.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", Protected, createCategory);
categoryRouter.get("", Protected, adminOnly, getAllCategories);
categoryRouter.get("/me", Protected, getCategories);
categoryRouter.put("/edit-category/:id", Protected, updateCategory);
categoryRouter.delete("/:id", Protected, deleteCategory);

export default categoryRouter;
