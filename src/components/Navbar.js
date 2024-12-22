import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  User,
  LogIn,
  UserPlus,
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ isAuthenticated, role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: 'Accueil', path: '/', icon: Home, visibleAlways: true },
    { label: 'Formations', path: '/formations', icon: GraduationCap, visibleAlways: true },
    { label: 'Mes Formations', path: '/candidate-space', icon: User, visibleWhen: 'candidate' },
    { label: 'Formations Encadrées', path: '/trainer-space', icon: User, visibleWhen: 'trainer' },
    { label: 'Se connecter', path: '/login', icon: LogIn, visibleWhen: 'guest' },
    { label: "S'inscrire", path: '/signup', icon: UserPlus, visibleWhen: 'guest' },
    { label: 'Déconnexion', path: '/logout', icon: LogIn, visibleWhen: 'authenticated' }
  ];

  const getVisibleLinks = () => {
    return navLinks.filter(link => {
      if (link.visibleAlways) return true;
      if (!isAuthenticated && link.visibleWhen === 'guest') return true;
      if (isAuthenticated) {
        if (link.visibleWhen === 'authenticated') return true;
        if (link.visibleWhen === role) return true;
      }
      return false;
    });
  };

  const visibleLinks = getVisibleLinks();

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white text-blue-800 shadow-lg h-16'
        : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white h-20'
    }`}>
      <div className="container mx-auto h-full px-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
        >
          <GraduationCap size={32} className="transform hover:rotate-12 transition-transform" />
          <span className="font-sans tracking-tight">ISET Rades</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1">
          {visibleLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300
                  ${location.pathname === link.path 
                    ? isScrolled 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-white/10 text-white'
                    : 'hover:bg-white/10'
                  }
                `}
              >
                <link.icon
                  size={18}
                  className="transform group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <ul className={`flex flex-col bg-white shadow-lg rounded-b-lg overflow-hidden ${
            isScrolled ? 'text-blue-800' : 'text-gray-800'
          }`}>
            {visibleLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors
                    ${location.pathname === link.path ? 'bg-blue-50 text-blue-800' : ''}
                  `}
                >
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;