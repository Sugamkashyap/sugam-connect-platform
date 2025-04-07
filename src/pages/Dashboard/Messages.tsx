import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, MoreVertical, Mail } from 'lucide-react';
import { useMessages } from '@/contexts/MessageContext';
import { format } from 'date-fns';

type Contact = {
  id: string;
  name: string;
  email: string;
  latestMessage: string;
  timestamp: Date;
};

const Messages: React.FC = () => {
  const { messages, markAsRead } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  // Group messages by contact (email)
  const contacts = messages.reduce<Contact[]>((acc, message) => {
    const existingContact = acc.find(contact => contact.email === message.email);
    if (!existingContact) {
      acc.push({
        id: message.id,
        name: message.name,
        email: message.email,
        latestMessage: message.message,
        timestamp: message.timestamp
      });
    }
    return acc;
  }, []).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get messages for selected contact
  const selectedContactMessages = selectedContact
    ? messages
        .filter(message => message.email === selectedContact)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with your clients</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Contacts List */}
        <Card className="w-80">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Mail className="h-8 w-8 mx-auto mb-2" />
                  <p>No messages found</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${contact.email === selectedContact ? 'bg-muted' : ''}`}
                    onClick={() => {
                      setSelectedContact(contact.email);
                      const unreadMessage = messages.find(m => m.email === contact.email && !m.isRead);
                      if (unreadMessage) {
                        markAsRead(unreadMessage.id);
                      }
                    }}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {format(contact.timestamp, 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.latestMessage}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              {selectedContact ? (
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {contacts.find(c => c.email === selectedContact)?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Select a contact to view messages
                </div>
              )}
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-6">
            <div className="space-y-4">
              {selectedContactMessages.map((message) => (
                <div key={message.id} className="flex items-end gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className="text-sm font-medium">{message.subject}</p>
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {format(message.timestamp, 'MMM d, h:mm a')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;