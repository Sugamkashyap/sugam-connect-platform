
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  unread: number;
  lastActive: string;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface ChatAreaProps {
  selectedContact: Contact | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedContact,
  messages,
  onSendMessage,
}) => {
  if (!selectedContact) {
    return <EmptyState />;
  }

  return (
    <>
      <ChatHeader contact={selectedContact} />
      <ChatMessages messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatArea;
