
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Sugam<span className="text-brand-blue">Connect</span></h2>
            <p className="text-gray-300">
              Helping professionals automate client management and establish a powerful online presence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-blue transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-brand-blue transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-blue transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Client Management</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Appointment Scheduling</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Online Marketing</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-blue transition-colors">Content Creation</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-medium">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="shrink-0 mt-1 text-brand-blue" size={18} />
                <span className="text-gray-300">123 Professional Avenue, Business District, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-blue" size={18} />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-brand-blue transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-blue" size={18} />
                <a href="mailto:info@sugamconnect.com" className="text-gray-300 hover:text-brand-blue transition-colors">info@sugamconnect.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SugamConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
