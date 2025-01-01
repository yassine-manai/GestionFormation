import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthAdmin from './AuthAdmin';
import AdminDashboard from './AdminPage';
import CandidatesManagement from './CandidatesManagement';
import SessionsManagement from './SessionsManagement';
import TrainersList from './TrainersList';

// Fake admin users data
export const adminUsers = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'super_admin'
  },
  {
    username: 'manager',
    password: 'manager123',
    role: 'manager'
  }
];

const isAuthenticated = () => {
  const adminToken = localStorage.getItem('adminToken');
  return Boolean(adminToken);
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

const AdminRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AuthAdmin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="candidates" element={<CandidatesManagement />} />
                <Route path="sessions" element={<SessionsManagement />} />
                <Route path="trainers" element={<TrainersList />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;