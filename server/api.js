import axios from 'axios';

export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post('', {
      message
    });

    return response.data.reply;
  } catch (error) {
    console.error("Bot API error:", error);
    throw new Error("Failed to connect to AI bot. Please try again later.");
  }
};
