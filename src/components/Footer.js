import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-6 space-x-4">
            <div className="flex items-center space-x-2">
              <GraduationCap size={24} />
              <h3 className="text-xl font-bold">ISET Rades</h3>
            </div>
            <p className="text-gray-400">
              Institut Supérieur des Études Technologiques de Radès, 
              votre partenaire pour une formation d'excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/formations" className="text-gray-400 hover:text-white transition-colors">
                  Nos Formations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={18} />
                <span>Avenue de France, Radès , 2040 Tunis Tunisie</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <span>+216 71 460 100</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <span>isetr@isetr.rnu.tn</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} ISET Rades - Yassine MANAI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;