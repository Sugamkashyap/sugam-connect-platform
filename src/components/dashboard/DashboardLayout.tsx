
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';
import OllamaChat from './OllamaChat';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// n8n API key
const N8N_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNmI5MWRhNy1iNTA5LTRlOWMtOGE2Zi1jY2UzNjFjNDg5OTYiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzQzOTM4MzUzfQ.TwBc9feJWl5QHQrPNLWsE6AhRcLTL3CfDc0U1OJrBR4";

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if Ollama is installed when the dashboard loads
    const checkOllamaAndN8n = async () => {
      try {
        // Check Ollama
        await fetch('http://localhost:11434/api/tags', { method: 'GET' });
      } catch (error) {
        toast({
          title: "Ollama Not Detected",
          description: "To use the AI assistant, please make sure Ollama is running on localhost:11434",
          variant: "destructive",
        });
      }
      
      try {
        // Check n8n with API key
        await fetch('http://localhost:5678/rest/healthz', { 
          method: 'GET',
          headers: {
            'X-N8N-API-KEY': N8N_API_KEY
          }
        });
      } catch (error) {
        toast({
          title: "n8n Not Detected",
          description: "To create workflows, please make sure n8n is running on localhost:5678",
          variant: "destructive",
        });
      }
    };
    
    checkOllamaAndN8n();
  }, [toast]);
  
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
