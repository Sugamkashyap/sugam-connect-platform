
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

interface ServiceStatusProps {
  name: string;
  status: 'online' | 'offline' | 'checking';
  description: {
    online: string;
    offline: string;
  };
  onCheck: () => void;
  onAction: () => void;
  actionLabel: string;
}

const ServiceStatus: React.FC<ServiceStatusProps> = ({
  name,
  status,
  description,
  onCheck,
  onAction,
  actionLabel
}) => {
  return (
    <Card className={status === 'online' ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={status === 'online' ? "bg-green-100 p-3 rounded-full" : "bg-amber-100 p-3 rounded-full"}>
              {status === 'online' ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {status === 'online' ? description.online : description.offline}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCheck}>
              Check Status
            </Button>
            <Button onClick={onAction}>
              <ExternalLink className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatus;
