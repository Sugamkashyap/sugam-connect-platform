
import React from 'react';

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
