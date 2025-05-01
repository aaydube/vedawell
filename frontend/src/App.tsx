import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ChatProvider } from './context/ChatContext';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
};

export default App;