
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
const N8N_API_KEY = import.meta.env.VITE_N8N_API_KEY;
const N8N_URL = import.meta.env.VITE_N8N_URL || 'http://localhost:5678';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if Ollama and n8n are installed when the dashboard loads
    const checkOllamaAndN8n = async () => {
      try {
        // Check Ollama
        console.log('Checking Ollama from DashboardLayout');
        const ollamaResponse = await fetch('http://localhost:11434/api/tags', { 
          method: 'GET' 
        });
        
        if (!ollamaResponse.ok) {
          throw new Error(`HTTP ${ollamaResponse.status}: ${ollamaResponse.statusText}`);
        }
        
        console.log('Ollama is available');
      } catch (error) {
        console.error('Ollama check failed:', error);
        toast({
          title: "Ollama Not Detected",
          description: "To use the AI assistant, please make sure Ollama is running on localhost:11434",
          variant: "destructive",
        });
      }
      
      try {
        // Check n8n with API key
        console.log('Checking n8n from DashboardLayout');
        console.log('N8N_URL:', N8N_URL);
        console.log('Using API key:', N8N_API_KEY ? 'API key exists' : 'No API key found');
        
        const n8nResponse = await fetch(`${N8N_URL}/rest/healthz`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': N8N_API_KEY
          }
        });
        
        console.log('n8n response status:', n8nResponse.status);
        
        if (!n8nResponse.ok) {
          const errorData = await n8nResponse.json().catch(() => ({}));
          if (n8nResponse.status === 401) {
            throw new Error('Invalid n8n API key');
          } else {
            throw new Error(errorData.message || 'n8n service unavailable');
          }
        }
        
        console.log('n8n is available');
        toast({
          title: "n8n Connected",
          description: "Successfully connected to n8n workflow engine",
        });
      } catch (error) {
        console.error('n8n check failed:', error);
        toast({
          title: "n8n Not Detected",
          description: error instanceof Error ? error.message : "To create workflows, please make sure n8n is running on localhost:5678",
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
