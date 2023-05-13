import React, { useState } from 'react';
import '../style/ChatBot.css'; // You can define your own CSS styles for the chatbot

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Add user message to the chat
    const userMessage = {
      text: inputValue,
      isUserMessage: true,
    };
    setMessages([...messages, userMessage]);

    // Process user input and generate bot response
    const botResponse = generateBotResponse(inputValue);

    // Add bot response to the chat
    const newMessages = [...messages, botResponse];
    setMessages(newMessages);

    // Clear input field
    setInputValue('');
  };

  const generateBotResponse = (userInput) => {
    // You can customize the bot's responses based on the user input
    // For simplicity, this example generates a static response
    const botResponse = {
      text: 'This is a sample bot response.',
      isUserMessage: false,
    };
    return botResponse;
  };

  return (
    <div className="chatbot">
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUserMessage ? 'user-message' : 'bot-message'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form className="chatbot-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};



export default Chatbot;