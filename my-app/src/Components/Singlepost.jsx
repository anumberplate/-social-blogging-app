import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';


export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `/api/posts/${id}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data],
      }));

      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!post) return <div className="p-4">Post not found</div>;

  return (
    <section className="max-w-4xl mx-auto mt-48 px-4 py-12 font-inter">
      <div className="bg-[#F9F9F9] dark:bg-[#1e1e1e] text-[0.95rem] md:text-lg rounded-2xl leading-snug">
        {/* Post Image */}
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="px-4">
          <h1 className="font-bold font-martel mt-4 mb-4 text-[1.5rem] md:text-[2rem] dark:text-white">
            {post.title}
          </h1>
          <p className="mb-6 text-[0.9rem] md:text-[1rem] dark:text-gray-300 whitespace-pre-line">
            {post.content}
          </p>

          {/* Meta + Interaction Buttons */}
          <div className="flex flex-row gap-4 mb-12">
            <button className="bg-transparent md:text-2xl">
              <FontAwesomeIcon icon={faHeartRegular} className="cursor-pointer hover:text-red-500" />
            </button>
            <button className="bg-transparent md:text-2xl">
              <FontAwesomeIcon icon={faCommentRegular} className="cursor-pointer hover:text-blue-500" />
            </button>
            <button className="bg-transparent md:text-2xl">
              <FontAwesomeIcon icon={faShare} className="cursor-pointer hover:text-green-500" />
            </button>
          </div>
        </div>

        {/* Author and Stats */}
        <div className="flex justify-between items-center px-4 mb-6 font-bold text-[0.8rem] md:text-[1rem] dark:text-white">
          <span>By {post.author?.username || 'Unknown'}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString()} · {post.views || 0} views
          </span>
        </div>

        {/* Comments */}
        <div className="px-4 py-4 text-[0.8rem]">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Comments ({post.comments?.length || 0})
          </h2>
          <ul>
            {(post.comments || []).map((comment, idx) => (
              <li key={idx} className="mb-4">
                <div className="flex flex-row gap-x-6">
                  {/* Avatar */}
                  <div className="flex items-start">
                    <div className="overflow-hidden w-12 h-12 md:w-16 md:h-16 rounded-full">
                      <img
                        src={comment.userPhoto || '/default-user.jpg'}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div>
                    <h4 className="font-bold mb-1 text-sm md:text-[1rem] dark:text-white">
                      {comment.author?.username || 'Anonymous'}
                    </h4>
                    <p className="dark:text-gray-300 text-sm md:text-[1rem]">{comment.text}</p>
                    <div className="flex justify-between text-sm font-bold mt-1 text-gray-600">
                      <p className = "mr-6">{comment?.hours ?? '--'} hours ago</p>
                      <p className = "mr-6">{comment?.likes ?? 0} likes</p>
                      <button className="hover:underline mr-6">Reply</button>
                    </div>
                  </div>

                  {/* Like button */}
                  <div className="ml-auto">
                    <button>
                      <FontAwesomeIcon icon={faHeartRegular} className="cursor-pointer hover:text-red-500 md:text-xl" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Comment Form */}
        {token && (
          <form onSubmit={handleCommentSubmit} className="px-4 mt-6">
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 mb-2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Add Comment
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
