require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const updateEmptyPostImages = require('./utils/fixImage');
app.use(cors({
  origin: '*', 
}));

app.use(express.json());

app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});


app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log("MongoDB connected successfully");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

app.get('/api/utils/fix-images', async (req, res) => {
  await updateEmptyPostImages();
  res.send("Updated empty post images.");
});