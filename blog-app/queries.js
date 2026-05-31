const Post = require("./models/Post");
const User = require("./models/User");

/*
1. Posts > 10 likes
*/
async function postsMoreThan10Likes() {
  return Post.find(
    { likes: { $gt: 10 } },
    "title likes createdAt"
  ).sort({ likes: -1 });
}

/*
2. Gmail users
*/
async function gmailUsers() {
  return User.find({
    email: /@gmail\.com$/,
    role: "user"
  });
}

/*
3. Posts by tags
*/
async function postsByTags() {
  return Post.find({
    tags: {
      $in: [/nodejs/i, /mongodb/i]
    }
  });
}

/*
4. Increment likes
*/
async function incrementLikes(authorId) {
  return Post.updateMany(
    { author: authorId },
    { $inc: { likes: 1 } }
  );
}

/*
5. Delete old posts
*/
async function deleteOldPosts() {
  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30
  );

  return Post.deleteMany({
    likes: 0,
    createdAt: { $lt: thirtyDaysAgo }
  });
}

/*
6. Post Count Per Author
*/
async function postCountPerAuthor() {
  return Post.aggregate([
    {
      $group: {
        _id: "$author",
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $project: {
        count: 1,
        authorName: {
          $arrayElemAt: ["$author.name", 0]
        }
      }
    }
  ]);
}

/*
7. Top 3 Authors By Likes
*/
async function top3AuthorsByLikes() {
  return Post.aggregate([
    {
      $group: {
        _id: "$author",
        totalLikes: {
          $sum: "$likes"
        }
      }
    },
    { $sort: { totalLikes: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "author"
      }
    }
  ]);
}

/*
8. Monthly Activity
*/
async function monthlyPostActivity() {
  return Post.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
}

/*
9. Tag Popularity
*/
async function tagPopularity() {
  return Post.aggregate([
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ]);
}

/*
10. Authors With No Posts
*/
async function authorsWithNoPosts() {
  return User.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts"
      }
    },
    {
      $match: {
        posts: { $eq: [] }
      }
    }
  ]);
}

module.exports = {
  postsMoreThan10Likes,
  gmailUsers,
  postsByTags,
  incrementLikes,
  deleteOldPosts,
  postCountPerAuthor,
  top3AuthorsByLikes,
  monthlyPostActivity,
  tagPopularity,
  authorsWithNoPosts
};