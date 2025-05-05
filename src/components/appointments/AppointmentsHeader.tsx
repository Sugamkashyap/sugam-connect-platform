
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

interface AppointmentsHeaderProps {
  onNewAppointmentClick: () => void;
}

const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({
  onNewAppointmentClick
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground">Manage your schedule and meetings</p>
      </div>
      <Button onClick={onNewAppointmentClick}>
        <CalendarPlus className="h-4 w-4 mr-2" />
        New Appointment
      </Button>
    </div>
  );
};

export default AppointmentsHeader;
