import React, { createContext, useContext, useState, useEffect } from 'react';

interface Appointment {
  id: number;
  clientName: string;
  date: Date;
  duration: string;
  service: string;
  status: 'upcoming' | 'confirmed' | 'pending' | 'cancelled';
  location: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      clientName: 'John Doe',
      date: new Date('2024-02-20T10:00:00'),
      duration: '1 hour',
      service: 'Website Development Consultation',
      status: 'upcoming',
      location: 'Virtual Meeting'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      date: new Date('2024-02-21T14:00:00'),
      duration: '1 hour',
      service: 'Digital Marketing Strategy Session',
      status: 'confirmed',
      location: 'Virtual Meeting'
    },
    {
      id: 3,
      clientName: 'Mike Johnson',
      date: new Date('2024-02-22T11:00:00'),
      duration: '1 hour',
      service: 'Technical Support',
      status: 'pending',
      location: 'Virtual Meeting'
    }
  ]);

  const addAppointment = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
    setAppointments(prev => [
      ...prev,
      {
        ...newAppointment,
        id: Math.max(...prev.map(a => a.id)) + 1,
        status: 'pending'
      }
    ]);
  };

  const updateAppointment = (id: number, updatedAppointment: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? { ...appointment, ...updatedAppointment }
          : appointment
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};