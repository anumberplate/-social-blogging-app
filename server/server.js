const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.error(err));
