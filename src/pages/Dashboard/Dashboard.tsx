import React, { useEffect, useState } from 'react';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WorkflowStats from '@/components/dashboard/WorkflowStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientTable from '@/components/dashboard/ClientTable';
import ServiceStatus from '@/components/dashboard/ServiceStatus';
import StatCard from '@/components/dashboard/StatCard';
import ServiceInfoDialog from '@/components/dashboard/ServiceInfoDialog';
import QuickAccessCard from '@/components/dashboard/QuickAccessCard';

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

  const quickActions = [
    {
      title: "Create new workflow",
      description: "Set up automated processes for your clients",
      onClick: openN8n
    },
    {
      title: "Manage appointments",
      description: "View and organize your upcoming schedule",
      onClick: () => window.location.href = "/dashboard/appointments"
    },
    {
      title: "Client documents",
      description: "Access and manage client files and forms",
      onClick: () => window.location.href = "/dashboard/documents"
    }
  ];

  const ollamaInfoContent = (
    <>
      <p>To use the AI assistant, you need to have Ollama running locally:</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Download and install Ollama from <a href="https://ollama.ai" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a></li>
        <li>Open a terminal and run: <code className="bg-gray-100 px-2 py-1 rounded">ollama run llama3</code></li>
        <li>Ensure Ollama is running on port 11434</li>
        <li>Refresh this page once Ollama is running</li>
      </ol>
      <p className="mt-4">For more information, visit the <a href="https://github.com/ollama/ollama" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Ollama GitHub repository</a>.</p>
    </>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Here's an overview of your workspace activity</p>
      </div>

      {/* Services Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* n8n Status Card */}
        <ServiceStatus 
          name="n8n Workflow Engine"
          status={n8nStatus}
          description={{
            online: "Connected to n8n workflow engine on localhost:5678",
            offline: "n8n workflow engine is not detected"
          }}
          onCheck={checkN8nStatus}
          onAction={openN8n}
          actionLabel="Open n8n"
        />

        {/* Ollama Status Card */}
        <ServiceStatus 
          name="Ollama AI Assistant"
          status={ollamaStatus}
          description={{
            online: "Connected to Ollama on localhost:11434",
            offline: "Ollama service is not detected"
          }}
          onCheck={checkOllamaStatus}
          onAction={openOllamaInfo}
          actionLabel="Learn More"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Clients"
          value={24}
          change="+3 from last month"
          icon={Users}
        />
        <StatCard 
          title="Active Workflows"
          value={12}
          change="+2 new this week"
          icon={Activity}
        />
        <StatCard 
          title="Revenue"
          value="₹45,231"
          change="+20.1% from last month"
          icon={DollarSign}
        />
        <StatCard 
          title="Pending Approvals"
          value={5}
          change="-2 from yesterday"
          icon={CreditCard}
        />
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
        {/* Recent Activity - reused component */}
        <Card className="col-span-4">
          <RecentActivities />
        </Card>

        {/* Quick Access */}
        <QuickAccessCard actions={quickActions} />
      </div>

      {/* Ollama Info Dialog */}
      <ServiceInfoDialog
        open={showN8nDialog}
        onOpenChange={setShowN8nDialog}
        onCheckConnection={checkOllamaStatus}
        title="Setting Up Ollama"
        description={ollamaInfoContent}
      />
    </div>
  );
};

export default Dashboard;
