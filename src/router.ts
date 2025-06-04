import { Router } from "express";
import { body } from "express-validator";
import {
  createAccount,
  getUser,
  getUserByUsername,
  login,
  searchUsername,
  updateProfile,
  uploadImage,
} from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticateToken } from "./middleware/auth";

const router = Router();

/** Authentication / Register */

router.post(
  "/auth/register",
  body("name").notEmpty().withMessage("Not empty name."),
  body("lastName").notEmpty().withMessage("Not empty lastName."),
  body("username").notEmpty().withMessage("Not empty username."),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 12 })
    .withMessage("Password length min 12 characters"),
  handleInputErrors,
  createAccount,
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Not empty password"),
  handleInputErrors,
  login,
);

router.get("/user", authenticateToken, getUser);

router.patch(
  "/user",
  body("username").notEmpty().withMessage("Not empty username."),
  handleInputErrors,
  authenticateToken,
  updateProfile,
);

router.post("/user/image", authenticateToken, uploadImage);

router.get("/:username", getUserByUsername);

router.post(
  "/search",
  body("username").notEmpty().withMessage("Not empty username."),
  handleInputErrors,
  searchUsername,
);

export default router;
