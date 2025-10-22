import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../hooks/UseAuth/UseAuth';
import UseAxios from '../../hooks/UseAxios/UseAxios';


const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();
    const axios = UseAxios(); // UseAxios hook ব্যবহার করুন

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load chat history when component mounts or user changes
    useEffect(() => {
        if (user?.email && isOpen) {
            loadChatHistory();
        }
    }, [user?.email, isOpen]);

    const loadChatHistory = async () => {
        if (!user?.email) return;
        
        setIsLoadingHistory(true);
        try {
            const response = await axios.get('/api/chat/history');
            
            if (response.data) {
                setMessages(response.data.messages || []);
            } else {
                console.error('Failed to load chat history');
                // Set default message if no history
                setMessages([{
                    id: 1,
                    text: "Hello! I'm your Coursion assistant. How can I help you with courses, enrollment, or any other questions today?",
                    isBot: true,
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            // Set default message on error
            setMessages([{
                id: 1,
                text: "Hello! I'm your Coursion assistant. How can I help you with courses, enrollment, or any other questions today?",
                isBot: true,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading || !user?.email) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/chat', { 
                message: inputMessage 
            });
            
            const botMessage = {
                id: messages.length + 2,
                text: response.data.response,
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: messages.length + 2,
                text: error.response?.data?.error || "Sorry, I'm having trouble responding. Please try again later.",
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChatHistory = async () => {
        if (!user?.email) return;

        try {
            await axios.delete('/api/chat/history');
            setMessages([{
                id: 1,
                text: "Hello! I'm your Coursion assistant. How can I help you with courses, enrollment, or any other questions today?",
                isBot: true,
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error('Error clearing chat history:', error);
            alert('Failed to clear chat history. Please try again.');
        }
    };

    const suggestedQuestions = [
        "What courses are available?",
        "How many courses can I enroll in?",
        "Tell me about the enrollment process",
        "What are the website features?",
        "How do I create a course?"
    ];

    const handleSuggestionClick = (question) => {
        setInputMessage(question);
    };

    const handleOpenChat = () => {
        if (!user) {
            alert('Please login to use the chatbot');
            return;
        }
        setIsOpen(true);
    };

    return (
        <>
            {/* Chatbot Button */}
            {!isOpen && (
                <button
                    onClick={handleOpenChat}
                    className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
                    aria-label="Open chatbot"
                >
                    <FaRobot size={24} />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <FaRobot />
                            <span className="font-semibold">Coursion Assistant</span>
                            {user && (
                                <span className="text-xs bg-blue-500 px-2 py-1 rounded hidden sm:inline">
                                    {user.email}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={clearChatHistory}
                                className="hover:bg-blue-700 p-1 rounded transition-colors"
                                aria-label="Clear chat history"
                                title="Clear chat history"
                            >
                                <FaTrash size={14} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-blue-700 p-1 rounded transition-colors"
                                aria-label="Close chatbot"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {isLoadingHistory ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex mb-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}
                                        >
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}
                                            >
                                                {message.isBot ? <FaRobot size={14} /> : <FaUser size={14} />}
                                            </div>
                                            <div
                                                className={`px-4 py-2 rounded-2xl ${message.isBot ? 'bg-white border border-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                                <span className={`text-xs mt-1 block ${message.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <div className="flex items-start space-x-2">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                <FaRobot size={14} />
                                            </div>
                                            <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Suggested Questions */}
                    {!isLoadingHistory && messages.length <= 1 && (
                        <div className="px-4 pb-2">
                            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSuggestionClick(question)}
                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder={user ? "Type your message..." : "Please login to chat"}
                                disabled={!user || isLoading}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={!user || !inputMessage.trim() || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <FaPaperPlane size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;