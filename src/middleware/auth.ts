import type { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid token" });
  }
};
