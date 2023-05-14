import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import '../style/ChatBot.css'; // You can define your own CSS styles for the chatbot
import NavBar from '../UI/Navbarbot';
import Footer from '../UI/Footer';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [botMessages, setBotMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        console.log('Messages: ', messages);
        console.log('Bot messages: ', botMessages);
    }, [messages]);

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
        const newMessages = [...botMessages, botResponse];
        setBotMessages(newMessages);

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
        <>
            <NavBar />
            <div className="chatbot">
                <div className="chatbot-container">
                    <div className="chatbot-messages" style={{ height: "70%", marginTop: "100px" }}>
                        {messages.map((message, index) => (
                            <>
                                <div key={index} className={'message user-message'}>
                                    <img src="/images/profile.png" alt="user" className="user-image" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                                    {message.text}
                                </div>
                                <div key={index+"bot"} className={'message bot-message'}>
                                    <img src="/images/chatbot.png" alt="bot" className="bot-image" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                                    {botMessages[index].text}
                                </div>
                            </>
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
            <Footer />
        </>
    );
};



export default Chatbot;