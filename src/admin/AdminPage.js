import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import TrainersList from './TrainersList';
import CandidatesManagement from './CandidatesManagement';
import CoursesManagement from './CoursesManagement';
import SessionsManagement from './SessionsManagement';

const AdminPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/trainers"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Liste des formateurs
              </Link>
            </li>
            <li>
              <Link
                to="/admin/candidates"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Gestion des candidats
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Gestion des cours
              </Link>
            </li>
            <li>
              <Link
                to="/admin/sessions"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Gestion des sessions
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 hover:bg-red-600"
        >
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="trainers" element={<TrainersList />} />
          <Route path="candidates" element={<CandidatesManagement />} />
          <Route path="courses" element={<CoursesManagement />} />
          <Route path="sessions" element={<SessionsManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
