import { Request, Response } from "express";
import User, { IUser } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "User doesn't exist" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ error: "Invalid Credentials" });
    // sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
