import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Formations from './pages/Formations';
import FormationDetail from './pages/FormationDetail';
import Admin from './pages/Admin';
import CandidateSpace from './pages/CandidateSpace';
import TrainerSpace from './pages/TrainerSpace';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const isAuthenticated = false;  
  const role = 'candidate'; 

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} role={role} />
      <div className="container mx-auto p-6">
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
    </Router>
  );
};

export default App;
