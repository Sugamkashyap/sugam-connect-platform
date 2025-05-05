
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Clock, MapPin, MoreHorizontal } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  client: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-1 ${
        appointment.status === 'completed' ? 'bg-green-500' :
        appointment.status === 'canceled' ? 'bg-red-500' :
        'bg-blue-500'
      }`} />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{appointment.title}</h3>
            <div className="space-y-2 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                {appointment.client}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {appointment.time} ({appointment.duration})
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {appointment.location}
              </div>
            </div>
            {appointment.notes && (
              <p className="mt-2 text-sm border-t pt-2">{appointment.notes}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant={appointment.status === 'completed' ? 'default' :
                     appointment.status === 'canceled' ? 'destructive' : 'outline'}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
