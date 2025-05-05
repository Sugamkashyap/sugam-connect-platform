
import React, { useState } from 'react';
import AppointmentsHeader from '@/components/appointments/AppointmentsHeader';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import AppointmentsList from '@/components/appointments/AppointmentsList';
import NewAppointmentDialog from '@/components/appointments/NewAppointmentDialog';

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

interface NewAppointmentFormData {
  title: string;
  client: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  notes: string;
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

  const handleAddAppointment = (newAppointment: NewAppointmentFormData) => {
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
      <AppointmentsHeader 
        onNewAppointmentClick={() => setShowNewAppointmentDialog(true)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <AppointmentCalendar 
          date={date}
          setDate={setDate}
          formatDate={formatDate}
          changeDate={changeDate}
        />

        {/* Appointments List */}
        <AppointmentsList 
          filteredAppointments={filteredAppointments}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>

      {/* New Appointment Dialog */}
      <NewAppointmentDialog
        open={showNewAppointmentDialog}
        onOpenChange={setShowNewAppointmentDialog}
        onAddAppointment={handleAddAppointment}
      />
    </div>
  );
};

export default Appointments;
