import express from "express";
import { fetchUserInfo } from "../controllers/userInfoController.js";

const router = express.Router();

router.get("/:user_id", (req, res) => fetchUserInfo(req, res));

export default router;
