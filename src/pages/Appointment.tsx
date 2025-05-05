
import React, { useState } from 'react';
import HeroSection from '@/components/appointment/HeroSection';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import ConfirmationScreen from '@/components/appointment/ConfirmationScreen';
import ConsultationInfo from '@/components/appointment/ConsultationInfo';

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Available services
  const services = [
    'Website Development Consultation',
    'Client Management System Demo',
    'Appointment Booking System Setup',
    'Digital Marketing Strategy Session',
    'Technical Support',
    'General Inquiry',
    'Other'
  ];

  const handleAppointmentScheduled = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Appointment Hero */}
      <HeroSection />

      {/* Appointment Booking Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <ConfirmationScreen
                date={date}
                timeSlot={timeSlot}
                onScheduleAnother={() => setIsSubmitted(false)}
              />
            ) : (
              <AppointmentForm
                onAppointmentScheduled={handleAppointmentScheduled}
                services={services}
                timeSlots={timeSlots}
              />
            )}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <ConsultationInfo />
        </div>
      </section>
    </>
  );
};

export default AppointmentPage;
