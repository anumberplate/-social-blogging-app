const Post = require('../models/Post');
const { Comment } = require('../models/Comment');
const User = require('../models/User');
const mongoose = require('mongoose');

// Get paginated posts with author and comment count
exports.getPaginatedPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const rawPosts = await Post.find();
  console.log("Raw posts:", rawPosts);
  try {
    const posts = await Post.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails"
      }
    },
    { $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "comments", // 👈 matches the name of your MongoDB collection (usually lowercase plural of model)
        localField: "comments",
        foreignField: "_id",
        as: "commentDetails"
      }
    },
    {
      $addFields: {
        commentCount: { $size: "$commentDetails" }
      }
    },
    {
      $project: {
        commentDetails: 0, 
        likes: 0
      }
    }
   ]);


    const total = await Post.countDocuments();

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const newPost = new Post({
      title,
      content,
      author: userId,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

// Get a single post by ID with populated author and comments
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("author", "username profilePhoto")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username profilePhoto" }
      });

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

// Add a comment to a post
exports.addCommentToPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = await Comment.create({
      text,
      author: req.user.id,
      post: id,
    });

    post.comments.push(newComment._id);
    await post.save();

    const populatedComment = await newComment.populate("author", "username profilePhoto");

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
