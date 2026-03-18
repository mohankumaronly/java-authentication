import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import { useAIAssistant } from '../../hooks/useAIAssistant';

export const AIAssistant = () => {
  const { messages, isTyping, sendMessage } = useAIAssistant();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[400px] flex flex-col"
    >
      <AssistantHeader />
      <MessagesList messages={messages} isTyping={isTyping} />
      <div ref={messagesEndRef} />
      <MessageInput 
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
      />
    </motion.div>
  );
};

const AssistantHeader = () => (
  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
    <div className="flex items-center gap-2">
      <Bot className="w-4 h-4" />
      <h3 className="font-semibold text-sm">AI Assistant</h3>
    </div>
  </div>
);

const MessagesList = ({ messages, isTyping }) => (
  <div className="flex-1 overflow-y-auto p-3 space-y-3">
    {messages.map((msg, idx) => (
      <Message key={idx} message={msg} />
    ))}
    {isTyping && <TypingIndicator />}
  </div>
);

const Message = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`max-w-[85%] p-2 rounded-lg ${
      message.type === 'user' 
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }`}>
      <p className="text-xs">{message.text}</p>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  </div>
);

const MessageInput = ({ value, onChange, onSend }) => (
  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        placeholder="Type a message..."
        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg"
      >
        Send
      </motion.button>
    </div>
  </div>
);