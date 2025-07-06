import React from 'react';
import Conversation from './Conversation';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-amber-100">
      <header className="h-14 border-b rounded-b-2xl border-amber-200 flex items-center px-4 bg-white/30 backdrop-blur-2xl sticky top-0 z-10">
        <h1 className="text-xl md:text-xl font-semibold font-mono text-amber-800 tracking-wide">VedaWell</h1>
      </header>
      
      <main className="flex-1 flex mb-20 flex-col overflow-hidden">
        <Conversation />
      </main>
      
      <footer className="border-t backdrop-blur-2xl border-amber-200  sticky bottom-0 z-10">
        <ChatInput />
      </footer>
    </div>
  );
};

export default ChatInterface;