//import React from 'react';
import InteractionForm from './InteractionForm';
import ChatInterface from './ChatInterface';
import './LogInteractionScreen.css';

const LogInteractionScreen = () => {
  return (
    <div className="log-interaction-container">
      {/* Left Pane - Structured Form Entry */}
      <div className="left-pane">
        <InteractionForm />
      </div>

      {/* Right Pane - Conversational Agent Entry */}
      <div className="right-pane">
        <ChatInterface />
      </div>
    </div>
  );
};

export default LogInteractionScreen;