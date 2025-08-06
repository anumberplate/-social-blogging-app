const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getPaginatedPosts, 
  createPost, 
  updatePost, 
  deletePost, 
  getPostById, 
  addCommentToPost
} = require('../controllers/postController');


router.get('/', getPaginatedPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.get('/:id', getPostById);
router.post('/:id/comments', auth, addCommentToPost);


module.exports = router;
