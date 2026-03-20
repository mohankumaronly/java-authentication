import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Trash2, RefreshCw } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';
import { useAIAssistant } from '../../hooks/useAIAssistant';

export const AIAssistant = () => {
  const { 
    messages, 
    isTyping, 
    isAiAvailable, 
    sendMessage, 
    clearMessages,
    resetConversation 
  } = useAIAssistant();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      clearMessages();
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset the conversation? This will clear all messages.')) {
      resetConversation();
    }
  };

  return (
    <motion.div 
      variants={fadeInUp}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col"
    >
      <AssistantHeader 
        isAiAvailable={isAiAvailable}
        onClear={handleClearChat}
        onReset={handleReset}
      />
      
      <MessagesList 
        messages={messages} 
        isTyping={isTyping} 
        isAiAvailable={isAiAvailable}
      />
      
      <div ref={messagesEndRef} />
      
      <MessageInput 
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        disabled={!isAiAvailable}
      />
    </motion.div>
  );
};

const AssistantHeader = ({ isAiAvailable, onClear, onReset }) => (
  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Bot className="w-4 h-4" />
      <h3 className="font-semibold text-sm">AI Assistant</h3>
      <div className={`ml-2 w-2 h-2 rounded-full ${isAiAvailable ? 'bg-green-300 animate-pulse' : 'bg-red-300'}`} />
    </div>
    <div className="flex gap-2">
      <button
        onClick={onReset}
        className="p-1 hover:bg-white/20 rounded transition-colors"
        title="Reset conversation"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={onClear}
        className="p-1 hover:bg-white/20 rounded transition-colors"
        title="Clear messages"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const MessagesList = ({ messages, isTyping, isAiAvailable }) => {
  if (!isAiAvailable && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            AI service is currently unavailable
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Please check your connection or try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.length === 0 && isAiAvailable && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Hi! I'm your AI assistant
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              Ask me anything about programming, learning, or just chat with me!
            </p>
          </div>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <Message key={msg.id || idx} message={msg} />
      ))}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
};

const Message = ({ message }) => {
  // Format markdown-like text (basic)
  const formatText = (text) => {
    // Convert markdown bold **text** to <strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert markdown code `code` to <code>
    formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 rounded">$1</code>');
    // Convert markdown headers ### to bold
    formatted = formatted.replace(/### (.*?)\n/g, '<strong class="block mt-2 mb-1">$1</strong>\n');
    // Convert newlines to <br/>
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] p-2 rounded-lg ${
        message.type === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
          : message.type === 'system'
          ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }`}>
        <p 
          className="text-xs"
          dangerouslySetInnerHTML={{ 
            __html: message.type === 'ai' 
              ? formatText(message.text) 
              : message.text 
          }}
        />
        {message.tokens && (
          <div className="text-[10px] opacity-70 mt-1">
            ~{message.tokens} tokens
          </div>
        )}
      </div>
    </motion.div>
  );
};

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

const MessageInput = ({ value, onChange, onSend, onKeyPress, disabled }) => (
  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={disabled ? "AI service is unavailable..." : "Type a message..."}
        disabled={disabled}
        className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        disabled={!value.trim() || disabled}
        className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </motion.button>
    </div>
  </div>
);