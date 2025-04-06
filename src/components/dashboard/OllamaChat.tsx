
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const OllamaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send request to Ollama API (running locally)
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3', // Default model, can be configured based on what's installed
          messages: [...messages, userMessage],
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to connect to Ollama API');
      }
      
      const data = await response.json();
      
      // Check if the message contains workflow creation instruction
      if (input.toLowerCase().includes('create workflow') || 
          input.toLowerCase().includes('new workflow') ||
          input.toLowerCase().includes('setup workflow')) {
        
        // Attempt to trigger n8n workflow creation
        try {
          await fetch('http://localhost:5678/rest/workflows', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `Workflow for ${input.split('for').pop()?.trim() || 'New Client'}`,
              active: false,
              nodes: [],
              connections: {},
            }),
          });
          
          toast({
            title: "Workflow Created",
            description: "New workflow has been created in n8n",
          });
        } catch (error) {
          console.error('Failed to create n8n workflow:', error);
          toast({
            title: "Workflow Creation Failed",
            description: "Make sure n8n is running on localhost:5678",
            variant: "destructive",
          });
        }
      }
      
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: data.message?.content || "I'll help you with that workflow."
      }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Ollama API. Make sure Ollama is running.",
        variant: "destructive",
      });
      
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: "I couldn't process your request. Please ensure Ollama is running on your local machine."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-blue" />
          Workflow Assistant
        </CardTitle>
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
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default OllamaChat;
