import React, { useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import Message from './Message';

const Conversation: React.FC = () => {
  const { currentConversation, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(currentConversation)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, isTyping]);

  if (!currentConversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-medium text-gray-700 mb-2">Start a Conversation</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          Type a message below to start exploring ancient Ayurvedic wisdom with VedaWell.
        </p>
        <div className="p-4 rounded-lg text-sm md:text-base bg-white shadow-sm border border-amber-200 max-w-md text-center">
          <p className="mb-3 text-lg">
            नमस्ते 🙏 Welcome to VedaWell
          </p>
          <p className="text-gray-600">
            I'm trained on Ayurveda, Atharvaveda, and other traditional texts to help you discover natural approaches to health and wellbeing.
          </p>
        </div>
      </div>
    );}
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4">
        {currentConversation.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex w-full py-8">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 6V2L8 6"></path>
              <path d="M12 2l4 4"></path>
              <path d="M8 12h8"></path>
              <path d="M10 16h4"></path>
              <path d="M8 20h8"></path>
              <path d="M12 22v-8"></path>
            </svg>
              </div>
            </div>
            <div className="flex-grow">
              <div className="font-medium text-sm text-gray-500 mb-1">
                VedaWell
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Conversation;