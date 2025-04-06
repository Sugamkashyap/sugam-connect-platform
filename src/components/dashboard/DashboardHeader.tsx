
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  user: {
    email: string;
    isAdmin: boolean;
  } | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <div className="hidden md:block">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="hidden text-sm md:inline-block">{user?.email}</span>
          <Button variant="outline" onClick={logout} className="text-sm">
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
