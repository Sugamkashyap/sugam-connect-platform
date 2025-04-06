
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
