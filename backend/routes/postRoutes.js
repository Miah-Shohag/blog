import { Router } from "express";
import {
  addPost,
  getPosts,
  getSinglePost,
  editPost,
  deletePost,
  getPostsByUser,
} from "../controllers/postControllers.js";
import { Protected, adminOnly } from "../middlewares/protected.js";
import { multerErrorHandler, upload } from "../middlewares/uploadImage.js";

const postRouter = Router();

postRouter.post(
  "/create-post",
  Protected,
  upload.single("image"),
  multerErrorHandler,
  addPost
);
postRouter.get("", Protected, adminOnly, getPosts);
postRouter.get("/me", Protected, getPostsByUser);
postRouter.get("/me/:id", Protected, getSinglePost);
postRouter.put("/edit-post/:id", Protected, editPost);
postRouter.delete("/:id", Protected, deletePost);

export default postRouter;
