
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light via-white to-white py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-up">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark leading-tight">
                <span className="text-brand-blue">Digital Solutions</span> for Professional Service Providers
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Helping doctors, advocates, and professionals automate client management and establish an impactful online presence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link to="/services">Our Services</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 rounded-2xl flex items-center justify-center overflow-hidden p-6">
                <img 
                  src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Professional website design"
                  className="rounded-xl shadow-lg object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-xl p-4 md:p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <span className="font-medium text-brand-dark">Trusted by 100+ professionals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-gray-600">
              We provide comprehensive digital solutions tailored for professional service providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <div className="bg-brand-light inline-flex p-3 rounded-lg mb-4">
                <BarChart3 className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Websites</h3>
              <p className="text-gray-600 mb-4">
                Custom website design and development tailored for professional service providers.
              </p>
              <Link to="/services" className="inline-flex items-center text-brand-blue font-medium hover:underline">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <div className="bg-brand-light inline-flex p-3 rounded-lg mb-4">
                <Users className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Client Management</h3>
              <p className="text-gray-600 mb-4">
                Streamline your client interactions with our automated management systems.
              </p>
              <Link to="/services" className="inline-flex items-center text-brand-blue font-medium hover:underline">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <div className="bg-brand-light inline-flex p-3 rounded-lg mb-4">
                <Calendar className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Appointment Booking</h3>
              <p className="text-gray-600 mb-4">
                Effortless appointment scheduling system to manage your client meetings.
              </p>
              <Link to="/services" className="inline-flex items-center text-brand-blue font-medium hover:underline">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-brand-dark text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Professional Practice?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Book a free consultation today and learn how we can help you grow your practice and manage clients more efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                <Link to="/appointment">Schedule a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">
              Hear from professionals who've transformed their practice with our solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6">
                "SugamConnect transformed my medical practice with their client management system. My appointments are now streamlined and I've seen a significant increase in new patient inquiries."
              </blockquote>
              <div>
                <p className="font-semibold">Dr. Amit Sharma</p>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6">
                "As a busy advocate, I needed a solution that would help me manage client appointments and documents. SugamConnect delivered exactly what I needed and more."
              </blockquote>
              <div>
                <p className="font-semibold">Priya Mehta</p>
                <p className="text-sm text-gray-500">Corporate Lawyer</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6">
                "The website SugamConnect built for my dental practice has completely changed how new patients find us. The online booking feature saves my staff hours each week."
              </blockquote>
              <div>
                <p className="font-semibold">Dr. Rajiv Patel</p>
                <p className="text-sm text-gray-500">Dentist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
