import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Compass } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Destinations", href: "#destinations" },
    { name: "Packages", href: "#packages" },
    { name: "About Us", href: "#about" },
    { name: "Offers", href: "#offers" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
          <div className="bg-brand-orange p-2 rounded-xl text-white shadow-md transform group-hover:rotate-12 transition-transform duration-300">
            <Compass size={28} fill="none" strokeWidth={2.5} />
          </div>
          <span className={`text-2xl font-extrabold tracking-tight ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
            Explore<span className="text-brand-orange">Vista</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-semibold hover:text-brand-orange transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-orange hover:bg-orange-600 text-white px-7 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-brand-orange cursor-pointer p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? '#003049' : '#fff'} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl p-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 border-t border-gray-100">
           {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-700 text-lg font-bold hover:text-brand-teal transition-colors border-b border-gray-50 pb-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-orange text-white px-6 py-4 rounded-xl font-extrabold w-full shadow-lg">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;