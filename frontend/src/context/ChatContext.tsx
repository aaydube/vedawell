import React, { createContext, useState, ReactNode } from 'react';
import { Message, Conversation } from '../types';
import { Response } from '../utils/Responses';

interface ChatContextType {
  currentConversationId: string | null;
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  currentConversation: Conversation | undefined;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations.find(conv => conv.id === currentConversationId);

  const updateConversationTitle = (id: string, message: string) => {
    const title = message.length > 30 
      ? `${message.substring(0, 30)}...` 
      : message;

    setConversations(prev =>
      prev.map(conv =>
        conv.id === id
          ? { ...conv, title, updatedAt: new Date() }
          : conv
      )
    );
  };

  const sendMessage = async (content: string) => {
    let activeConversationId = currentConversationId;

    // If no conversation exists, start a new one
    if (!activeConversationId) {
      const newId = Date.now().toString();
      const newConversation: Conversation = {
        id: newId,
        title: 'New Conversation',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newId);
      activeConversationId = newId;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              updatedAt: new Date(),
            }
          : conv
      )
    );

    const conv = conversations.find(c => c.id === activeConversationId);
    if (conv && conv.messages.length === 0) {
      updateConversationTitle(activeConversationId, content);
    }

    setIsTyping(true);

    try {
      const responseContent = await Response(content);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, assistantMessage],
                updatedAt: new Date(),
              }
            : conv
        )
      );
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentConversationId,
        isTyping,
        sendMessage,
        currentConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
