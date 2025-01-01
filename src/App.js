import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Formations from './pages/Formations';
import FormationDetail from './pages/FormationDetail';
import Admin from './admin/Admin';
import CandidateSpace from './candidat/CandidateSpace';
import TrainerSpace from './formateur/TrainerSpace';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Logout from './auth/Logout';
import ForgotPassword from './auth/ForgotPassword';

const ROUTES_WITHOUT_FOOTER = ['/login', '/signup', '/admin'];

// Protected Route component
const ProtectedRoute = ({ children, isAuthenticated, role, allowedRoles }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppContent = ({ isAuthenticated, role, handleLogout }) => {
  const location = useLocation();
  const shouldShowFooter = !ROUTES_WITHOUT_FOOTER.includes(location.pathname);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} role={role} onLogout={handleLogout} />
      <br />
      <div className={`min-h-screen ${shouldShowFooter ? 'pb-6' : ''}`}>
        <div className="container mx-auto p-6">
          <br />
          <Routes>
            <Route path="/admin-workspace" element={<Admin />} />
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formation/:id" element={<FormationDetail />} />
            <Route path="/logout" element={<Logout />} />

            <Route 
              path="/candidate" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} role={role} allowedRoles={['candidate']}>
                  <CandidateSpace onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/formateur" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} role={role} allowedRoles={['trainer']}>
                  <TrainerSpace onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to={role === 'trainer' ? '/formateur' : '/candidate'} replace /> : 
                <Login />
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to={role === 'trainer' ? '/formateur' : '/candidate'} replace /> : 
                <Signup />
              } 
            />

            <Route path="*" element={<NotFound />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} /> 

          </Routes>
        </div>
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing auth session
    const token = localStorage.getItem('userToken');
    const savedRole = localStorage.getItem('userRole');
    const savedUser = localStorage.getItem('userData');

    if (token && savedRole) {
      setIsAuthenticated(true);
      setRole(savedRole);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setRole(userData.role);
    setUser(userData);
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.reload(); 
  };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setRole(null);
      setUser(null);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      window.location.reload();
    };
    

  return (
    <Router>
      <AppContent 
        isAuthenticated={isAuthenticated} 
        role={role} 
        user={user}
        handleLogout={handleLogout}
      />
    </Router>
  );
};

export default App;