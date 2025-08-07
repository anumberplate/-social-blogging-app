const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: String,
  content: String,

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Optional if you're okay duplicating some fields for performance:
  username: String,
  userprofilephoto: String,

}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema); 