const Post = require("./models/Post");
const User = require("./models/User");

// 1
exports.postsMoreThan10Likes = async () => {
  return Post.find(
    { likes: { $gt: 10 } },
    "title likes createdAt"
  ).sort({ likes: -1 });
};

// 2
exports.gmailUsers = async () => {
  return User.find({
    email: /@gmail\.com$/,
    role: "user"
  });
};

// 3
exports.nodeMongoPosts = async () => {
  return Post.find({
    tags: {
      $in: [/nodejs/i, /mongodb/i]
    }
  });
};

// 4
exports.incrementLikes = async (authorId) => {
  return Post.updateMany(
    { author: authorId },
    { $inc: { likes: 1 } }
  );
};

// 5
exports.deleteOldPosts = async () => {

  const date = new Date();

  date.setDate(date.getDate() - 30);

  return Post.deleteMany({
    likes: 0,
    createdAt: { $lt: date }
  });
};