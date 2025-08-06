// src/api/index.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const sendMessageToBot = async (message) => {
  const res = await axios.post(`${BASE_URL}/chat`, { prompt: message });
  return res.data.reply; 
};