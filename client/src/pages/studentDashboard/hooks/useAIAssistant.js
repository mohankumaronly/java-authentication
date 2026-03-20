import { useState, useCallback } from 'react';
import { checkAiHealth, sendChatMessage } from '../../../services/ai/aiApi';

export const useAIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAiAvailable, setIsAiAvailable] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Check AI health on mount (optional, call when needed)
  const checkHealth = useCallback(async () => {
    try {
      const result = await checkAiHealth();
      setIsAiAvailable(result.success);
      return result.success;
    } catch (error) {
      setIsAiAvailable(false);
      return false;
    }
  }, []);

  // Send message to AI
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText?.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Call AI API
      const response = await sendChatMessage(messageText.trim());
      
      if (response.success) {
        // Add AI response to chat
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          text: response.reply,
          chatId: response.chatId,
          tokens: response.tokens,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Update current chat ID
        if (response.chatId) {
          setCurrentChatId(response.chatId);
        }
      } else {
        // Add error message
        const errorMessage = {
          id: Date.now() + 1,
          type: 'system',
          text: `⚠️ ${response.error || 'Failed to get response. Please try again.'}`,
          isError: true,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // Handle network or unexpected errors
      const errorMessage = {
        id: Date.now() + 1,
        type: 'system',
        text: `⚠️ ${error.message || 'Network error. Please check your connection.'}`,
        isError: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
  }, []);

  // Clear only the last message
  const clearLastMessage = useCallback(() => {
    setMessages(prev => prev.slice(0, -1));
  }, []);

  // Reset conversation
  const resetConversation = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    isAiAvailable,
    currentChatId,
    sendMessage,
    clearMessages,
    clearLastMessage,
    resetConversation,
    checkHealth
  };
};