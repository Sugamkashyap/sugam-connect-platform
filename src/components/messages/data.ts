
import { Contact, Message } from './types';

export const mockContacts: Contact[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    status: 'online', 
    lastMessage: 'Can you send the updated document?', 
    unread: 2, 
    lastActive: 'Just now' 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    status: 'online', 
    lastMessage: 'Meeting scheduled for tomorrow', 
    unread: 0, 
    lastActive: '5 min ago' 
  },
  { 
    id: '3', 
    name: 'Alex Johnson', 
    status: 'away', 
    lastMessage: 'Please review the proposal', 
    unread: 0, 
    lastActive: '30 min ago' 
  },
  { 
    id: '4', 
    name: 'Sarah Wilson', 
    status: 'offline', 
    lastMessage: 'Thanks for your help!', 
    unread: 0, 
    lastActive: '2 hours ago' 
  },
  { 
    id: '5', 
    name: 'Mike Brown', 
    status: 'offline', 
    lastMessage: "I'll send the invoice tomorrow", 
    unread: 0, 
    lastActive: '5 hours ago' 
  },
];

export const mockConversations: Record<string, Message[]> = {
  '1': [
    { id: '1-1', senderId: '1', text: 'Hello, I need some information about the project timeline.', timestamp: '10:30 AM', read: true },
    { id: '1-2', senderId: 'me', text: 'Sure, I can help with that. What specific details do you need?', timestamp: '10:32 AM', read: true },
    { id: '1-3', senderId: '1', text: 'I need to know when the first phase will be completed.', timestamp: '10:35 AM', read: true },
    { id: '1-4', senderId: 'me', text: 'The first phase is scheduled to be completed by next Friday.', timestamp: '10:36 AM', read: true },
    { id: '1-5', senderId: '1', text: 'Great, thank you! Can you send the updated document?', timestamp: '10:45 AM', read: false },
    { id: '1-6', senderId: '1', text: 'Also, do we need to prepare anything for the client meeting?', timestamp: '10:47 AM', read: false },
  ],
  '2': [
    { id: '2-1', senderId: '2', text: 'Hi, are we still meeting tomorrow?', timestamp: '9:15 AM', read: true },
    { id: '2-2', senderId: 'me', text: 'Yes, 2 PM at the office.', timestamp: '9:20 AM', read: true },
    { id: '2-3', senderId: '2', text: 'Perfect. Meeting scheduled for tomorrow.', timestamp: '9:22 AM', read: true },
  ],
};
