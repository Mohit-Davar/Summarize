import React, { useState } from 'react';
import { Send, Upload, FileText, MessageCircle, Sparkles } from 'lucide-react';

const PDFChatInterface = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'assistant',
            content: 'Hello! Upload a PDF and I\'ll help you summarize and discuss its contents.',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [summary, setSummary] = useState('');

    const suggestedQuestions = [
        'What are the main points?',
        'Can you explain the conclusion?',
        'What methodology was used?',
        'Who are the key authors mentioned?',
        'What are the practical implications?'
    ];

    const handleSendMessage = (message = inputValue) => {
        if (!message.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            type: 'user',
            content: message,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');

        // Simulate assistant response
        setTimeout(() => {
            const assistantResponse = {
                id: messages.length + 2,
                type: 'assistant',
                content: `I understand you're asking about: "${message}". Based on the uploaded PDF, here's my analysis...`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, assistantResponse]);
        }, 1000);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedPdf({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                pages: '12 pages',
                uploadDate: new Date().toLocaleDateString()
            });
            setSummary('This document discusses advanced machine learning techniques with focus on neural networks and deep learning architectures. Key findings include improved accuracy rates and novel optimization methods for training large-scale models...');

            // Add system message about PDF upload
            const uploadMessage = {
                id: messages.length + 1,
                type: 'system',
                content: `PDF "${file.name}" uploaded successfully! I've analyzed the document and generated a summary.`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, uploadMessage]);
        }
    };

    const handleSuggestedQuestion = (question) => {
        handleSendMessage(question);
    };

    return (
        <div className="flex bg-gradient-to-br from-orange-50 to-orange-100 h-screen">
            {/* Left Sidebar - 1/3 space */}
            <div className="flex flex-col bg-white shadow-xl border-gray-200 border-r w-1/3">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg p-4 text-white">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6" />
                        <h1 className="font-semibold text-lg">PDF Assistant</h1>
                    </div>
                </div>

                {/* Suggested Questions - Top */}
                <div className="p-6 border-gray-200 border-b">
                    <h2 className="mb-4 font-semibold text-gray-800 text-lg">
                        Suggested Questions
                    </h2>
                    <div className="space-y-3">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestedQuestion(question)}
                                className="bg-gradient-to-r from-orange-50 hover:from-orange-100 to-orange-100 hover:to-orange-200 hover:shadow-md p-3 border border-orange-200 rounded-lg w-full text-left transition-all duration-200"
                            >
                                <p className="text-gray-700 text-sm">{question}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary Section - Middle */}
                {summary && (
                    <div className="flex-1 p-6 border-gray-200 border-b overflow-y-auto">
                        <h2 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                            <FileText className="w-5 h-5 text-orange-500" />
                            Summary
                        </h2>
                        <div className="bg-orange-50 p-4 border border-orange-200 rounded-xl">
                            <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
                        </div>
                    </div>
                )}

                {/* PDF Metadata - Bottom */}
                <div className="p-6">
                    <h2 className="flex items-center gap-2 mb-4 font-semibold text-gray-800 text-lg">
                        <Upload className="w-5 h-5 text-orange-500" />
                        Document Info
                    </h2>

                    {uploadedPdf ? (
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl">
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">Filename</p>
                                    <p className="font-medium text-gray-800 text-sm truncate">{uploadedPdf.name}</p>
                                </div>
                                <div className="gap-4 grid grid-cols-2">
                                    <div>
                                        <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">Size</p>
                                        <p className="text-gray-700 text-sm">{uploadedPdf.size}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">Pages</p>
                                        <p className="text-gray-700 text-sm">{uploadedPdf.pages}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">Uploaded</p>
                                    <p className="text-gray-700 text-sm">{uploadedPdf.uploadDate}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <label className="block">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <div className="p-6 border-2 border-orange-300 hover:border-orange-400 border-dashed rounded-xl text-center transition-colors cursor-pointer">
                                <FileText className="mx-auto mb-2 w-8 h-8 text-orange-500" />
                                <p className="text-gray-600 text-sm">Click to upload PDF</p>
                                <p className="mt-1 text-gray-500 text-xs">Drag & drop or click to browse</p>
                            </div>
                        </label>
                    )}
                </div>
            </div>

            {/* Right Side - Chat Area - 2/3 space */}
            <div className="flex flex-col flex-1 bg-white shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg p-4 text-white">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-6 h-6" />
                        <h1 className="font-semibold text-xl">Chat with your PDF</h1>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 space-y-4 p-6 overflow-y-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${message.type === 'user'
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                        : message.type === 'system'
                                            ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <span className={`text-xs mt-2 block ${message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="bg-white p-6 border-gray-200 border-t">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask about your PDF..."
                            className="flex-1 px-4 py-3 border border-gray-300 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            className="bg-gradient-to-r from-orange-500 hover:from-orange-600 to-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl text-white transition-all duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFChatInterface;