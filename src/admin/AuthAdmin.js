import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthAdmin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === adminCredentials.username &&
      credentials.password === adminCredentials.password
    ) {
      localStorage.setItem('adminToken', 'your-secure-token');
      navigate('/admin/dashboard');
    } else {
      setError('Nom d’utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion Admin</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nom d’utilisateur"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthAdmin;
