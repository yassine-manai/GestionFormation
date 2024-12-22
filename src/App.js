import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Formations from './pages/Formations';
import FormationDetail from './pages/FormationDetail';
import Admin from './admin/Admin';
import CandidateSpace from './pages/CandidateSpace';
import TrainerSpace from './pages/TrainerSpace';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Footer from './components/Footer';

// Routes where footer should be hidden
const ROUTES_WITHOUT_FOOTER = ['/login', '/signup', '/admin'];

// Wrapper component to handle footer visibility
const AppContent = ({ isAuthenticated, role }) => {
  const location = useLocation();
  const shouldShowFooter = !ROUTES_WITHOUT_FOOTER.includes(location.pathname);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} role={role} />
      <br />
      <div className={`min-h-screen ${shouldShowFooter ? 'pb-6' : ''}`}>
        <div className="container mx-auto p-6">
        <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formation/:id" element={<FormationDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/candidate-space" element={<CandidateSpace />} />
            <Route path="/trainer-space" element={<TrainerSpace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
};

const App = () => {
  const isAuthenticated = false;
  const role = 'candidate';

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} role={role} />
    </Router>
  );
};

export default App;