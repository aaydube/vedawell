import React from 'react';
import Conversation from './Conversation';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-amber-200 flex items-center px-4 bg-white">
          <h1 className="text-lg pl-4 font-medium">VedaWell</h1>
        </header>
        
        <Conversation />
        
        <ChatInput />
      </main>
    </div>
  );
};

export default ChatInterface;