//import React from 'react';
import './ChatInterface.css';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat-message-wrapper ${isUser ? 'message-user' : 'message-agent'}`}>
      {!isUser && <span className="chat-avatar agent-avatar">🤖</span>}
      
      <div className={`chat-bubble ${isUser ? 'bubble-user' : 'bubble-agent'}`}>
        {message.text}
      </div>
      
      {isUser && <span className="chat-avatar user-avatar">JR</span>}
    </div>
  );
};

export default ChatMessage;