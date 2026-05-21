import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatInterface.css';

const ChatInterface = () => {
  // 1. Initialize state with the welcome message
  const [messages, setMessages] = useState([
    { id: 1, text: 'Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy...") or ask for help.', sender: 'agent' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // 2. The function that runs when you click "Log"
  const handleSendMessage = async (text) => {
    // Add the user's message to the UI instantly
    const newUserMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // 3. Make the actual API call to your FastAPI backend
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          context: {} // We will pass form state here later!
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI Agent');
      }

      const data = await response.json();

      // 4. Add the AI's reply to the chat window
      const newAgentMsg = { id: Date.now() + 1, text: data.reply, sender: 'agent' };
      setMessages(prev => [...prev, newAgentMsg]);

      // (Optional for later: If data.extractedData exists, we will update the Redux form here!)
      if (data.extractedData) {
        console.log("AI Extracted this data for the form:", data.extractedData);
      }

    } catch (error) {
      console.error("Chat API Error:", error);
      const errorMsg = { id: Date.now() + 2, text: "Sorry, I couldn't connect to the server. Is FastAPI running?", sender: 'agent' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface-wrapper">
      <div className="chat-header">
        <span className="chat-header-icon">🤖</span>
        <div>
          <h3 className="chat-header-title">AI Assistant</h3>
          <p className="chat-header-subtitle">Log interaction via chat</p>
        </div>
      </div>
      
      <div className="chat-history">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="chat-message-wrapper message-agent">
            <span className="chat-avatar agent-avatar">🤖</span>
            <div className="chat-bubble bubble-agent">Thinking...</div>
          </div>
        )}
      </div>

      {/* Pass the function down to the input component */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;