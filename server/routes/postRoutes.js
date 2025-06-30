import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", (req, res) => {
  //GET ALL POSTS
  getAllPosts(req, res);
});

router.post("/", (req, res) => {
  //CREATE A POST
  createPost(req, res);
});

router.patch("/:id", (req, res) => {
  //UPDATE A POST
  updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  //DELETE A POST
  deletePost(req, res);
});

export default router;
