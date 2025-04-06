
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';
import OllamaChat from './OllamaChat';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { useState } from 'react';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>

        {/* Floating chat toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          <span className="sr-only">Toggle chat assistant</span>
        </Button>
        
        {/* Ollama Chat Assistant */}
        {showChat && (
          <div className="fixed bottom-20 right-4 w-80 md:w-96 h-[500px] z-40 shadow-2xl border border-border rounded-lg">
            <OllamaChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
