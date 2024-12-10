import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { 
      label: 'Accueil', 
      path: '/', 
      icon: Home,
      visibleAlways: true 
    },
    { 
      label: 'Formations', 
      path: '/formations', 
      icon: GraduationCap,
      visibleAlways: true 
    },
    { 
      label: 'Mes Formations', 
      path: '/candidate-space', 
      icon: User,
      visibleWhen: 'candidate' 
    },
    { 
      label: 'Formations Encadrées', 
      path: '/trainer-space', 
      icon: User,
      visibleWhen: 'trainer' 
    },
    { 
      label: 'Se connecter', 
      path: '/login', 
      icon: LogIn,
      visibleWhen: 'guest' 
    },
    { 
      label: 'S\'inscrire', 
      path: '/signup', 
      icon: UserPlus,
      visibleWhen: 'guest' 
    },
    { 
      label: 'Déconnexion', 
      path: '/logout', 
      icon: LogIn,
      visibleWhen: 'authenticated' 
    }
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
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center space-x-2 hover:text-blue-200 transition-colors"
        >
          <GraduationCap size={30} />
          <span>ISET Rades</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {visibleLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className="flex items-center space-x-2 hover:text-blue-200 transition-colors group"
              >
                <link.icon 
                  size={18} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-700 z-50">
            <ul className="flex flex-col space-y-2 p-4">
              {visibleLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 py-2 hover:bg-blue-600 rounded px-2 transition-colors"
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