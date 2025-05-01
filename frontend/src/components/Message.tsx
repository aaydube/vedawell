import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full py-6 border-b border-amber-200 ${isAssistant ? "bg-white" : ""} rounded-md`}>
      <div className="flex-shrink-0 mr-4">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isAssistant ? 'bg-amber-600' : 'bg-blue-600'}
        `}>
          {isAssistant ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 6V2L8 6"></path>
              <path d="M12 2l4 4"></path>
              <path d="M8 12h8"></path>
              <path d="M10 16h4"></path>
              <path d="M8 20h8"></path>
              <path d="M12 22v-8"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
        </div>
      </div>
      <div className="flex-grow max-w-3xl">
        <div className="font-medium text-sm text-gray-500 mb-1">
          {isAssistant ? 'VedaWell' : 'You'}
        </div>
        <div className="prose prose-amber prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;