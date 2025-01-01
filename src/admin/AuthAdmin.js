import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminUsers } from './Admin';

const AuthAdmin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const user = adminUsers.find(
      user => user.username === credentials.username && 
      user.password === credentials.password
    );

    if (user) {
      localStorage.setItem('adminToken', JSON.stringify({
        token: 'fake-jwt-token-' + Date.now(),
        role: user.role,
        username: user.username
      }));
      navigate('/admin/dashboard');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion Admin</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthAdmin;