import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, User, LogIn, UserPlus, Menu, X } from 'lucide-react';

const Navbar = ({ isAuthenticated, role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = [
    { label: 'Accueil', path: '/', icon: Home, alwaysVisible: true },
    { label: 'Formations', path: '/formations', icon: GraduationCap, alwaysVisible: true },
    { label: 'Mes Formations', path: '/candidate', icon: User, role: 'candidate' },
    { label: 'Formations Encadrées', path: '/formateur', icon: User, role: 'trainer' },
    { label: 'Se connecter', path: '/login', icon: LogIn, guestOnly: true },
    { label: "S'inscrire", path: '/signup', icon: UserPlus, guestOnly: true },
    { label: 'Déconnexion', path: '/logout', icon: LogIn, authenticatedOnly: true },
  ];

  const visibleLinks = navLinks.filter((link) => {
    if (link.alwaysVisible) return true;
    if (!isAuthenticated && link.guestOnly) return true;
    if (isAuthenticated) {
      if (link.authenticatedOnly) return true;
      if (link.role === role) return true;
    }
    return false;
  });

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white text-blue-800 shadow-lg h-16' : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white h-20'
      }`}
    >
      <div className="container mx-auto h-full px-4 flex justify-between items-center relative">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center space-x-3 hover:opacity-80 transition-transform"
          aria-label="ISET Rades Logo"
        >
          <GraduationCap size={32} />
          <span>ISET Rades</span>
        </Link>
        <ul className="hidden md:flex items-center space-x-1">
          {visibleLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  location.pathname === link.path
                    ? isScrolled
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-white/10 text-white'
                    : 'hover:bg-white/10'
                }`}
                onClick={toggleMenu}
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full transition-transform">
            <ul className="flex flex-col bg-white shadow-lg rounded-b-lg overflow-hidden text-gray-800">
              {visibleLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 ${
                      location.pathname === link.path ? 'bg-blue-50 text-blue-800' : ''
                    }`}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
