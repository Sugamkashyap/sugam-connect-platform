import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Appointment Workflow Executed',
    description: 'Successfully processed new appointment request for Dr. Smith',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'error',
    title: 'Email Notification Failed',
    description: 'Failed to send reminder email due to invalid recipient address',
    timestamp: '15 minutes ago'
  },
  {
    id: '3',
    type: 'info',
    title: 'Workflow Updated',
    description: 'Patient onboarding workflow was modified by admin',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'success',
    title: 'Data Backup Completed',
    description: 'Automated daily backup workflow completed successfully',
    timestamp: '2 hours ago'
  },
  {
    id: '5',
    type: 'info',
    title: 'New Integration Added',
    description: 'Connected new payment gateway to billing workflow',
    timestamp: '3 hours ago'
  }
];

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'info':
      return <Activity className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

const RecentActivities: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <ActivityIcon type={activity.type} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;