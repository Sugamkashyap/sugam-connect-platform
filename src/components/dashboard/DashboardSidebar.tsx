
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare,
  Settings,
  Database,
  Globe
} from 'lucide-react';

import { cn } from '@/lib/utils';

const DashboardSidebar: React.FC = () => {
  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Clients',
      href: '/dashboard/clients',
      icon: Users,
    },
    {
      title: 'Documents',
      href: '/dashboard/documents',
      icon: FileText,
    },
    {
      title: 'Appointments',
      href: '/dashboard/appointments',
      icon: Calendar,
    },
    {
      title: 'Messages',
      href: '/dashboard/messages',
      icon: MessageSquare,
    },
    {
      title: 'Workflows',
      href: '/dashboard/workflows',
      icon: Database,
    },
    {
      title: 'Site Management',
      href: '/dashboard/site-management',
      icon: Globe,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-heading font-semibold text-brand-dark">
            Sugam<span className="text-brand-blue">Connect</span>
          </span>
        </NavLink>
      </div>
      <div className="p-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                  isActive ? "bg-muted font-medium text-brand-blue" : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
