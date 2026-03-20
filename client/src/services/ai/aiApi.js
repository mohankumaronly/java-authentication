import api from "../api";

// Error handler for AI specific errors
const handleAiError = (error) => {
  console.error("🤖 AI API Error:", error);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      message: error.response.data?.error || error.response.data?.message || "AI service error occurred",
      status: error.response.status,
      data: error.response.data,
      isNetworkError: false,
      success: error.response.data?.success || false
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: "Network error. Please check your connection to AI service.",
      status: 0,
      data: null,
      isNetworkError: true,
      success: false
    };
  } else {
    // Something happened in setting up the request
    return {
      message: error.message || "An unexpected error occurred with AI service",
      status: 500,
      data: null,
      isNetworkError: false,
      success: false
    };
  }
};

/**
 * Send a chat message to AI
 * @param {string} message - The user's message
 * @returns {Promise<Object>} - AI response with reply, chatId, and tokens
 */
export const sendChatMessage = async (message) => {
  try {
    console.log("🤖 Sending AI chat request:", message.substring(0, 50) + (message.length > 50 ? "..." : ""));
    
    const response = await api.post("/ai/chat", { message });
    
    console.log("✅ AI Chat response received:", response.data);
    
    // Return the structured response
    if (response.data.success && response.data.data) {
      return {
        success: true,
        reply: response.data.data.reply,
        chatId: response.data.data.chatId,
        tokens: response.data.data.tokens,
        error: null
      };
    } else {
      return {
        success: false,
        reply: null,
        chatId: null,
        tokens: null,
        error: response.data.error || "Unknown AI error"
      };
    }
  } catch (error) {
    const handledError = handleAiError(error);
    throw handledError;
  }
};

/**
 * Send a chat message with context (for future enhancement)
 * @param {string} message - The user's message
 * @param {string} chatId - Existing chat ID for conversation history
 * @returns {Promise<Object>} - AI response
 */
export const sendChatMessageWithContext = async (message, chatId) => {
  try {
    console.log("🤖 Sending AI chat with context:", { chatId, message: message.substring(0, 50) });
    
    // This endpoint doesn't exist yet, but we're preparing for future
    const response = await api.post("/ai/chat/context", { message, chatId });
    
    return {
      success: true,
      reply: response.data.data?.reply,
      chatId: response.data.data?.chatId,
      tokens: response.data.data?.tokens,
      error: null
    };
  } catch (error) {
    const handledError = handleAiError(error);
    throw handledError;
  }
};

/**
 * Check AI service health
 * @returns {Promise<Object>} - Health status
 */
export const checkAiHealth = async () => {
  try {
    const response = await api.get("/ai/health");
    return {
      success: true,
      status: response.data.data || "AI Service is running",
      error: null
    };
  } catch (error) {
    console.error("❌ AI Health check failed:", error);
    return {
      success: false,
      status: null,
      error: "AI service is unavailable"
    };
  }
};

/**
 * Get chat history (for future enhancement)
 * @param {string} chatId - Chat ID to retrieve history for
 * @returns {Promise<Object>} - Chat history
 */
export const getChatHistory = async (chatId) => {
  try {
    const response = await api.get(`/ai/chat/history/${chatId}`);
    return {
      success: true,
      history: response.data.data,
      error: null
    };
  } catch (error) {
    const handledError = handleAiError(error);
    throw handledError;
  }
};

/**
 * Clear chat history (for future enhancement)
 * @param {string} chatId - Chat ID to clear
 * @returns {Promise<Object>} - Clear status
 */
export const clearChatHistory = async (chatId) => {
  try {
    const response = await api.delete(`/ai/chat/history/${chatId}`);
    return {
      success: true,
      message: response.data.message,
      error: null
    };
  } catch (error) {
    const handledError = handleAiError(error);
    throw handledError;
  }
};

// Export all functions
export default {
  sendChatMessage,
  sendChatMessageWithContext,
  checkAiHealth,
  getChatHistory,
  clearChatHistory
};