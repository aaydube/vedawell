import React from 'react';
import { Message as MessageType } from '../types';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  function cleanKeepLines(rawAnswer:string) {
    return rawAnswer
    .replace(/\u200b/g, '')
    .replace(/\r?\n{2,}/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .split('\n')
    .map(line => line.trim().replace(/^\d+\.\s*/, ''))
    .filter(line => line.length > 0)
    .join(' \n ');
}

  return (
    <div
      className={`flex w-full px-4 py-6 rounded-xl border-b border-amber-100 transition-colors duration-200 ${
        isAssistant ? 'bg-amber-100 md:mb-5' : 'bg-amber-50'
      }`}
      aria-label={`${isAssistant ? 'VedaWell' : 'You'} message`}
    >
      {/* Avatar */}
      <div className="mr-4 flex-shrink-0">
        <div
          className={`
            w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md
            ${isAssistant ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}
          `}
          aria-hidden="true"
        >
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

      {/* Message Body */}
      <div className="flex-grow max-w-3xl">
        <div className="mb-2 flex items-center gap-2">
          <span className={`font-semibold text-sm ${isAssistant ? 'text-amber-700' : 'text-blue-700'} `}>
            {isAssistant ? 'VedaWell' : 'You'}
          </span>
          {message.timestamp && (
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>

        <div className={`prose prose-sm max-w-none whitespace-pre-wrap text-amber-900 ${!isAssistant ? "text-gray-800" : "" }`}>
          <ReactMarkdown>{cleanKeepLines(message.content )}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
