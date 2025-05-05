
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
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
  );
};

export default ChatMessages;
