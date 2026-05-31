const express = require("express");

const auth = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.post("/", auth, createPost);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;