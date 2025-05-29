import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const emailExist = await User.findOne({ email });
  const usernameExist = await User.findOne({ username });

  if (emailExist || usernameExist) {
    const error = new Error("Username or email already in used");
    res.status(409).json({ error: error.message });
  } else {
    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({ response: "User created successfully" });
  }
};
