
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { toast } = useToast();

  const checkN8nStatus = async () => {
    try {
      const response = await fetch('http://localhost:5678/rest/healthz', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        toast({
          title: "n8n is running",
          description: "Successfully connected to n8n workflow engine",
        });
      } else {
        throw new Error('n8n service unavailable');
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to n8n. Please make sure it's running on localhost:5678",
        variant: "destructive",
      });
    }
  };

  const openN8n = () => {
    window.open('http://localhost:5678', '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Here's an overview of your workspace activity</p>
      </div>

      {/* n8n Status Card */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">n8n Workflow Engine</h3>
                <p className="text-sm text-muted-foreground">Ensure n8n is running on localhost:5678 to create and manage workflows</p>
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
    </div>
  );
};

export default Dashboard;
