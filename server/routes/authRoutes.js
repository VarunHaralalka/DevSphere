import express from "express";
import { signup, login } from "../controllers/authController.js";
import { signupValidation } from "../middleware/signUpValidation.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/signup", validate(signupValidation), signup);
router.post("/login", login);

export default router;
