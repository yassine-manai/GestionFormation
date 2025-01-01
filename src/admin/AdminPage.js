import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('adminToken') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Admin Dashboard</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link to="/admin/candidates" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Candidats
                </Link>
                <Link to="/admin/sessions" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Sessions
                </Link>
                <Link to="/admin/formateurs" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Formateurs
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4">
                Connecté en tant que: {adminData.username} ({adminData.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Candidats</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez les candidats et leurs informations
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Sessions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez les sessions de formation
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Formateurs</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Gérez la liste des formateurs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;