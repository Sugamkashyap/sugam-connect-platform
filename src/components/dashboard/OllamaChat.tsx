
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Model {
  name: string;
}

// n8n API key
const N8N_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNmI5MWRhNy1iNTA5LTRlOWMtOGE2Zi1jY2UzNjFjNDg5OTYiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzQzOTM4MzUzfQ.TwBc9feJWl5QHQrPNLWsE6AhRcLTL3CfDc0U1OJrBR4";

const OllamaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    checkOllamaConnection();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check Ollama connection and fetch available models
  const checkOllamaConnection = async () => {
    try {
      setConnectionStatus('checking');
      
      // Check if Ollama is running by fetching the list of models
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
        setConnectionStatus('connected');
        
        toast({
          title: "Connected to Ollama",
          description: `Found ${data.models?.length || 0} models available`,
        });
      } else {
        throw new Error('Failed to connect to Ollama API');
      }
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      setConnectionStatus('disconnected');
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Ollama. Make sure it's running on localhost:11434",
        variant: "destructive",
      });
    }
  };

  const checkN8nStatus = async () => {
    try {
      const response = await fetch('http://localhost:5678/rest/healthz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        },
      });
      
      if (!response.ok) {
        throw new Error('n8n service unavailable');
      }
      
      return true;
    } catch (error) {
      console.error('Error checking n8n status:', error);
      toast({
        title: "n8n Not Available",
        description: "Workflow creation might fail. Make sure n8n is running on localhost:5678",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Check if this might be a workflow creation request
    const isWorkflowRequest = 
      input.toLowerCase().includes('create workflow') || 
      input.toLowerCase().includes('new workflow') ||
      input.toLowerCase().includes('setup workflow');
      
    if (isWorkflowRequest) {
      // Check n8n status before proceeding
      await checkN8nStatus();
    }
    
    try {
      // Send request to Ollama API (running locally)
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: 'You are a helpful assistant that specializes in creating workflows for clients. When asked to create a workflow, provide specific details about what the workflow will do.' },
            ...messages, 
            userMessage
          ],
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to connect to Ollama API: ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.message?.content || "I'll help you with that workflow."
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // If this was a workflow creation request, attempt to create a workflow in n8n
      if (isWorkflowRequest) {
        try {
          const clientName = input.split('for').pop()?.trim() || 'New Client';
          
          const workflowResponse = await fetch('http://localhost:5678/rest/workflows', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-N8N-API-KEY': N8N_API_KEY
            },
            body: JSON.stringify({
              name: `Workflow for ${clientName}`,
              active: false,
              nodes: [],
              connections: {},
            }),
          });
          
          if (workflowResponse.ok) {
            const workflowData = await workflowResponse.json();
            toast({
              title: "Workflow Created",
              description: `New workflow "${workflowData.data.name}" has been created in n8n`,
            });
            
            // Add system message about the workflow creation
            const systemMessage: Message = { 
              role: 'system', 
              content: `✅ Created workflow "${workflowData.data.name}" in n8n.`
            };
            setMessages((prev) => [...prev, systemMessage]);
          } else {
            throw new Error('Failed to create workflow');
          }
        } catch (error) {
          console.error('Failed to create n8n workflow:', error);
          toast({
            title: "Workflow Creation Failed",
            description: "Make sure n8n is running on localhost:5678",
            variant: "destructive",
          });
          
          // Add system message about the failure
          const systemMessage: Message = { 
            role: 'system', 
            content: '❌ Failed to create workflow in n8n. Please make sure n8n is running.'
          };
          setMessages((prev) => [...prev, systemMessage]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Ollama API. Make sure Ollama is running.",
        variant: "destructive",
      });
      
      const errorMessage: Message = { 
        role: 'assistant', 
        content: "I couldn't process your request. Please ensure Ollama is running on your local machine."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-brand-blue" />
            Workflow Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            {connectionStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            {connectionStatus === 'connected' && <Check className="h-4 w-4 text-green-500" />}
            {connectionStatus === 'disconnected' && <AlertTriangle className="h-4 w-4 text-destructive" />}
            <span className="text-xs font-medium">
              {connectionStatus === 'checking' ? 'Checking...' : 
               connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        
        {availableModels.length > 0 && (
          <div className="mt-2">
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel}
            >
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.name} value={model.name}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto pb-0">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p>Ask me to create workflows for your clients or help with automation tasks.</p>
              <p className="text-sm mt-2">Example: "Create a workflow for Dr. Smith's appointment system"</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-brand-blue text-white'
                      : message.role === 'system'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Describe the workflow you need..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || connectionStatus === 'disconnected'}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || connectionStatus === 'disconnected' || !input.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          {connectionStatus === 'disconnected' && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={checkOllamaConnection}
            >
              Retry
            </Button>
          )}
        </form>
      </CardFooter>
    </Card>
  );
};

export default OllamaChat;
