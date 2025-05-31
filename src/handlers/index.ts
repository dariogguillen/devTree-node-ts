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
  const bearer = req.headers.authorization;
  const [, token] = bearer ? bearer.split(" ") : [];

  if (!bearer || !token) {
    const error = new Error("Unauthorized");
    res.status(401).json({ error: error.message });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
    const verify = verifyJWT(token);
    if (typeof verify === "object" && verify.id) {
      const user = await User.findById(verify.id).select("-password");
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ response: "User found", user });
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};
