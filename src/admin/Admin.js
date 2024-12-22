import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthAdmin from './AuthAdmin';
import AdminPage from './AdminPage';

const isAuthenticated = () => {
  const adminToken = localStorage.getItem('adminToken');
  return Boolean(adminToken);
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
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
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;
