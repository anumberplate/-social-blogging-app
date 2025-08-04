const Post = require('../models/Post');

exports.getPaginatedPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } }, // Optional: newest first
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $unwind: '$authorDetails'
      },
      {
        $project: {
          title: 1,
          content: 1,
          createdAt: 1,
          'authorDetails.username': 1,
          'authorDetails.email': 1
        }
      }
    ]);

    const total = await Post.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      posts
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to update this post' });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: 'Post not found' });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to delete this post' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};