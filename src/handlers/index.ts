import { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT, verifyJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const emailExist = await User.findOne({ email });
  const userName = slug(username, "");
  const usernameExist = await User.findOne({ username: userName });

  if (emailExist) {
    const error = new Error("Email already in used");
    res.status(409).json({ error: error.message });
    return;
  }
  if (usernameExist) {
    const error = new Error("Username already in used");
    res.status(409).json({ error: error.message });
    return;
  }
  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.username = userName;
  await user.save();

  res.status(201).json({ response: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const passwordIsValid = await checkPassword(password, user.password);
  if (!passwordIsValid) {
    res.status(401).json({ error: "Password not valid" });
    return;
  }
  const token = generateJWT({ id: user._id });
  res.status(200).send({ response: "User logged in successfully", token });
};

export const getUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json({ response: "User found", user: req.user });
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { description } = req.body;

    const userName = slug(req.body.username, "");
    const usernameExist = await User.findOne({ username: userName });
    if (usernameExist && usernameExist.email !== req.user.email) {
      const error = new Error("Username already in used");
      res.status(409).json({ error: error.message });
      return;
    }

    req.user.description = description;
    req.user.username = userName;

    await req.user.save();

    res.status(200).json({ response: "User profile updated successfully" });
  } catch (e) {
    const error = new Error("An error occurred");
    res.status(500).json({ error: error.message });
    return;
  }
};
