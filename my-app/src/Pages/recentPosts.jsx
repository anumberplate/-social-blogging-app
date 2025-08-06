import React from "react";
import { FaHeart, FaComment, FaShare, FaHome, FaBell, FaUser, FaPlus } from "react-icons/fa";

const stories = [
  { name: "Maggie-robo" },
  { name: "Winky-robo" },
  { name: "Juma-robo" },
  { name: "Kiki-robo" },
  { name: "Marie-robo" },
];

const posts = [
  {
    user: "Jack robo",
    time: "13 mins ago",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    caption:
      "Liam often escapes to the forest, where nature’s silence speaks louder than any words.",
  },
  {
    user: "Maya dreams",
    time: "15 min ago",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    caption: "",
  },
];

export default function FeedPage() {
  return (
    <main className="w-full max-w-md mx-auto pt-24 z-20 bg-white dark:bg-black min-h-screen pb-24">
      {/* Stories Section */}
      <section className="px-4 pt-4">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
          June Kwamboka <span className="text-yellow-400">●</span>
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                {story.name.charAt(0)}
              </div>
              <p className="text-xs text-black dark:text-white mt-1 text-center whitespace-nowrap">
                {story.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section className="px-4 mt-6 space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow">
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                  {post.user.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-black dark:text-white">
                    {post.user}
                  </p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <span className="text-gray-400 font-bold">...</span>
            </div>
            <img
              src={post.img}
              alt="Post"
              className="w-full h-60 object-cover mt-4 rounded-xl"
            />
            <div className="flex items-center gap-4 px-4 py-2">
              <FaHeart className="text-pink-600" />
              <span className="text-sm text-gray-700 dark:text-white">31 likes</span>
            </div>
            {post.caption && (
              <p className="px-4 pb-4 text-sm text-gray-800 dark:text-white">
                {post.caption}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-12 h-12 bg-blue-600 text-white text-xl rounded-full shadow-lg flex items-center justify-center z-50">
        <FaPlus />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 z-50">
        <FaHome className="text-xl text-gray-700 dark:text-white" />
        <FaHeart className="text-xl text-gray-700 dark:text-white" />
        <FaPlus className="text-xl text-gray-700 dark:text-white" />
        <FaBell className="text-xl text-gray-700 dark:text-white" />
        <FaUser className="text-xl text-gray-700 dark:text-white" />
      </nav>
    </main>
  );
}
