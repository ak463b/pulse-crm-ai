import React, { useState } from 'react';
import './ChatInterface.css';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input 
        type="text" 
        className="chat-input-field"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe interaction..." 
        disabled={isLoading}
      />
      <button 
        className="chat-send-btn" 
        onClick={handleSend} 
        disabled={isLoading || !inputText.trim()}
      >
        <span>⏏</span> Log
      </button>
    </div>
  );
};

export default ChatInput;