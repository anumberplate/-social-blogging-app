import React, { useState } from 'react';
import { sendMessageToBot } from '../api';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setChat(prev => [...prev, userMsg]);
    setLoading(true);
    setError('');
    
    try {
      const botReply = await sendMessageToBot(input);
      setChat(prev => [...prev, { sender: "Bot", text: botReply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
      <div className="h-80 overflow-y-auto mb-4 border p-2 rounded">
        {chat.map((msg, i) => (
          <p key={i}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
        {loading && <p><em>Bot is typing...</em></p>}
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border px-4 py-2 rounded"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
      </form>
    </div>
  );
}
