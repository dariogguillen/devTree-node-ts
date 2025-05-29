import { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  // handle errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    const { email, username, password } = req.body;
    const emailExist = await User.findOne({ email });
    const userName = slug(username, "");
    const usernameExist = await User.findOne({ username: userName });

    if (emailExist) {
      const error = new Error("Email already in used");
      res.status(409).json({ error: error.message });
    } else if (usernameExist) {
      const error = new Error("Username already in used");
      res.status(409).json({ error: error.message });
    } else {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.username = userName;
      await user.save();

      res.status(201).json({ response: "User created successfully" });
    }
  }
};
