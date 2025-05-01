import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isTyping } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight > 200 ? '200px' : `${scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    await sendMessage(message.trim());
    setMessage('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-amber-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Ayurvedic wisdom..."
          className="w-full border border-amber-200 rounded-lg px-4 py-3 pr-16 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          rows={1}
          disabled={isTyping}
        />
        <div className="absolute right-2 bottom-3 flex space-x-2">
          <button
            type="submit"
            disabled={!message.trim() || isTyping}
            className={`p-2 rounded-full ${
              !message.trim() || isTyping
                ? 'text-gray-400 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </form>
      <div className="max-w-3xl mx-auto mt-2 text-center text-xs text-gray-500">
        <span>VedaWell integrates ancient wisdom with modern understanding</span>
      </div>
    </div>
  );
};


export default ChatInput;