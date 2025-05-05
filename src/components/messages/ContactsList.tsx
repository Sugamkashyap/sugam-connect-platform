
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectContact: (contact: Contact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  selectedContact,
  searchQuery,
  onSearchChange,
  onSelectContact,
}) => {
  return (
    <div className="w-1/3 border-r">
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-10"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => onSelectContact(contact)}
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
  );
};

export default ContactsList;
