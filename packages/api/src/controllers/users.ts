import { Request, Response } from "express";
import User from "../models/user.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user.friends) {
      res.status(200).send([]);
    }
    const friends = await Promise.all(
      user.friends.map((friend) => User.findById(friend))
    );
    const formattedFriends = friends.map(({ _id, firstName, lastName }) => {
      return { _id, firstName, lastName };
    });
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const patchFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const friendId: string = req.query.friendId as string;
    if (!friendId) {
      res.status(400).json({ error: "Invalid/empty friendID received" });
    }
    const [user, friendUser] = await Promise.all([
      User.findById(id),
      User.findById(friendId),
    ]);
    // Error thrown if either of the ID doesn't exist
    user.friends.push(friendId);
    friendUser.friends.push(id);
    user.friends = [...new Set(user.friends)];
    friendUser.friends = [...new Set(friendUser.friends)];
    user.save();
    friendUser.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const friendId: string = req.query.friendId as string;
    if (!friendId) {
      res.status(400).json({ error: "Invalid/empty friendID recieved" });
    }
    const [user, friendUser] = await Promise.all([
      User.findById(id),
      User.findById(friendId),
    ]);
    user.friends = user.friends.filter((fid) => fid !== friendId);
    friendUser.friends = friendUser.friends.filter((fid) => fid !== id);
    user.save();
    friendUser.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
