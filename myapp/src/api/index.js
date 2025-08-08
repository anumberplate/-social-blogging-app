// src/api/index.js
import axios from 'axios';

const BASE_URL = "https://creative-corner.onrender.com/api";

export const sendMessageToBot = async (message) => {
  const res = await axios.post(`${BASE_URL}/chat`, { prompt: message });
  return res.data.reply; 
};