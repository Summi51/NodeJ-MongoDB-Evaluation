const Post = require("../models/Post");

exports.createPost = async (req, res) => {

  const post = await Post.create({
    ...req.body,
    author: req.user.id
  });

  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {

  const {
    tag,
    page = 1,
    limit = 5
  } = req.query;

  let filter = {};

  if (tag) {
    filter.tags = tag;
  }

  const total =
    await Post.countDocuments(filter);

  const posts = await Post.find(filter)
    .populate("author", "name email")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    posts
  });
};

exports.getPost = async (req, res) => {

  const post = await Post.findById(
    req.params.id
  ).populate("author", "name email");

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  res.json(post);
};

exports.updatePost = async (req, res) => {

  const post =
    await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "Post not found"
    });

  if (
    post.author.toString() !== req.user.id
  ) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  Object.assign(post, req.body);

  await post.save();

  res.json(post);
};

exports.deletePost = async (req, res) => {

  const post =
    await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({
      message: "Post not found"
    });

  if (
    post.author.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  await post.deleteOne();

  res.json({
    message: "Post deleted"
  });
};