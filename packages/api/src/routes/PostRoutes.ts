import express from "express";
import upload from "../config/multer.js";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/createPost", upload.single("picture"), createPost);
router.get("/feed", getFeedPosts);
router.get("/feed/userPosts", getUserPosts);
router.get("/like", likePost);

export default router;
