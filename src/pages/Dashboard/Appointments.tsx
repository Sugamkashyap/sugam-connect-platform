
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Clock, User, MapPin, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

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

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    client: 'John Doe',
    date: new Date(2025, 3, 8),
    time: '10:00 AM',
    duration: '1 hour',
    location: 'Office',
    status: 'scheduled',
    notes: 'First meeting to discuss project needs'
  },
  {
    id: '2',
    title: 'Follow-up Meeting',
    client: 'Jane Smith',
    date: new Date(2025, 3, 9),
    time: '2:00 PM',
    duration: '30 minutes',
    location: 'Video Call',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Document Review',
    client: 'Alex Johnson',
    date: new Date(2025, 3, 10),
    time: '11:30 AM',
    duration: '1 hour',
    location: 'Office',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Tax Planning Session',
    client: 'Sarah Wilson',
    date: new Date(2025, 3, 7),
    time: '3:00 PM',
    duration: '2 hours',
    location: 'Office',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Investment Review',
    client: 'Mike Brown',
    date: new Date(2025, 3, 6),
    time: '1:00 PM',
    duration: '1 hour',
    location: 'Phone Call',
    status: 'canceled'
  }
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showNewAppointmentDialog, setShowNewAppointmentDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    client: '',
    date: new Date(),
    time: '',
    duration: '1 hour',
    location: 'Office',
    notes: '',
  });

  // Filter appointments based on selected date and tab
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = date ? 
      appointment.date.toDateString() === date.toDateString() : 
      true;
    
    const matchesTab = 
      (selectedTab === 'upcoming' && appointment.status === 'scheduled') ||
      (selectedTab === 'completed' && appointment.status === 'completed') ||
      (selectedTab === 'canceled' && appointment.status === 'canceled') ||
      selectedTab === 'all';
    
    return matchesDate && matchesTab;
  });

  // Get dates with appointments for calendar highlighting
  const appointmentDates = appointments.map(app => app.date);

  const handleAddAppointment = () => {
    const appointment: Appointment = {
      id: (appointments.length + 1).toString(),
      title: newAppointment.title,
      client: newAppointment.client,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: newAppointment.duration,
      location: newAppointment.location,
      status: 'scheduled',
      notes: newAppointment.notes
    };
    
    setAppointments([...appointments, appointment]);
    setShowNewAppointmentDialog(false);
    setNewAppointment({
      title: '',
      client: '',
      date: new Date(),
      time: '',
      duration: '1 hour',
      location: 'Office',
      notes: '',
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const changeDate = (increment: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + increment);
      setDate(newDate);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">Manage your schedule and meetings</p>
        </div>
        <Button onClick={() => setShowNewAppointmentDialog(true)}>
          <CalendarPlus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 flex justify-center items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {date ? formatDate(date) : 'Select a date'}
              </span>
              <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
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
                  <Card key={appointment.id} className="overflow-hidden">
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* New Appointment Dialog */}
      <Dialog open={showNewAppointmentDialog} onOpenChange={setShowNewAppointmentDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={newAppointment.client}
                  onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  placeholder="e.g., 10:00 AM"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select 
                  value={newAppointment.duration}
                  onValueChange={(value) => setNewAppointment({...newAppointment, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Select 
                value={newAppointment.location}
                onValueChange={(value) => setNewAppointment({...newAppointment, location: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Video Call">Video Call</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="Client Location">Client Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                placeholder="Add any additional details"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAppointmentDialog(false)}>Cancel</Button>
            <Button onClick={handleAddAppointment}>Add Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
