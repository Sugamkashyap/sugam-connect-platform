import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create appointment object
      const appointmentData = {
        clientName: formData.name,
        date: new Date(`${format(date, 'yyyy-MM-dd')}T${timeSlot.replace(/\s[AaPp][Mm]/, '')}`),
        duration: '1 hour',
        service: formData.service,
        location: 'Virtual Meeting'
      };
      
      console.log('Appointment scheduled:', appointmentData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Appointment scheduled!",
        description: `Your appointment has been scheduled for ${format(date, 'MMMM d, yyyy')} at ${timeSlot}.`,
      });
    }, 1500);
  };

  return (
    <>
      {/* Appointment Hero */}
      <section className="bg-brand-light py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Schedule a Consultation</h1>
            <p className="text-xl text-gray-600">
              Book a free consultation with our experts to discuss your professional digital needs
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Appointment Scheduled Successfully!</h2>
                <p className="text-gray-600 text-lg mb-2">
                  Thank you for booking a consultation with us.
                </p>
                <p className="text-gray-600 mb-6">
                  We've scheduled your appointment for <span className="font-semibold">{date && format(date, 'MMMM d, yyyy')}</span> at <span className="font-semibold">{timeSlot}</span>. You'll receive a confirmation email shortly with additional details.
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
                  <Button onClick={() => setIsSubmitted(false)} className="bg-brand-blue hover:bg-brand-blue/90">
                    Schedule Another Appointment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-8">Book Your Consultation</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date and Time Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Date <span className="text-red-500">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-50" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                              date > addDays(new Date(), 30) // Only allow booking 30 days ahead
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {/* Time Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Time <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={timeSlot === slot ? "default" : "outline"}
                            className={cn(
                              "text-sm py-1.5",
                              timeSlot === slot ? "bg-brand-blue hover:bg-brand-blue/90" : "hover:bg-gray-100"
                            )}
                            onClick={() => setTimeSlot(slot)}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Service */}
                      <div className="space-y-2">
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                          Service of Interest <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 mt-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        placeholder="Please share any specific questions or information that will help us prepare for the consultation."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-brand-blue hover:bg-brand-blue/90" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-light text-brand-blue font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Initial Consultation</h3>
                <p className="text-gray-600">
                  We'll discuss your business, current challenges, goals, and specific needs to understand your situation fully.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-light text-brand-blue font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Solution Exploration</h3>
                <p className="text-gray-600">
                  Our team will present tailored recommendations and demonstrate relevant solutions that address your specific needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-light text-brand-blue font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Strategic Roadmap</h3>
                <p className="text-gray-600">
                  You'll receive a clear implementation plan with timelines, costs, and expected outcomes to help you make informed decisions.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
              <h3 className="text-xl font-semibold mb-4">Consultation FAQs</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How long is the consultation?</h4>
                  <p className="text-gray-600">Initial consultations typically last 30-45 minutes, depending on your needs and questions.</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Is there any obligation after the consultation?</h4>
                  <p className="text-gray-600">No, the consultation is completely free with no obligation. We aim to provide value and help you make informed decisions.</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Can I reschedule my appointment?</h4>
                  <p className="text-gray-600">Yes, you can reschedule up to 24 hours before your appointment by calling us or responding to your confirmation email.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentPage;
