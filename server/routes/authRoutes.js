const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user', authMiddleware, (req, res) => {
  res.json({
    message: "User authenticated",
    user: req.user 
  });
});

module.exports = router;
