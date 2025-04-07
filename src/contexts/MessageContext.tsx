import React, { createContext, useContext, useState, useEffect } from 'react';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
};

type MessageContextType = {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  getUnreadCount: () => number;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };

  const getUnreadCount = () => {
    return messages.filter(message => !message.isRead).length;
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        markAsRead,
        getUnreadCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};