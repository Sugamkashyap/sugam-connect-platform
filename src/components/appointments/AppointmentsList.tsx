
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

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

interface AppointmentsListProps {
  filteredAppointments: Appointment[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  filteredAppointments,
  selectedTab,
  setSelectedTab
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Appointments</CardTitle>
          <Tabs defaultValue="upcoming" className="w-[400px]" onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No appointments found</h3>
            <p className="text-muted-foreground">
              {selectedTab === 'upcoming' 
                ? "No upcoming appointments for the selected date." 
                : selectedTab === 'completed' 
                  ? "No completed appointments for the selected date." 
                  : selectedTab === 'canceled' 
                    ? "No canceled appointments for the selected date."
                    : "No appointments found for the selected date."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
