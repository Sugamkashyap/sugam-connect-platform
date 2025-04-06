
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Lightbulb, Heart, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    {
      name: "Sugam Kashyap",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "With over 10 years of experience in digital solutions for professionals, Sugam founded SugamConnect to bridge the gap between professional services and technology."
    },
    {
      name: "Priya Sharma",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "Priya leads our design team with her exceptional eye for aesthetics and user experience, creating beautiful yet functional interfaces for professional websites."
    },
    {
      name: "Rajiv Mehta",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "With a background in software architecture, Rajiv ensures all our technical solutions are robust, secure, and scalable for professional service providers."
    },
    {
      name: "Ananya Patel",
      role: "Client Success Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      bio: "Ananya works closely with our clients to ensure their expectations are not just met but exceeded, and their digital transformation is successful."
    }
  ];

  return (
    <>
      {/* About Hero */}
      <section className="bg-brand-light py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About SugamConnect</h1>
              <p className="text-xl text-gray-600 mb-6">
                We help professionals like doctors, advocates, and consultants establish a powerful online presence and streamline their client management.
              </p>
              <p className="text-gray-600 mb-8">
                Founded in 2018, SugamConnect has grown from a small web development agency to a comprehensive digital solutions provider focused exclusively on the needs of professional service providers. Our mission is to help professionals harness the power of technology to grow their practice and serve their clients better.
              </p>
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                <Link to="/contact">Get to Know Us</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 rounded-2xl flex items-center justify-center overflow-hidden p-6">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="SugamConnect Team"
                  className="rounded-xl shadow-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600">
              Our core principles guide everything we do to help professionals succeed online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mission */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex p-3 rounded-full bg-brand-light mb-4">
                <Target className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To empower professional service providers with digital tools that enhance their practice and client relationships.
              </p>
            </div>

            {/* Value 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex p-3 rounded-full bg-brand-light mb-4">
                <Lightbulb className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new technologies and approaches to provide cutting-edge solutions for our clients.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex p-3 rounded-full bg-brand-light mb-4">
                <Heart className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Client Focus</h3>
              <p className="text-gray-600">
                We put our clients' needs first, working closely with them to deliver solutions that truly address their challenges.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex p-3 rounded-full bg-brand-light mb-4">
                <Trophy className="text-brand-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] bg-white shadow-lg rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Our Journey"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SugamConnect was founded in 2018 by Sugam Kashyap, who recognized a significant gap in the market: professional service providers struggled to establish an effective online presence and efficiently manage client relationships.
                </p>
                <p>
                  Having worked with numerous doctors, lawyers, and consultants, Sugam understood their unique challenges. Many were using disjointed systems that created more problems than they solved, or they were relying on outdated methods that limited their growth.
                </p>
                <p>
                  What began as a small web development agency quickly evolved into a comprehensive digital solutions provider focused exclusively on professional service providers. Today, SugamConnect serves hundreds of professionals across India, helping them streamline their operations and grow their practices.
                </p>
                <p>
                  Our team has grown to include specialists in web development, UX design, client management systems, and digital marketing - all united by our passion for helping professionals succeed in the digital age.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              The passionate professionals behind SugamConnect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand-blue font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">
              What sets SugamConnect apart from other digital solution providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Industry Expertise</h3>
              <p className="text-gray-600">
                We exclusively serve professionals like doctors, advocates, and consultants, giving us deep insights into your specific needs and challenges.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                We don't just build websites; we create complete digital ecosystems that help you attract, engage, and serve your clients better.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Client Success Focus</h3>
              <p className="text-gray-600">
                Our job isn't done when we deliver your solution—we partner with you long-term to ensure you achieve tangible results and ROI.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Customized Approach</h3>
              <p className="text-gray-600">
                We recognize that each professional practice is unique—our solutions are tailored to your specific workflow and client base.
              </p>
            </div>

            {/* Reason 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Continuous Innovation</h3>
              <p className="text-gray-600">
                We constantly stay ahead of technological trends to ensure our clients benefit from the latest advancements in digital solutions.
              </p>
            </div>

            {/* Reason 6 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Results-Driven</h3>
              <p className="text-gray-600">
                Everything we do is focused on delivering measurable improvements in your practice's efficiency, client acquisition, and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-brand-dark text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl mb-8">
              Let's discuss how we can help your professional practice thrive in the digital world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
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

export default About;
