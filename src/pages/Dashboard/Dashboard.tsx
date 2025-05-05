
import React from 'react';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WorkflowStats from '@/components/dashboard/WorkflowStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import ClientTable from '@/components/dashboard/ClientTable';
import StatCard from '@/components/dashboard/StatCard';
import QuickAccessCard from '@/components/dashboard/QuickAccessCard';
import { Card } from '@/components/ui/card'; // Add missing import

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
        {/* Recent Activity */}
        <Card className="col-span-4">
          <RecentActivities />
        </Card>

        {/* Quick Access */}
        <QuickAccessCard actions={quickActions} />
      </div>
    </div>
  );
};

export default Dashboard;
