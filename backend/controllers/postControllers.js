import { Post } from "../models/postModel.js";
import slugify from "slugify";
import User from "../models/userModel.js";

// ========== ADD POST ==========
const addPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, slug, content, category, tags, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const newPost = new Post({
      title,
      slug: slug || slugify(title, { lower: true, strict: true }),
      content,
      image: req.file.path, // Cloudinary image URL
      category,
      tags,
      status: status || "draft",
      author: userId,
    });

    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    return res.status(201).json({
      success: true,
      message: "Post added successfully!",
      post: newPost,
    });
  } catch (error) {
    next(error); // Forward to errorHandler middleware
  }
};

// ========== GET ALL POSTS ==========
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .populate("category", "name");

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// ========== GET USER POSTS ==========
const getPostsByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ author: userId })
      .populate("category", "name")
      .populate("author", "username email");

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// ========== GET SINGLE POST ==========
const getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate("author", "username email")
      .populate("category", "name");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully.",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========== EDIT POST ==========
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, slug, content, category, tags, status } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    post.title = title || post.title;
    post.slug = slug || slugify(post.title, { lower: true, strict: true });
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.status = status || post.status;

    if (req.file) {
      post.image = req.file.path;
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========== DELETE POST ==========
const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.author.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this post.",
      });
    }

    await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: postId },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export {
  addPost,
  getPosts,
  getPostsByUser,
  getSinglePost,
  editPost,
  deletePost,
};
