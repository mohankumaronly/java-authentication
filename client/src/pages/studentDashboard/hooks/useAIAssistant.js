import { useState } from 'react';

export const useAIAssistant = () => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm your AI assistant. How can I help?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: "I understand. Let me help you with that!" 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return { messages, isTyping, sendMessage };
};