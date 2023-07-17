import { Request, Response } from "express";
import User from "../models/user.js";
import Post from "../models/post.js";
export async function createPost(req: Request, res: Response) {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
    });
    post.save();
    const feed = Post.find();
    res.status(201).json(feed);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}
export async function getFeedPosts(req, res) {
  try {
    //  TODO: filter feed posts for user's friends alone
    const feed = Post.find();
    res.status(201).json(feed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getUserPosts(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const feed = Post.find({ userId });
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function likePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
