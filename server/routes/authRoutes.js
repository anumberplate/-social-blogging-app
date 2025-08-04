const { signup, login, resetPassword } = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user', authMiddleware, (req, res) => {
  res.json({
    message: "User authenticated",
    user: req.user 
  });
});


router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword); 

module.exports = router;
