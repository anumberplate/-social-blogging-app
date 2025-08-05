const { signup, login, resetPassword } = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const User = require('../models/User'); // make sure this is imported

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // hide password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("GET /me error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword); 

module.exports = router;
