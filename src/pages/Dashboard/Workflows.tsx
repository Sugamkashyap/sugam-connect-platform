import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Play, Pause, Settings2, Activity, ExternalLink } from 'lucide-react';

const N8N_URL = import.meta.env.VITE_N8N_URL;

const Workflows: React.FC = () => {
  const openN8n = () => {
    window.open(N8N_URL, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflows</h2>
          <p className="text-muted-foreground">Manage your automation processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openN8n}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Open n8n
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Active Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Client Onboarding Flow</h4>
                    <p className="text-sm text-muted-foreground">Last triggered 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inactive Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Inactive Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Document Processing</h4>
                    <p className="text-sm text-muted-foreground">Last active 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Analytics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workflows;