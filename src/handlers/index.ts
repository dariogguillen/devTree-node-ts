import { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
  const { email, username } = req.body;
  const emailExist = await User.findOne({ email });
  const usernameExist = await User.findOne({ username });

  if (emailExist || usernameExist) {
    const error = new Error("Username or email already in used");
    res.status(409).json({ error: error.message });
  } else {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ response: "User created successfully" });
  }
};
