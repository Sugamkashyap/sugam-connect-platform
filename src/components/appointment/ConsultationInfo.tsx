
import React from 'react';

const ConsultationInfo: React.FC = () => {
  return (
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
  );
};

export default ConsultationInfo;
