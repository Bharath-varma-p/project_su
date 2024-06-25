import React, { useState, useEffect, useRef } from 'react';
import RoadmapVisualizer from './RoadmapVisualizer';
import './AIComponent.css';

const AIComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory] = useState([
        { title: "Chat 1", date: "Today" },
        { title: "Chat 2", date: "Yesterday" },
        { title: "Chat 3", date: "Previous 7 Days" },
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        // Simulated delay to mimic API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a sample response
        const sampleResponse = generateSampleResponse(input);

        setIsTyping(false);
        setMessages(prev => [...prev, { 
            text: 'Roadmap created successfully!', 
            sender: 'ai', 
            roadmap: sampleResponse 
        }]);
    };

    const generateSampleResponse = (input) => {
        const title = `Roadmap for ${input}`;
        const steps = [
            {
                id: "step1",
                title: "Research and Planning",
                description: "Gather information and plan the project",
                estimatedTime: "2 weeks",
                dependencies: ["step2", "step3"]
            },
            {
                id: "step2",
                title: "Design and Prototyping",
                description: "Create designs and prototypes",
                estimatedTime: "3 weeks",
                dependencies: ["step4"]
            },
            {
                id: "step3",
                title: "Resource Allocation",
                description: "Allocate necessary resources",
                estimatedTime: "1 week",
                dependencies: ["step4"]
            },
            {
                id: "step4",
                title: "Implementation",
                description: "Start the implementation phase",
                estimatedTime: "4 weeks",
                dependencies: ["step5"]
            },
            {
                id: "step5",
                title: "Testing and Quality Assurance",
                description: "Conduct thorough testing",
                estimatedTime: "2 weeks",
                dependencies: []
            }
        ];

        return { title, steps };
    };

    const suggestionCards = [
        { icon: "💼", text: "Create a roadmap for starting a small business" },
        { icon: "🧠", text: "Develop a learning plan for artificial intelligence" },
        { icon: "🌍", text: "Plan a sustainable living initiative" },
        { icon: "🚀", text: "Outline steps to launch a tech startup" },
    ];

    const handleSuggestion = (suggestion) => {
        setInput(suggestion);
    };

    return (
        <div className="ai-chat-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>AI Chat</h2>
                </div>
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className="chat-history-item">
                            <span>{chat.title}</span>
                            <span className="chat-date">{chat.date}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-chat-area">
                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="empty-chat">
                            <div className="logo">🤖</div>
                            <h2>How can I assist you today?</h2>
                            <div className="suggestion-cards">
                                {suggestionCards.map((card, index) => (
                                    <div key={index} className="suggestion-card" onClick={() => handleSuggestion(card.text)}>
                                        <span className="card-icon">{card.icon}</span>
                                        <span>{card.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <div className="message-content">
                                    {message.roadmap ? (
                                        <RoadmapVisualizer roadmapData={message.roadmap} />
                                    ) : (
                                        message.text
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {isTyping && (
                        <div className="message ai">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for a roadmap..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-button">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIComponent;