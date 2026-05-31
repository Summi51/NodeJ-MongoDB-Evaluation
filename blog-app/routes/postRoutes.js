const router = require("express").Router();

const auth =
require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;