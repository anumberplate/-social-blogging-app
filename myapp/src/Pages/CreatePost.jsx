import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/posts/${res.data._id}`); 
    } catch (err) {
      console.error(err);
      setError("Failed to create post.");
    }
  };

  return (
    <section className="min-h-screen mt-36 px-6 font-inter">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <form onSubmit={handleCreatePost} className="w-full max-w-2xl">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-400 rounded-md"
          required
        />

        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-400 rounded-md"
          rows="10"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Publish Post
        </button>
      </form>
    </section>
  );
}
