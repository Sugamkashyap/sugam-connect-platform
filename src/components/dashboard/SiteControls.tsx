
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Globe, Users, Shield } from 'lucide-react';

interface UserStats {
  online: number;
  total: number;
  newToday: number;
}

interface SiteStatus {
  isLive: boolean;
  lastDeployed: string;
  environment: 'production' | 'staging' | 'development';
}

const SiteControls: React.FC = () => {
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    online: 12,
    total: 142,
    newToday: 3
  });
  const [siteStatus, setSiteStatus] = useState<SiteStatus>({
    isLive: true,
    lastDeployed: "2025-05-05 09:30 AM",
    environment: 'production'
  });

  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setSiteStatus({
        ...siteStatus,
        lastDeployed: new Date().toLocaleString()
      });
      
      toast({
        title: "Deployment successful",
        description: "Your site has been successfully deployed to production.",
      });
    }, 3000);
  };

  const toggleSiteStatus = () => {
    setSiteStatus({
      ...siteStatus,
      isLive: !siteStatus.isLive
    });
    
    toast({
      title: siteStatus.isLive ? "Site is now offline" : "Site is now live",
      description: siteStatus.isLive 
        ? "Users cannot access the website."
        : "Your website is accessible to all users.",
    });
  };

  const refreshStats = () => {
    // Simulate refreshing user stats with random numbers
    setUserStats({
      online: Math.floor(Math.random() * 20 + 5),
      total: userStats.total + Math.floor(Math.random() * 3),
      newToday: Math.floor(Math.random() * 5)
    });
    
    toast({
      title: "Statistics updated",
      description: "User statistics have been refreshed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Site Deployment Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Site Deployment</span>
              <Badge variant={siteStatus.isLive ? "default" : "destructive"}>
                {siteStatus.isLive ? "Live" : "Offline"}
              </Badge>
            </CardTitle>
            <CardDescription>Control website availability and deployment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-muted-foreground">{siteStatus.environment}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Deployed</p>
                <p className="text-sm text-muted-foreground">{siteStatus.lastDeployed}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant={siteStatus.isLive ? "destructive" : "default"}
              onClick={toggleSiteStatus}
            >
              <Globe className="h-4 w-4 mr-2" />
              {siteStatus.isLive ? "Take Offline" : "Make Live"}
            </Button>
            <Button 
              onClick={handleDeploy} 
              disabled={isDeploying}
            >
              {isDeploying ? 
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Deploying...</> : 
                <><RefreshCw className="h-4 w-4 mr-2" /> Deploy Changes</>
              }
            </Button>
          </CardFooter>
        </Card>

        {/* User Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Monitor and manage website users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-2 bg-muted rounded-md">
                <Users className="h-5 w-5 mx-auto text-brand-blue mb-1" />
                <p className="text-2xl font-bold">{userStats.online}</p>
                <p className="text-xs text-muted-foreground">Online Now</p>
              </div>
              <div className="text-center p-2 bg-muted rounded-md">
                <Users className="h-5 w-5 mx-auto text-brand-blue mb-1" />
                <p className="text-2xl font-bold">{userStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
              <div className="text-center p-2 bg-muted rounded-md">
                <Users className="h-5 w-5 mx-auto text-brand-blue mb-1" />
                <p className="text-2xl font-bold">{userStats.newToday}</p>
                <p className="text-xs text-muted-foreground">New Today</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={refreshStats}>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Stats
            </Button>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" /> Manage Users
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SiteControls;
