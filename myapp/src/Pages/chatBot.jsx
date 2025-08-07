import React, { useState } from 'react';
import {
  FaBars,
  FaRegCommentDots,
  FaSearch,
  FaBook,
  FaRobot,
  FaPaperPlane,
} from 'react-icons/fa';
import { sendMessageToBot } from '${import.meta.env.VITE_API_URL}/api/index';

export default function ChatBotUI() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'You', text: input };
    setChat((prev) => [...prev, userMsg]);
    setLoading(true);
    setError('');

    try {
      const botReply = await sendMessageToBot(input);
      setChat((prev) => [...prev, { sender: 'Bot', text: botReply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white text-black m42t-">
      {/* Sidebar */}
      <aside className="w-60 border-r p-4 flex flex-col justify-between">
        <div>
          <button className="mb-6">
            <FaBars />
          </button>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 font-semibold">
              <FaRegCommentDots /> New chat
            </li>
            <li className="flex items-center gap-2">
              <FaSearch /> Search chats
            </li>
            <li className="flex items-center gap-2">
              <FaBook /> Library
            </li>
            <li className="flex items-center gap-2">
              <FaRobot /> Writer Agent
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">chats</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>Process of managing tasks</li>
              <li>Sleeping routine every day</li>
              <li>Nature images as profile</li>
              <li>Averaging number of students</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <img
            src="https://via.placeholder.com/30"
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          Free
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="font-semibold text-lg">Writer Agent</h2>
          <button className="text-sm text-blue-600 font-medium">Share</button>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`text-sm p-3 rounded-2xl max-w-sm ${
                msg.sender === 'You'
                  ? 'bg-black text-white self-end ml-auto'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="bg-gray-200 text-sm p-3 rounded-2xl max-w-sm">
              Bot is typing...
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          {/* Dots */}
          <div className="flex justify-center items-center mt-4">
            <span className="w-2 h-2 bg-gray-400 rounded-full mx-1"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full mx-1"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full mx-1"></span>
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t px-4 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-black text-white p-2 rounded-full"
          >
            <FaPaperPlane />
          </button>
        </form>
      </main>
    </div>
  );
}
