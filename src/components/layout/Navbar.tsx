
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="flex items-center">
          <span className="text-xl font-heading font-semibold text-brand-dark">Sugam<span className="text-brand-blue">Connect</span></span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? "text-brand-blue font-medium" 
                : "text-gray-700 hover:text-brand-blue transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            className={({isActive}) => 
              isActive 
                ? "text-brand-blue font-medium" 
                : "text-gray-700 hover:text-brand-blue transition-colors"
            }
          >
            Services
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              isActive 
                ? "text-brand-blue font-medium" 
                : "text-gray-700 hover:text-brand-blue transition-colors"
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({isActive}) => 
              isActive 
                ? "text-brand-blue font-medium" 
                : "text-gray-700 hover:text-brand-blue transition-colors"
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              isActive 
                ? "text-brand-blue font-medium" 
                : "text-gray-700 hover:text-brand-blue transition-colors"
            }
          >
            Contact
          </NavLink>

          <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
            <NavLink to="/appointment">Book Appointment</NavLink>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container py-4 flex flex-col space-y-3">
            <NavLink 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? "text-brand-blue font-medium py-2" 
                  : "text-gray-700 hover:text-brand-blue transition-colors py-2"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? "text-brand-blue font-medium py-2" 
                  : "text-gray-700 hover:text-brand-blue transition-colors py-2"
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? "text-brand-blue font-medium py-2" 
                  : "text-gray-700 hover:text-brand-blue transition-colors py-2"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? "text-brand-blue font-medium py-2" 
                  : "text-gray-700 hover:text-brand-blue transition-colors py-2"
              }
            >
              Blog
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? "text-brand-blue font-medium py-2" 
                  : "text-gray-700 hover:text-brand-blue transition-colors py-2"
              }
            >
              Contact
            </NavLink>
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90 w-full mt-2">
              <NavLink to="/appointment" onClick={() => setIsMenuOpen(false)}>
                Book Appointment
              </NavLink>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
