const express = require('express');
const { getPaginatedPosts } = require('../controllers/postController');
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.get('/posts', getPaginatedPosts);

module.exports = router;
