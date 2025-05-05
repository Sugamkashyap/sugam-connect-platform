
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
      <h3 className="text-lg font-medium">Select a contact</h3>
      <p className="text-muted-foreground">Choose a contact to start messaging</p>
    </div>
  );
};

export default EmptyState;
