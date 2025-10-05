'use client';
import React, { useState } from "react";
import Link from "next/link"; // Fix: was "link"

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface TranscriptAnalysis {
  program?: string;
  completedCourses?: Array<{code: string, name: string, grade: string, credits: number}>;
  gpa?: number;
  totalCredits?: number;
  analysis?: string;
}

export default function Planner() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm your SFU academic advisor. I can help you plan your schedule, analyze your transcript, and answer questions about courses and requirements. How can I assist you today?",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transcriptAnalysis, setTranscriptAnalysis] = useState<TranscriptAnalysis | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const analyzeUploadedTranscript = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/api/gemini/analyze-transcript', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            
            if (data.analysis) {
                try {
                    const analysisData = JSON.parse(data.analysis);
                    setTranscriptAnalysis(analysisData);
                    
                    const newMessage: Message = {
                        id: Date.now().toString(),
                        text: `📄 Transcript Analysis Complete!\n\n**Program:** ${analysisData.program || 'Not specified'}\n**Completed Credits:** ${analysisData.totalCredits || 'N/A'}\n**GPA:** ${analysisData.gpa || 'N/A'}\n\n**Analysis:** ${analysisData.analysis}\n\nI can now provide personalized course recommendations based on your academic history!`,
                        isUser: false,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, newMessage]);
                } catch (parseError) {
                    const newMessage: Message = {
                        id: Date.now().toString(),
                        text: `📄 Transcript Analysis:\n\n${data.analysis}`,
                        isUser: false,
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, newMessage]);
                }
            }
        } catch (error) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: "Sorry, I couldn't analyze the transcript. Please try again or paste the text directly.",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() && !selectedFile) return;

        if (selectedFile) {
            await analyzeUploadedTranscript();
            setSelectedFile(null);
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
        }

        if (inputMessage.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                text: inputMessage,
                isUser: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, userMessage]);

            setIsLoading(true);
            setInputMessage("");

            try {
                const response = await fetch('/api/gemini/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: inputMessage,
                        transcriptAnalysis: transcriptAnalysis ? JSON.stringify(transcriptAnalysis) : null
                    }),
                });

                const data = await response.json();
                
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.response || "Sorry, I couldn't process your request. Please try again.",
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            } catch (error) {
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Sorry, I'm experiencing technical difficulties. Please try again later.",
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-4xl flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-8 text-center">Uniplanner</h1>
                <div className="bg-card border border-border rounded-lg shadow-lg p-8 w-full">
                    <div className="text-center mb-6">
                        <div className="flex flex-col items-center gap-4">
                            {/* Chat Messages */}
                            <div className="w-full h-96 border rounded-lg p-4 bg-background overflow-y-auto">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                                                    message.isUser
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted text-foreground'
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted text-foreground p-3 rounded-lg">
                                                <div className="flex items-center space-x-2">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                                    <span>Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="w-full border rounded-lg p-4 bg-muted">
                                <div className="flex flex-col gap-3">
                                    <div className="relative flex items-center">
                                        <textarea
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            className="w-full border rounded-l px-3 py-2 pr-12 resize-none"
                                            placeholder="Ask about courses, schedules, or upload your transcript..."
                                            rows={2}
                                        />
                                        <div className="absolute right-2 top-2 flex items-center gap-2">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="hidden"
                                                onChange={handleFileSelect}
                                                accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="cursor-pointer p-1 hover:bg-gray-200 rounded"
                                                title="Upload transcript"
                                            >
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                    {selectedFile && (
                                        <div className="text-sm text-muted-foreground bg-blue-50 p-2 rounded flex items-center justify-between">
                                            <span>📎 {selectedFile.name}</span>
                                            <button
                                                onClick={handleFileDelete}
                                                className="ml-2 p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                                                title="Remove file"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                    <button 
                                        onClick={sendMessage}
                                        disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
                                        className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/80 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Processing...' : 'Send'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}