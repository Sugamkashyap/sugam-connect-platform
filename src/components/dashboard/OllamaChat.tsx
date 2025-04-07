
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, AlertTriangle, Check, Copy, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Model {
  name: string;
}

// API keys and configuration
const N8N_API_KEY = import.meta.env.VITE_N8N_API_KEY;
const N8N_URL = import.meta.env.VITE_N8N_URL;
const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;

const RETRY_ATTEMPTS = 3;
const CONNECTION_CHECK_INTERVAL = 30000; // 30 seconds

const OllamaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [workflowJson, setWorkflowJson] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    checkOllamaConnection();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  
    // Set up periodic connection check
    const intervalId = setInterval(checkOllamaConnection, CONNECTION_CHECK_INTERVAL);
    return () => clearInterval(intervalId);
  }, [messages]);

  const checkOllamaConnection = async (retryCount = 0) => {
    try {
      setConnectionStatus('checking');
      
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
        setConnectionStatus('connected');
        
        if (retryCount > 0) {
          toast({
            title: "Connection Restored",
            description: `Successfully reconnected to Ollama service`,
          });
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      setConnectionStatus('disconnected');

      if (retryCount < RETRY_ATTEMPTS) {
        // Exponential backoff retry
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        setTimeout(() => checkOllamaConnection(retryCount + 1), delay);
      } else {
        toast({
          title: "Connection Failed",
          description: "Unable to connect to Ollama after multiple attempts. Please check if the service is running.",
          variant: "destructive",
        });
      }
    }
  };

  const checkN8nStatus = async () => {
    try {
      const response = await fetch(`${N8N_URL}/rest/healthz`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Invalid n8n API key');
        } else {
          throw new Error(errorData.message || 'n8n service unavailable');
        }
      }
      
      // Validate the response format
      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response from n8n');
      }
      
      return true;
    } catch (error) {
      console.error('Error checking n8n status:', error);
      toast({
        title: "n8n Not Available",
        description: error instanceof Error ? error.message : "Workflow creation might fail. Make sure n8n is running on localhost:5678",
        variant: "destructive",
      });
      return false;
    }
  };

  const performWebSearch = async (query: string) => {
    try {
      const response = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`);
      const data = await response.json();
      
      if (data.organic_results) {
        return data.organic_results
          .slice(0, 3)
          .map((result: any) => `${result.title}\n${result.snippet}`)
          .join('\n\n');
      }
      return '';
    } catch (error) {
      console.error('Web search error:', error);
      return '';
    }
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send request to Ollama API with specific prompt for workflow generation
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: `You are a professional n8n workflow architect with deep expertise in business process automation. Your task is to create enterprise-grade n8n workflows that follow industry best practices.

Context from web search (if available):
${await performWebSearch(input)}

Workflow Creation Guidelines:

1. Architecture & Design:
   - Use modular design with clear separation of concerns
   - Implement parallel processing where applicable
   - Add proper error boundaries and recovery mechanisms
   - Include comprehensive logging and monitoring
   - Set up appropriate retry strategies with exponential backoff

2. Node Configuration:
   - Configure detailed error handling for each node
   - Set appropriate timeouts and rate limits
   - Add input validation with type checking
   - Include detailed descriptions and documentation
   - Use consistent naming conventions

3. Data Processing:
   - Implement data transformation with proper error handling
   - Add data validation at entry and exit points
   - Use efficient data structures and processing methods
   - Include data sanitization and security checks
   - Handle edge cases and null values

4. Security & Performance:
   - Implement authentication and authorization
   - Use secure credential storage
   - Add rate limiting and request throttling
   - Optimize resource usage and processing time
   - Include audit logging for sensitive operations

5. Error Handling & Monitoring:
   - Add comprehensive error notifications
   - Implement error recovery mechanisms
   - Include detailed error logging
   - Set up monitoring and alerting
   - Add performance metrics collection

6. Industry-Specific Considerations:
   - Follow relevant compliance requirements
   - Implement industry-standard security measures
   - Add domain-specific validation rules
   - Include necessary regulatory checks
   - Follow industry best practices

Analyze the following request and create a production-ready n8n workflow:
${input}

Respond with a complete, production-ready workflow JSON that includes all necessary nodes, connections, and configurations. The JSON must follow the n8n workflow schema and include all required security, error handling, and monitoring components.`,
          stream: false,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to connect to Ollama API: ${response.status}`);
      }
      
      const data = await response.json();
      let workflowJson;
      
      try {
        // Extract and validate the workflow JSON
        const aiResponse = data.response;
        // Remove any potential markdown formatting or extra text
        const jsonStr = aiResponse.replace(/```json\n?|```/g, '').trim();
        const parsedJson = JSON.parse(jsonStr);
        
        // Basic validation of workflow structure
        if (!parsedJson.nodes || !Array.isArray(parsedJson.nodes)) {
          throw new Error('Invalid workflow structure: missing nodes array');
        }
        
        if (!parsedJson.connections || typeof parsedJson.connections !== 'object') {
          throw new Error('Invalid workflow structure: missing connections object');
        }

        // Store the formatted JSON for display
        setWorkflowJson(JSON.stringify(parsedJson, null, 2));
        workflowJson = parsedJson;
      } catch (parseError) {
        console.error('Workflow JSON parsing error:', parseError);
        const errorMessage: Message = {
          role: 'assistant',
          content: "I couldn't generate a valid workflow JSON. Please try rephrasing your request with more specific details about the automation you need."
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }
      
      // Create the workflow in n8n
      try {
        const workflowResponse = await fetch('http://localhost:5678/rest/workflows', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': N8N_API_KEY
          },
          body: JSON.stringify(workflowJson)
        });
        
        if (workflowResponse.ok) {
          const workflowData = await workflowResponse.json();
          toast({
            title: "Workflow Created",
            description: `New workflow has been created in n8n with the provided automation logic`,
          });
          
          const successMessage: Message = {
            role: 'assistant',
            content: `✅ I've created a workflow that solves your automation problem. You can now find it in your n8n dashboard.\n\nThe workflow includes all necessary nodes and connections to automate your task. Would you like me to explain how it works?`
          };
          setMessages((prev) => [...prev, successMessage]);
        } else {
          throw new Error('Failed to create workflow');
        }
      } catch (error) {
        console.error('Failed to create n8n workflow:', error);
        const errorMessage: Message = {
          role: 'assistant',
          content: "I generated a workflow solution, but couldn't save it to n8n. Please ensure n8n is running and try again."
        };
        setMessages((prev) => [...prev, errorMessage]);
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

  const handleCopyJson = () => {
    navigator.clipboard.writeText(workflowJson);
    toast({
      title: "JSON Copied",
      description: "Workflow JSON has been copied to clipboard",
    });
  };

  const handleJsonEdit = (value: string) => {
    setWorkflowJson(value);
  };

  const handleJsonSubmit = async () => {
    try {
      const parsedJson = JSON.parse(workflowJson);
      
      const workflowResponse = await fetch('http://localhost:5678/rest/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        },
        body: JSON.stringify(parsedJson)
      });
      
      if (workflowResponse.ok) {
        toast({
          title: "Workflow Updated",
          description: "The workflow has been updated with your changes",
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to update workflow');
      }
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please ensure the JSON is valid before submitting",
        variant: "destructive",
      });
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
        {workflowJson && (
          <Card className="mb-4 bg-muted/50 border-2 border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Workflow JSON</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="hover:bg-muted"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit JSON</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyJson}
                    className="hover:bg-muted"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy JSON</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={workflowJson}
                    onChange={(e) => handleJsonEdit(e.target.value)}
                    className="font-mono text-sm min-h-[200px] w-full bg-background border-2 focus:border-brand-blue"
                    spellCheck="false"
                  />
                  <Button
                    onClick={handleJsonSubmit}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  >
                    Update Workflow
                  </Button>
                </div>
              ) : (
                <pre className="text-sm overflow-auto max-h-[200px] p-4 bg-background border rounded-md font-mono whitespace-pre-wrap break-all">
                  {workflowJson}
                </pre>
              )}
            </CardContent>
          </Card>
        )}
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
              onClick={() => checkOllamaConnection()}
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
