
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
const N8N_URL = import.meta.env.VITE_N8N_URL || 'http://localhost:5678';
const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;

const RETRY_ATTEMPTS = 3;
const CONNECTION_CHECK_INTERVAL = 30000; // 30 seconds

const OllamaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [workflowJson, setWorkflowJson] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    checkOllamaConnection();
    const intervalId = setInterval(checkOllamaConnection, CONNECTION_CHECK_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkOllamaConnection = async (retryCount = 0) => {
    try {
      setConnectionStatus('checking');
      console.log('Checking Ollama connection...');
      
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Available models:', data);
        
        if (data.models && Array.isArray(data.models) && data.models.length > 0) {
          setAvailableModels(data.models);
          // Select the first model by default if none is selected
          if (!selectedModel && data.models.length > 0) {
            setSelectedModel(data.models[0].name);
          }
        } else {
          console.log('No models found in response');
          setAvailableModels([]);
        }
        
        setConnectionStatus('connected');
        
        if (retryCount > 0) {
          toast({
            title: "Connection Restored",
            description: `Successfully reconnected to Ollama service`,
          });
        }
      } else {
        console.error('Ollama response not ok:', response.status);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      setConnectionStatus('disconnected');

      if (retryCount < RETRY_ATTEMPTS) {
        // Exponential backoff retry
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        console.log(`Retrying in ${delay}ms (attempt ${retryCount + 1}/${RETRY_ATTEMPTS})`);
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
      console.log('Checking n8n status...');
      console.log('N8N_URL:', N8N_URL);
      console.log('N8N_API_KEY:', N8N_API_KEY ? 'API key exists' : 'API key missing');
      
      const response = await fetch(`${N8N_URL}/rest/healthz`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        },
      });
      
      console.log('n8n response status:', response.status);
      
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
      if (!SERPAPI_KEY) {
        console.log('No SerpAPI key available, skipping web search');
        return '';
      }
      
      console.log('Performing web search for:', query);
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
    if (!selectedModel) {
      toast({
        title: "Model Not Selected",
        description: "Please select an Ollama model first",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      console.log('Sending request to Ollama API with model:', selectedModel);
      console.log('User input:', input);
      
      // First verify n8n is available
      await checkN8nStatus();
      
      // Send request to Ollama API with specific prompt for workflow generation
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content: `You are a professional n8n workflow architect with deep expertise in business process automation. Your task is to create enterprise-grade n8n workflows that follow industry best practices.`
            },
            {
              role: "user", 
              content: `Create a workflow for: ${input}\n\nContext from web search (if available):\n${await performWebSearch(input)}`
            }
          ],
          stream: false,
        }),
      });
      
      if (!response.ok) {
        console.error('Ollama API error:', response.status, response.statusText);
        throw new Error(`Failed to connect to Ollama API: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Ollama response:', data);
      
      let workflowJson;
      const aiResponseContent = data.message?.content;
      
      if (!aiResponseContent) {
        throw new Error('No content in Ollama response');
      }
      
      try {
        // Extract JSON from the response (may be wrapped in markdown code blocks)
        const jsonMatch = aiResponseContent.match(/```json\n?([\s\S]*?)\n?```/) || 
                          aiResponseContent.match(/```\n?([\s\S]*?)\n?```/) ||
                          aiResponseContent.match(/{[\s\S]*}/);
                          
        const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponseContent;
        console.log('Extracted JSON string:', jsonStr);
        
        // Remove any markdown formatting that might remain
        const cleanedJsonStr = jsonStr.replace(/```json\n?|```/g, '').trim();
        console.log('Cleaned JSON string:', cleanedJsonStr);
        
        // Parse the JSON
        const parsedJson = JSON.parse(cleanedJsonStr);
        
        // Basic validation of workflow structure
        if (!parsedJson.nodes || !Array.isArray(parsedJson.nodes)) {
          throw new Error('Invalid workflow structure: missing nodes array');
        }
        
        if (!parsedJson.connections || typeof parsedJson.connections !== 'object') {
          throw new Error('Invalid workflow structure: missing connections object');
        }

        // Store the formatted JSON for display
        const formattedJson = JSON.stringify(parsedJson, null, 2);
        console.log('Parsed workflow JSON:', formattedJson);
        setWorkflowJson(formattedJson);
        workflowJson = parsedJson;
        
        // Now send this to n8n to create the workflow
        const workflowResponse = await fetch(`${N8N_URL}/rest/workflows`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': N8N_API_KEY
          },
          body: JSON.stringify(workflowJson)
        });
        
        if (workflowResponse.ok) {
          const workflowData = await workflowResponse.json();
          console.log('n8n workflow created:', workflowData);
          
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
          const errorData = await workflowResponse.json().catch(() => ({}));
          console.error('n8n workflow creation failed:', workflowResponse.status, errorData);
          throw new Error(`Failed to create workflow: ${errorData.message || workflowResponse.statusText}`);
        }
        
      } catch (parseError) {
        console.error('Workflow JSON parsing error:', parseError);
        
        // Still display the AI response even if we couldn't extract workflow JSON
        const assistantMessage: Message = {
          role: 'assistant',
          content: aiResponseContent
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        toast({
          title: "JSON Parsing Error",
          description: "I couldn't generate a valid workflow JSON. Please try rephrasing your request.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to process your request.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error 
          ? `Error: ${error.message}. Please ensure Ollama and n8n are running on your local machine.` 
          : "I couldn't process your request. Please ensure Ollama is running on your local machine."
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
            disabled={isLoading || connectionStatus === 'disconnected' || !input.trim() || !selectedModel}
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
