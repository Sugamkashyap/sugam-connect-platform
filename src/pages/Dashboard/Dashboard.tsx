import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users, AlertTriangle, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import WorkflowStats from '@/components/dashboard/WorkflowStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientTable from '@/components/dashboard/ClientTable';

// n8n API key
const N8N_API_KEY = import.meta.env.VITE_N8N_API_KEY;
const N8N_URL = import.meta.env.VITE_N8N_URL || 'http://localhost:5678';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [n8nStatus, setN8nStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showN8nDialog, setShowN8nDialog] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkN8nStatus();
    checkOllamaStatus();
  }, []);

  const checkN8nStatus = async () => {
    try {
      setN8nStatus('checking');
      console.log('Checking n8n status with URL:', N8N_URL);
      console.log('Using API key:', N8N_API_KEY ? 'API key exists' : 'No API key found');
      
      const response = await fetch(`${N8N_URL}/rest/healthz`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-N8N-API-KEY': N8N_API_KEY
        }
      });
      
      console.log('n8n response status:', response.status);
      
      if (response.ok) {
        console.log('n8n is online');
        setN8nStatus('online');
        toast({
          title: "n8n is running",
          description: "Successfully connected to n8n workflow engine",
        });
      } else {
        console.error('n8n response not ok:', response.status, response.statusText);
        setN8nStatus('offline');
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error checking n8n status:', error);
      setN8nStatus('offline');
      toast({
        title: "Connection Error",
        description: "Unable to connect to n8n. Please make sure it's running on localhost:5678 and your API key is correct",
        variant: "destructive",
      });
    }
  };

  const checkOllamaStatus = async () => {
    try {
      setOllamaStatus('checking');
      console.log('Checking Ollama status');
      
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
      });
      
      if (response.ok) {
        console.log('Ollama is online');
        setOllamaStatus('online');
      } else {
        console.log('Ollama response not ok:', response.status);
        setOllamaStatus('offline');
        throw new Error('Ollama service unavailable');
      }
    } catch (error) {
      console.error('Error checking Ollama status:', error);
      setOllamaStatus('offline');
    }
  };

  const openN8n = () => {
    window.open(N8N_URL, '_blank');
  };

  const openOllamaInfo = () => {
    setShowN8nDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Here's an overview of your workspace activity</p>
      </div>

      {/* Services Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* n8n Status Card */}
        <Card className={n8nStatus === 'online' ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={n8nStatus === 'online' ? "bg-green-100 p-3 rounded-full" : "bg-amber-100 p-3 rounded-full"}>
                  {n8nStatus === 'online' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">n8n Workflow Engine</h3>
                  <p className="text-sm text-muted-foreground">
                    {n8nStatus === 'online' 
                      ? "Connected to n8n workflow engine on localhost:5678" 
                      : "n8n workflow engine is not detected"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={checkN8nStatus}>
                  Check Status
                </Button>
                <Button onClick={openN8n}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open n8n
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ollama Status Card */}
        <Card className={ollamaStatus === 'online' ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={ollamaStatus === 'online' ? "bg-green-100 p-3 rounded-full" : "bg-amber-100 p-3 rounded-full"}>
                  {ollamaStatus === 'online' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Ollama AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    {ollamaStatus === 'online' 
                      ? "Connected to Ollama on localhost:11434" 
                      : "Ollama service is not detected"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={checkOllamaStatus}>
                  Check Status
                </Button>
                <Button onClick={openOllamaInfo}>
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-2 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Stats and Recent Activities */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <WorkflowStats />
        <RecentActivities />
      </div>

      {/* Client Table */}
      <div className="mt-6">
        <ClientTable />
      </div>

      {/* Content area for workspace */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Workflow #{i + 1} completed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i + 1} hour{i !== 0 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex flex-col">
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4" onClick={openN8n}>
                  <div>
                    <h4 className="font-medium leading-none mb-1">Create new workflow</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up automated processes for your clients
                    </p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4 mt-2">
                  <div>
                    <h4 className="font-medium leading-none mb-1">Manage appointments</h4>
                    <p className="text-sm text-muted-foreground">
                      View and organize your upcoming schedule
                    </p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4 mt-2">
                  <div>
                    <h4 className="font-medium leading-none mb-1">Client documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Access and manage client files and forms
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ollama Info Dialog */}
      <Dialog open={showN8nDialog} onOpenChange={setShowN8nDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setting Up Ollama</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4">
            <p>To use the AI assistant, you need to have Ollama running locally:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Download and install Ollama from <a href="https://ollama.ai" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a></li>
              <li>Open a terminal and run: <code className="bg-gray-100 px-2 py-1 rounded">ollama run llama3</code></li>
              <li>Ensure Ollama is running on port 11434</li>
              <li>Refresh this page once Ollama is running</li>
            </ol>
            <p className="mt-4">For more information, visit the <a href="https://github.com/ollama/ollama" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ollama GitHub repository</a>.</p>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowN8nDialog(false)}>Close</Button>
            <Button variant="outline" onClick={checkOllamaStatus}>Check Connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
