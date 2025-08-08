const Post = require('../models/Post');

const generateRandomImageUrl = () => {
  const width = 800;
  const height = 400;
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/id/${randomId}/${width}/${height}`;
};

const updateEmptyPostImages = async () => {
  try {
    const postsWithoutImages = await Post.find({ $or: [{ coverImage: { $exists: false } }, { coverImage: "" }] });

    for (const post of postsWithoutImages) {
      post.coverImage = generateRandomImageUrl();
      await post.save();
    }

    console.log(`${postsWithoutImages.length} posts updated with random images.`);
  } catch (err) {
    console.error("Error updating empty images:", err);
  }
};

module.exports = updateEmptyPostImages;
