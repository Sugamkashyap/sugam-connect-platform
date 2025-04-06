
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Globe, Users, Calendar, BarChart3, MessageSquare, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: <Globe className="text-brand-blue" size={36} />,
      title: "Professional Website Development",
      description: "Custom-designed websites for professionals that showcase your services, expertise, and unique value proposition to potential clients.",
      features: [
        "Mobile-responsive design",
        "Search engine optimization",
        "Content management system",
        "Analytics integration",
        "Fast loading speed"
      ]
    },
    {
      icon: <Users className="text-brand-blue" size={36} />,
      title: "Client Management System",
      description: "Streamline your client interactions with our automated management systems that handle everything from onboarding to service delivery.",
      features: [
        "Client database and CRM",
        "Document management",
        "Task automation",
        "Client portal access",
        "Progress tracking"
      ]
    },
    {
      icon: <Calendar className="text-brand-blue" size={36} />,
      title: "Appointment Booking System",
      description: "Allow clients to book appointments directly through your website, reducing administrative burden and improving client satisfaction.",
      features: [
        "24/7 online booking",
        "Automated confirmations and reminders",
        "Calendar integrations",
        "Buffer time management",
        "Custom availability settings"
      ]
    },
    {
      icon: <MessageSquare className="text-brand-blue" size={36} />,
      title: "Client Communication Tools",
      description: "Enhance client engagement with integrated communication tools that keep your clients informed and connected.",
      features: [
        "Secure messaging system",
        "Email marketing integration",
        "Automated follow-ups",
        "Feedback collection",
        "Multi-channel communication"
      ]
    },
    {
      icon: <BarChart3 className="text-brand-blue" size={36} />,
      title: "Online Marketing Solutions",
      description: "Attract more clients with targeted online marketing strategies designed specifically for professional service providers.",
      features: [
        "Search engine optimization",
        "Social media management",
        "Content marketing",
        "Email campaigns",
        "Performance analytics"
      ]
    },
    {
      icon: <PenTool className="text-brand-blue" size={36} />,
      title: "Content Creation Services",
      description: "Professional content creation services to engage your audience and establish your authority in your field.",
      features: [
        "Blog writing",
        "Case studies",
        "Social media content",
        "Email newsletters",
        "Whitepapers and guides"
      ]
    },
  ];

  return (
    <>
      {/* Services Hero */}
      <section className="bg-brand-light py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Professional Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive digital solutions designed specifically for doctors, advocates, and other professionals.
            </p>
            <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
              <Link to="/contact">Request a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600">
              We follow a structured approach to deliver solutions that meet your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connection between steps for desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-brand-blue/30" style={{ width: '75%', margin: '0 auto' }}></div>
            
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mx-auto z-10 relative border-4 border-brand-light">
                <span className="text-xl font-bold text-brand-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Consultation</h3>
              <p className="text-gray-600">
                We start with a thorough understanding of your practice and needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mx-auto z-10 relative border-4 border-brand-light">
                <span className="text-xl font-bold text-brand-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Strategy</h3>
              <p className="text-gray-600">
                We develop a tailored strategy to address your specific challenges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mx-auto z-10 relative border-4 border-brand-light">
                <span className="text-xl font-bold text-brand-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Implementation</h3>
              <p className="text-gray-600">
                We build and deploy your custom solution with minimal disruption.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mx-auto z-10 relative border-4 border-brand-light">
                <span className="text-xl font-bold text-brand-blue">4</span>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Support</h3>
              <p className="text-gray-600">
                We provide ongoing support and optimization to ensure success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-gray-600">
              Flexible packages designed to meet the needs of different professional practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for individual professionals</p>
                <div className="text-3xl font-bold mb-6">₹25,000<span className="text-lg text-gray-500 font-normal">/one-time</span></div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Professional website (5 pages)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Basic appointment booking</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Contact form integration</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Mobile responsive design</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">3 months support</span>
                  </div>
                </div>

                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-brand-blue rounded-xl overflow-hidden shadow-md relative">
              <div className="bg-brand-blue text-white text-center py-2 text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <p className="text-gray-600 mb-6">For growing practices</p>
                <div className="text-3xl font-bold mb-6">₹50,000<span className="text-lg text-gray-500 font-normal">/one-time</span></div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Professional website (10 pages)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Advanced appointment system</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Client management system</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Blog/content management</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">6 months support</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">SEO optimization</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For established practices</p>
                <div className="text-3xl font-bold mb-6">Custom<span className="text-lg text-gray-500 font-normal"> pricing</span></div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Custom website development</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Full practice management system</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Custom client portal</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Marketing automation</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">12 months priority support</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                    <span className="ml-2 text-gray-600">Analytics and reporting</span>
                  </div>
                </div>

                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about our services
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How long does it take to develop a professional website?</h3>
                <p className="text-gray-600">
                  Typically, our standard professional websites take 4-6 weeks from initial consultation to launch. More complex projects with custom features may take 8-12 weeks. We provide a detailed timeline during our consultation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Can I update my website content myself?</h3>
                <p className="text-gray-600">
                  Yes, all our websites come with a user-friendly content management system that allows you to make regular updates to text, images, and other content without technical knowledge.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Do you provide ongoing support after the website launch?</h3>
                <p className="text-gray-600">
                  Yes, we offer various support packages depending on your needs. Our standard packages include 3-12 months of support, with options to extend. We also offer maintenance contracts for ongoing updates and security.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How does the appointment booking system work?</h3>
                <p className="text-gray-600">
                  Our appointment booking system integrates directly with your website and calendar. Clients can see your availability in real-time, book appointments, and receive automatic confirmations. You'll get notifications and can manage everything from a simple dashboard.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Do you offer custom solutions for specific industries?</h3>
                <p className="text-gray-600">
                  Absolutely! We specialize in creating solutions for specific professional sectors including healthcare, legal, accounting, and consulting. Our systems are customized to meet regulatory requirements and industry-specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-brand-blue text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your professional practice?</h2>
            <p className="text-xl mb-8">
              Get in touch today to discuss how we can help you establish an effective online presence and streamline your client management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/appointment">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
