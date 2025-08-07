import { useState } from "react";
import { sendMessageToBot } from "../api";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botReply = await sendMessageToBot(input);
      const botMessage = { text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { text: "Something went wrong.", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-md"
      >
        {isOpen ? "Close" : "AI Chat"}
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white dark:bg-gray-900 shadow-lg border rounded-lg flex flex-col z-50">
          <div className="p-2 font-bold border-b dark:border-gray-700 dark:text-white">AI Chatbot</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t dark:border-gray-700 flex">
            <input
              className="flex-1 border px-2 py-1 rounded-l dark:bg-gray-800 dark:text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend} className="bg-blue-600 text-white px-3 rounded-r">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
