import axios from 'axios';

const BASE_URL = "https://creative-corner.onrender.com/api";

/**
 * Sends a request to the blog post generation endpoint.
 * 
 * @param {string} topic
 * @param {string} tone
 * @returns {object}
 */
export const sendMessageToBot = async (topic, tone = "professional") => {
  try {
    const res = await axios.post(`${BASE_URL}/generate-blog`, { topic, tone });

    // Return the complete data object from the backend directly.
    // The frontend component will then handle parsing `res.data.result`.
    return res.data;

  } catch (error) {
    console.error("Error sending message to bot:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Something went wrong. Please check the server logs.");
  }
};
