const Post = require("../models/Post");

const createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    author: req.user.id
  });

  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const { tag } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const query = {};

  if (tag) {
    query.tags = tag;
  }

  const total = await Post.countDocuments(query);

  const posts = await Post.find(query)
    .populate("author", "name email")
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    results: posts
  });
};

const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email");

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found"
    });
  }

  res.json(post);
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found"
    });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found"
    });
  }

  const owner =
    post.author.toString() === req.user.id;

  const admin = req.user.role === "admin";

  if (!owner && !admin) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  await post.deleteOne();

  res.json({
    message: "Post Deleted"
  });
};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost
};