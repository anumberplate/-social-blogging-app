const Post = require('../models/Post');
const { Comment } = require('../models/Comment');
const User = require('../models/User');
const mongoose = require('mongoose');

// Get paginated posts with author and comment count
exports.getPaginatedPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.aggregate([
      // Sort newest first
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      // Join user details
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails"
        }
      },
      { $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true } },

      // Join comment details
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentDetails"
        }
      },

      // Add computed fields
      {
        $addFields: {
          commentCount: {
            $cond: {
              if: { $isArray: "$commentDetails" },
              then: { $size: "$commentDetails" },
              else: 0
            }
          },
          likesCount: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: 0
            }
          },
          authorInfo: {
            _id: "$authorDetails._id",
            username: "$authorDetails.username",
            profilePhoto: "$authorDetails.profilePhoto"
          }
        }
      },

      // Clean output
      {
        $project: {
          authorDetails: 0,
          likes: 0,            // Remove raw likes array
          commentDetails: 0    // Optional: also remove comment details if only count needed
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
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }

};
function getRandomImage() {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${randomId}/800/600`;
}
//  Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const userId = req.user._id;

    const newPost = new Post({
      title,
      content,
      image: image || getRandomImage(),  // <- Use provided or fallback image
      author: userId,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Update post (only by author)
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

//  Delete post (only by author)
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

// Get a single post by ID (+ increment views)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // 👈 increment views
      { new: true }
    )
      .populate('author', 'username profilePhoto')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username profilePhoto' }
      });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};
exports.incrementViews = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'View count incremented', views: post.views });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing views', error });
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

// Toggle like on a post (add/remove)
exports.toggleLike = async (req, res) => {
  const userId = req.user._id;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likesCount: post.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error });
  }
};
