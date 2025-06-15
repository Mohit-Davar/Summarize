import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  FileText,
  Loader,
  MessageCircle,
  Sparkles,
  Upload,
} from 'lucide-react';
import io from 'socket.io-client';

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
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    const suggestedQuestions = [
        'What are the main points?',
        'Can you explain the conclusion?',
        'What methodology was used?',
        'Who are the key authors mentioned?',
        'What are the practical implications?'
    ];

    // Initialize Socket.IO connection
    useEffect(() => {
        // Generate unique session ID
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);

        // Initialize socket connection
        socketRef.current = io('http://localhost:5000', {
            withCredentials: true,
            transports: ['websocket', 'polling']
        });

        const socket = socketRef.current;

        // Connection event handlers
        socket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
            socket.emit('join-session', newSessionId);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setIsConnected(false);
        });

        // Chat response handler
        socket.on('chat-response', (data) => {
            setIsLoading(false);

            if (data.error) {
                const errorMessage = {
                    id: Date.now(),
                    type: 'assistant',
                    content: data.error,
                    timestamp: new Date().toLocaleTimeString(),
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
            } else {
                const assistantMessage = {
                    id: Date.now(),
                    type: 'assistant',
                    content: data.message,
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        });

        // PDF upload response handler
        socket.on('pdf-uploaded', (data) => {
            setIsLoading(false);

            if (data.error) {
                const errorMessage = {
                    id: Date.now(),
                    type: 'system',
                    content: `Error uploading PDF: ${data.error}`,
                    timestamp: new Date().toLocaleTimeString(),
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
            } else {
                setUploadedPdf(data.file);
                setSummary(data.summary);

                const successMessage = {
                    id: Date.now(),
                    type: 'system',
                    content: `PDF "${data.file.name}" uploaded successfully! I've analyzed the document and generated a summary.`,
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(prev => [...prev, successMessage]);
            }
        });

        // Cleanup on unmount
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (message = inputValue) => {
        if (!message.trim() || !isConnected || !sessionId) return;

        if (!uploadedPdf) {
            const warningMessage = {
                id: Date.now(),
                type: 'assistant',
                content: 'Please upload a PDF first before asking questions.',
                timestamp: new Date().toLocaleTimeString(),
                isError: true
            };
            setMessages(prev => [...prev, warningMessage]);
            return;
        }

        // Add user message to chat
        const newMessage = {
            id: Date.now(),
            type: 'user',
            content: message,
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsLoading(true);

        // Send message to server
        socketRef.current.emit('chat-message', {
            message: message,
            sessionId: sessionId
        });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please select a valid PDF file');
            return;
        }

        if (!isConnected || !sessionId) {
            alert('Not connected to server. Please wait and try again.');
            return;
        }

        setIsLoading(true);

        try {
            // Upload via REST API (more reliable for file uploads)
            const formData = new FormData();
            formData.append('pdf', file);
            formData.append('sessionId', sessionId);

            const response = await fetch('http://localhost:5000/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setIsLoading(false);

            if (result.success) {
                setUploadedPdf(result.file);
                setSummary(result.summary);

                const successMessage = {
                    id: Date.now(),
                    type: 'system',
                    content: `PDF "${result.file.name}" uploaded successfully! I've analyzed the document and generated a summary.`,
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(prev => [...prev, successMessage]);
            } else {
                const errorMessage = {
                    id: Date.now(),
                    type: 'system',
                    content: `Error uploading PDF: ${result.error}`,
                    timestamp: new Date().toLocaleTimeString(),
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Upload error:', error);

            const errorMessage = {
                id: Date.now(),
                type: 'system',
                content: 'Failed to upload PDF. Please check your connection and try again.',
                timestamp: new Date().toLocaleTimeString(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleSuggestedQuestion = (question) => {
        handleSendMessage(question);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-orange-50 to-orange-100 h-screen">
            {/* Connection Status Indicator */}
            <div className={`fixed top-4 right-4 z-50 px-3 py-1 rounded-full text-xs font-medium ${isConnected
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>

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
                                disabled={!uploadedPdf || isLoading}
                                className={`w-full text-left p-3 border border-orange-200 rounded-lg transition-all duration-200 ${uploadedPdf && !isLoading
                                        ? 'bg-gradient-to-r from-orange-50 hover:from-orange-100 to-orange-100 hover:to-orange-200 hover:shadow-md cursor-pointer'
                                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <p className="text-sm">{question}</p>
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
                                disabled={isLoading || !isConnected}
                                className="hidden"
                            />
                            <div className={`p-6 border-2 border-dashed rounded-xl text-center transition-colors ${isLoading || !isConnected
                                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'border-orange-300 hover:border-orange-400 cursor-pointer'
                                }`}>
                                {isLoading ? (
                                    <Loader className="mx-auto mb-2 w-8 h-8 text-orange-500 animate-spin" />
                                ) : (
                                    <FileText className="mx-auto mb-2 w-8 h-8 text-orange-500" />
                                )}
                                <p className="text-gray-600 text-sm">
                                    {isLoading ? 'Processing PDF...' : 'Click to upload PDF'}
                                </p>
                                <p className="mt-1 text-gray-500 text-xs">
                                    {isLoading ? 'Please wait' : 'Drag & drop or click to browse'}
                                </p>
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
                                            ? message.isError
                                                ? 'bg-red-100 text-red-800 border border-red-200'
                                                : 'bg-orange-100 text-orange-800 border border-orange-200'
                                            : message.isError
                                                ? 'bg-red-100 text-red-800 border border-red-200'
                                                : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <span className={`text-xs mt-2 block ${message.type === 'user' ? 'text-orange-100' :
                                        message.isError ? 'text-red-600' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 shadow-sm px-4 py-3 rounded-2xl">
                                <div className="flex items-center gap-2">
                                    <Loader className="w-4 h-4 text-orange-500 animate-spin" />
                                    <p className="text-gray-600 text-sm">Thinking...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />