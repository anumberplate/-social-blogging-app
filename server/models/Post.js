// models/postschema.js
const mongoose = require('mongoose');
const { commentSchema } = require('./Comment.js');


const postSchema = new mongoose.Schema({
  userprofilephoto: String,
  username: String,
  title: String,
  content: String,
  likes: {
    type: Number,
    default: 0
  },
  time: String, 
  replies: [String], 
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
