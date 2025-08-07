import React, { useState, useEffect, useRef } from 'react';
import {
    FaBars,
    FaRegCommentDots,
    FaPaperPlane,
} from 'react-icons/fa';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';

// This is a placeholder for your API call.
import { sendMessageToBot } from '../api/index';

// --- Utility Functions for Parsing Different Formats ---

const extractAndCleanHashtags = (text) => {
    const hashtagMatch = text.match(/#\w+/g);
    return hashtagMatch ? hashtagMatch.map(tag => tag.replace('#', '')) : [];
};

const parseBlogHtml = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const titleElement = doc.querySelector('h1 b') || doc.querySelector('h1');
    const metaDescriptionElement = doc.querySelector('h3 ~ i');
    const summaryElement = doc.querySelector('h2 ~ p');
    const contentText = htmlString.substring(htmlString.indexOf('Content: ')).replace(/Content: /, '').trim();
    const hashtagsText = doc.querySelector('h3:last-of-type ~ p') ? doc.querySelector('h3:last-of-type ~ p').textContent : '';

    const metaDescription = metaDescriptionElement ? metaDescriptionElement.textContent.trim() : "No meta description available.";
    const summary = summaryElement ? summaryElement.textContent.trim() : "No summary available.";
    const title = titleElement ? titleElement.textContent.trim() : "Generated Blog Post";
    
    const content = contentText.split('###').map(s => `###${s}`).join('').replace(/^###/, '').split('Hashtags')[0].trim() || "No content available.";
    
    let hashtags = extractAndCleanHashtags(hashtagsText);
    if (hashtags.length === 0) {
        hashtags = extractAndCleanHashtags(summary);
    }
    
    return { title, summary, meta_description: metaDescription, content, hashtags };
};

const parseBlogMarkdown = (markdown) => {
    const sections = {
        title: "Generated Blog Post",
        meta_description: "No meta description available.",
        summary: "No summary available.",
        content: "No content available.",
        hashtags: []
    };

    const regex = /\*\*(.*?):\*\*\s*([\s\S]*?)(?=\*\*|$)/g;
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        const key = match[1].toLowerCase().replace(/\s/g, '_');
        const value = match[2].trim();
        if (key === 'title') sections.title = value;
        else if (key === 'meta_description') sections.meta_description = value.replace(/#\w+/g, '').trim();
        else if (key === 'summary' || key === 'social_media_summary') sections.summary = value.replace(/#\w+/g, '').trim();
        else if (key === 'content') sections.content = value.split('Hashtags')[0].trim();
        else if (key === 'hashtags') {
            sections.hashtags = value.split(/\s+/).filter(Boolean).map(tag => tag.replace(/#/g, ''));
        }
    }
    
    if (sections.hashtags.length === 0) {
        const fallbackHashtags = sections.meta_description.match(/#\w+/g) || sections.summary.match(/#\w+/g) || [];
        sections.hashtags = fallbackHashtags.map(tag => tag.replace('#', ''));
    }
    return sections;
};

// --- React Component Definitions ---

const BlogPostRenderer = ({ blogData }) => {
    const renderContentWithStyles = (content) => {
        let html = marked(content);
        html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-indigo-400 font-bold text-2xl mb-2">$1</h2>');
        html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-indigo-400 text-xl font-semibold mt-6 mb-2">$1</h3>');
        html = html.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-indigo-300">$1</strong>');
        return { __html: html };
    };

    const hashtags = Array.isArray(blogData.hashtags) ? blogData.hashtags : (blogData.Hashtags || '').split(/\s+/).filter(Boolean).map(tag => tag.replace(/#/g, ''));

    return (
        <div className="prose prose-invert max-w-none space-y-6">
            <h1 className="text-indigo-400 font-bold text-4xl leading-tight mb-4">
                {blogData.title || blogData.Title}
            </h1>
            <div>
                <h2 className="text-indigo-400 font-bold text-lg leading-snug mb-2">Meta Description</h2>
                <p className="text-gray-400 italic">
                    {blogData.meta_description || blogData.MetaDescription}
                </p>
            </div>
            <div>
                <h2 className="text-indigo-400 font-bold text-lg leading-snug mb-2">Summary</h2>
                <p className="text-gray-200">
                    {blogData.summary || blogData.Summary}
                </p>
            </div>
            <div>
                <h2 className="text-indigo-400 font-bold text-lg leading-snug mb-2">Content</h2>
                <div className="text-gray-200" dangerouslySetInnerHTML={renderContentWithStyles(blogData.content || blogData.Content)}></div>
            </div>
            {hashtags.length > 0 && (
                <div className="border-t border-gray-700 pt-4 mt-6">
                    <p className="text-sm font-medium text-indigo-300">
                        {hashtags.map((tag, index) => `#${tag}${index < hashtags.length - 1 ? ' ' : ''}`)}
                    </p>
                </div>
            )}
        </div>
    );
};

// --- Main ChatBotUI Component ---

export default function ChatBotUI() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'You', text: input };
        setChat((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        setError('');

        try {
            const botReply = await sendMessageToBot(userMsg.text);

            if (botReply && botReply.type === 'blog' && botReply.result) {
                let parsedBlogContent;
                if (botReply.result.trim().startsWith('<')) {
                    parsedBlogContent = parseBlogHtml(botReply.result);
                } else {
                    try {
                        parsedBlogContent = JSON.parse(botReply.result);
                    } catch (jsonError) {
                        parsedBlogContent = parseBlogMarkdown(botReply.result);
                    }
                }
                
                setChat((prev) => [...prev, {
                    sender: 'Bot',
                    type: 'blog',
                    content: parsedBlogContent,
                }]);
            } else if (botReply && botReply.message) {
                setChat((prev) => [...prev, { sender: 'Bot', text: botReply.message }]);
            } else {
                setError("The bot sent an unexpected response format.");
            }
        } catch (err) {
            setError(`Error: Failed to fetch response. Please try again. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = (msg, index) => {
        if (msg.type === 'blog') {
            return (
                <div key={index} className="flex justify-start w-full">
                    <div className="bg-gray-700 text-sm p-8 rounded-xl max-w-4xl rounded-bl-none">
                        <BlogPostRenderer blogData={msg.content} />
                    </div>
                </div>
            );
        } else {
            return (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex w-full ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`text-sm p-4 rounded-xl shadow-md ${msg.sender === 'You'
                            ? 'bg-sendBtn text-white rounded-br-none max-w-lg'
                            : 'bg-gray-700 text-white rounded-bl-none max-w-4xl'
                        }`}
                    >
                        {msg.text}
                    </div>
                </motion.div>
            );
        }
    };

    return (
        <div className="flex h-screen w-full bg-pageBg text-white">
            <aside className="hidden md:flex flex-col w-64 bg-chatBg border-r p-4 justify-between shadow-lg">
                <div>
                    <button className="mb-6 p-2 rounded-full hover:bg-gray-700">
                        <FaBars />
                    </button>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-2 font-semibold p-2 bg-inputBg rounded-lg">
                            <FaRegCommentDots /> New chat
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-2 text-sm p-2 bg-inputBg rounded-lg">
                    <img
                        src="https://placehold.co/30x30/d1d5db/374151?text=U"
                        alt="user avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-white">User Profile</span>
                </div>
            </aside>

            <main className="flex-1 flex flex-col justify-between bg-chatBg rounded-lg shadow-xl m-4 md:m-8">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                    <h2 className="font-bold text-xl">Blog Assistant</h2>
                    <button className="text-sm text-indigo-400 font-medium p-2 rounded-lg hover:bg-indigo-800">Share</button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto flex-1 flex flex-col">
                    <AnimatePresence>
                        {chat.map(renderMessage)}
                        {loading && (
                            <div className="flex justify-start w-full">
                                <div className="bg-gray-700 text-sm p-4 rounded-xl rounded-bl-none max-w-4xl">
                                    <div className="flex space-x-1">
                                        <span className="dot animate-pulse bg-gray-400"></span>
                                        <span className="dot animate-pulse-delay bg-gray-400"></span>
                                        <span className="dot animate-pulse-delay-more bg-gray-400"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="text-red-400 text-sm font-medium p-4 rounded-lg bg-red-900 w-full max-w-4xl">
                                {error}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </AnimatePresence>
                </div>

                <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-700 px-6 py-4 bg-chatBg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 bg-inputBg border border-gray-600 rounded-full px-5 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="ml-2 bg-sendBtn text-white p-3 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </main>

            <style>{`
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                @keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
                .animate-pulse { animation: pulse 1.2s ease-in-out infinite; }
                .animate-pulse-delay { animation: pulse 1.2s ease-in-out infinite 0.2s; }
                .animate-pulse-delay-more { animation: pulse 1.2s ease-in-out infinite 0.4s; }
            `}</style>
        </div>
    );
}