import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    localStorage.removeItem('userToken'); // Remove authentication token
    sessionStorage.clear(); // Clear any session data

    // Redirect to the login page after a short delay
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 1000);

    return () => clearTimeout(timeout); 
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Déconnexion...</h1>
        <p className="text-gray-600 mt-2">Vous êtes en train de vous déconnecter. Merci de patienter.</p>
      </div>
    </div>
  );
};

export default Logout;
