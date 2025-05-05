import React from 'react';
import Conversation from './Conversation';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-50">
      <header className="h-14 border-b border-amber-200 flex items-center px-4 bg-white/30 backdrop-blur-2xl sticky top-0 z-10">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-wide">VedaWell</h1>
      </header>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Conversation />
      </main>
      
      <footer className="border-t bg-white/30 backdrop-blur-2xl border-amber-200  sticky bottom-0 z-10">
        <ChatInput />
      </footer>
    </div>
  );
};

export default ChatInterface;