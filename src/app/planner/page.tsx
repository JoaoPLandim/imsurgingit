'use client';
import React, { useState } from "react";
import link from "next/link";

export default function Planner() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-4xl flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-8 text-center">Uniplanner</h1>
                <div className="bg-card border border-border rounded-lg shadow-lg p-8 w-full">
                    <div className="text-center mb-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full border rounded-lg p-4 bg-muted">
                                <div className="flex flex-col gap-3">
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            className="w-full border rounded-l px-3 py-2 pr-12"
                                            placeholder="What can I help you with?"
                                        />
                                        <div className="absolute right-2 flex items-center gap-2">
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
                                                title="Attach file"
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
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                    <line x1="10" x2="10" y1="11" y2="17" />
                                                    <line x1="14" x2="14" y1="11" y2="17" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 w-full mt-2">
                                        Send
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