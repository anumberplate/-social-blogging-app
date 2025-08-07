const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// Routes
router.get('/', postController.getPaginatedPosts);             // Get all posts 
router.post('/', auth, postController.createPost);             // Create post 
router.put('/:id', auth, postController.updatePost);           // Update post 
router.delete('/:id', auth, postController.deletePost);        // Delete post 
router.get('/:id', postController.getPostById);                // Get single post 
router.patch('/:id/like', auth, postController.toggleLike);    // Toggle like
router.post('/:id/comments', auth, postController.addComment); // Add comment 

module.exports = router;
v