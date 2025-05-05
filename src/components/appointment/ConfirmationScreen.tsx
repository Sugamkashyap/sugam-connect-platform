
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationScreenProps {
  date?: Date;
  timeSlot: string;
  onScheduleAnother: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  date,
  timeSlot,
  onScheduleAnother
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-4">Appointment Scheduled Successfully!</h2>
      <p className="text-gray-600 text-lg mb-2">
        Thank you for booking a consultation with us.
      </p>
      <p className="text-gray-600 mb-6">
        We've scheduled your appointment for 
        <span className="font-semibold"> {date && format(date, 'MMMM d, yyyy')}</span> at 
        <span className="font-semibold"> {timeSlot}</span>. 
        You'll receive a confirmation email shortly with additional details.
      </p>
      <div className="space-y-4">
        <p className="text-gray-600">
          If you need to reschedule or have any questions, please contact us at:
        </p>
        <div className="flex justify-center space-x-6">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-brand-blue">appointments@sugamconnect.com</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-brand-blue">+91 1234 567 890</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={onScheduleAnother} className="bg-brand-blue hover:bg-brand-blue/90">
          Schedule Another Appointment
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
