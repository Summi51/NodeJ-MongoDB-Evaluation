const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,

    content: String,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    tags: [String],

    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports =
mongoose.model("Post", postSchema);