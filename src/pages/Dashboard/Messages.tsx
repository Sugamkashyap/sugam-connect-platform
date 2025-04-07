
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Send, MessageSquare, Star, MoreHorizontal, Phone, Video, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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

const mockContacts: Contact[] = [
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
    lastMessage: 'I'll send the invoice tomorrow', 
    unread: 0, 
    lastActive: '5 hours ago' 
  },
];

const mockConversations: Record<string, Message[]> = {
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

const Messages: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockConversations[selectedContact?.id || '1'] || []);
  const [newMessage, setNewMessage] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    const newMsg: Message = {
      id: `${selectedContact.id}-${messages.length + 1}`,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Mark all incoming messages as read when we send a new message
    if (selectedContact.unread > 0) {
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, unread: 0 } 
          : contact
      ));
    }
  };

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages(mockConversations[contact.id] || []);
    
    // Mark messages as read when selecting the contact
    if (contact.unread > 0) {
      setContacts(contacts.map(c => 
        c.id === contact.id 
          ? { ...c, unread: 0 } 
          : c
      ));
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with your clients</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <Card className="flex flex-1 overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[calc(100vh-13rem)]">
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted",
                      selectedContact?.id === contact.id && "bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                          "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                          contact.status === "online" && "bg-green-500",
                          contact.status === "away" && "bg-yellow-500",
                          contact.status === "offline" && "bg-gray-500"
                        )} />
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <p className="text-xs text-muted-foreground truncate w-40">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">{contact.lastActive}</span>
                      {contact.unread > 0 && (
                        <span className="bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedContact.name}</div>
                    <p className="text-xs text-muted-foreground">
                      {selectedContact.status === 'online' ? 'Online' : 
                       selectedContact.status === 'away' ? 'Away' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn(
                      "flex",
                      message.senderId === 'me' ? "justify-end" : "justify-start"
                    )}>
                      <div className={cn(
                        "max-w-[70%] rounded-lg px-4 py-2",
                        message.senderId === 'me' 
                          ? "bg-brand-blue text-white" 
                          : "bg-muted"
                      )}>
                        <p>{message.text}</p>
                        <span className={cn(
                          "text-xs block mt-1",
                          message.senderId === 'me' ? "text-blue-100" : "text-muted-foreground"
                        )}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">Select a contact</h3>
              <p className="text-muted-foreground">Choose a contact to start messaging</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Messages;
