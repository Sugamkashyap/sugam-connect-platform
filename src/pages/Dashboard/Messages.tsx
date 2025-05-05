
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { mockContacts, mockConversations } from '@/components/messages/data';
import { Contact, Message } from '@/components/messages/types';
import ContactsList from '@/components/messages/ContactsList';
import ChatArea from '@/components/messages/ChatArea';

const Messages: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockConversations[selectedContact?.id || '1'] || []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (newMessageText: string) => {
    if (!selectedContact) return;
    
    const newMsg: Message = {
      id: `${selectedContact.id}-${messages.length + 1}`,
      senderId: 'me',
      text: newMessageText,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    
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
        <ContactsList 
          contacts={filteredContacts}
          selectedContact={selectedContact}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSelectContact={selectContact}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatArea
            selectedContact={selectedContact}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </Card>
    </div>
  );
};

export default Messages;
