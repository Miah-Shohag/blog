import { Router } from "express";
import {
  getSingleUser,
  getUsers,
  login,
  logOut,
  register,
  updatePassword,
  uploadImage,
  userDelete,
  userUpdate,
} from "../controllers/userControllers.js";
import { adminOnly, Protected } from "../middlewares/protected.js";
import { upload } from "../middlewares/uploadImage.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logOut);
userRouter.get("/me", Protected, getSingleUser);
userRouter.put("/me/profile", Protected, upload.single("image"), uploadImage);
userRouter.get("", Protected, adminOnly, getUsers);
userRouter.put("/me/:id", Protected, userUpdate);
userRouter.put("/password-update", Protected, updatePassword);
userRouter.delete("/me/:id", Protected, userDelete);

export default userRouter;
