import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react"
export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!token) return;
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPost(prev => ({ ...prev, likesCount: res.data.likesCount }));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}/comments`,
        { text: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost(prev => ({
        ...prev,
        comments: [...(prev.comments || []), res.data],
        commentCount: (prev.commentCount || 0) + 1
      }));
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;
  if (!post) return <div className="p-4">Post not found.</div>;

  return (
    <section className="max-w-4xl mx-auto mt-48 px-4 py-12 font-inter">
      <div className="bg-[#F9F9F9] dark:bg-[#1e1e1e] rounded-2xl md:text-lg leading-snug">
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4">
          <h1 className="font-bold font-martel mt-4 mb-4 text-[1.5rem] md:text-[2rem] dark:text-white">
            {post.title}
          </h1>
          <p className="mb-6 text-[0.9rem] md:text-[1rem] dark:text-gray-300 whitespace-pre-line">
            {post.content}
          </p>
          <div className="flex flex-row gap-4 mb-4">
            <button onClick={handleLike} className="md:text-2xl">
              <FontAwesomeIcon icon={faHeartRegular} className="cursor-pointer hover:text-red-500" />
            </button>
            <button className="md:text-2xl">
              <FontAwesomeIcon icon={faCommentRegular} className="cursor-pointer hover:text-blue-500" />
            </button>
            <button className="md:text-2xl">
              <FontAwesomeIcon icon={faShare} className="cursor-pointer hover:text-green-500" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 mb-6 font-bold text-[0.8rem] md:text-[1rem] dark:text-white">
          <span>By {post.authorInfo?.username || 'Unknown'}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString()} · {post.views || 0} views · {post.likesCount || 0} likes
          </span>
        </div>

        <div className="px-4 py-4 text-[0.8rem]">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Comments ({post.commentCount || post.comments?.length || 0})
          </h2>
          <ul>
            {post.comments?.map((c, i) => (
              <li key={i} className="mb-4">
                <div className="flex flex-row gap-x-6">
                  <div className="flex items-start">
                    <div className="overflow-hidden w-12 h-12 rounded-full md:w-16 md:h-16">
                      <img
                        src={c.author?.profilePhoto || '/default-user.jpg'}
                        alt={c.author?.username || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm md:text-[1rem] dark:text-white">
                      {c.author?.username || 'Anonymous'}
                    </h4>
                    <p className="dark:text-gray-300 text-sm md:text-[1rem]">{c.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {token && (
          <form onSubmit={handleCommentSubmit} className="px-4 mt-6">
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 mb-2"
              placeholder="Write a comment…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Add Comment
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
