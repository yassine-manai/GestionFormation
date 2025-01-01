import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Trigger logout callback if provided
    if (onLogout) {
      onLogout();
    }

    const timeout = setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, onLogout]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center mt-16">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <h1 className="text-2xl font-bold text-gray-800">Déconnexion...</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Vous êtes en train de vous déconnecter. Merci de patienter.
        </p>
      </div>
    </div>
  );
};

export default Logout;
