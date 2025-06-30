import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", (req, res) => {
  //SIGNUP
  signup(req, res);
});

router.post("/login", (req, res) => {
  //LOGIN
  login(req, res);
});

export default router;
