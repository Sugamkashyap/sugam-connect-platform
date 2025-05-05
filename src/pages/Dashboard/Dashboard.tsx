
import React from 'react';
import { Activity, CreditCard, DollarSign, Users, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import WorkflowStats from '@/components/dashboard/WorkflowStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientTable from '@/components/dashboard/ClientTable';
import StatCard from '@/components/dashboard/StatCard';
import QuickAccessCard from '@/components/dashboard/QuickAccessCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  const quickActions = [
    {
      title: "Manage appointments",
      description: "View and organize your upcoming schedule",
      onClick: () => window.location.href = "/dashboard/appointments"
    },
    {
      title: "Client documents",
      description: "Access and manage client files and forms",
      onClick: () => window.location.href = "/dashboard/documents"
    },
    {
      title: "View messages",
      description: "Check your client communications",
      onClick: () => window.location.href = "/dashboard/messages"
    },
    {
      title: "Site Management",
      description: "Control site deployment and user access",
      onClick: () => window.location.href = "/dashboard/site-management"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">Here's an overview of your workspace activity</p>
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
          title="Website Users"
          value={142}
          change="+12 this week"
          icon={Globe}
        />
      </div>

      {/* Site Management Quick Access */}
      <Card className="border-2 border-brand-blue/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Site Management
          </CardTitle>
          <CardDescription>
            Manage your website deployment and monitor user activity
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to enable real-time user tracking and website deployment controls.
            </p>
          </div>
          <Link to="/dashboard/site-management">
            <Button>
              Manage Site
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Workflow Stats and Recent Activities */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <WorkflowStats />
        <RecentActivities />
      </div>

      {/* Client Table */}
      <div className="mt-6">
        <ClientTable />
      </div>

      {/* Quick Access */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <RecentActivities />
        </Card>
        <QuickAccessCard actions={quickActions} />
      </div>
    </div>
  );
};

export default Dashboard;
