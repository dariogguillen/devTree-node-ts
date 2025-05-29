import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "./handlers";

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
  createAccount,
);

export default router;
