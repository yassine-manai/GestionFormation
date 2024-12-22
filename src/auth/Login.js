import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  
  Mail, 
  Lock, 
  EyeOff, 
  Eye, 
  XCircle 
} from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }
  
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est requis';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // Login logic here
        console.log('Login Data:', formData);
        navigate('/');
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              Connexion
            </h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adresse email"
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none 
                      ${errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                      }`}
                  />
                  {errors.email && (
                    <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
  
              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none 
                      ${errors.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
  
              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
  
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                           hover:bg-blue-700 transition duration-300 transform 
                           hover:scale-[1.02] active:scale-100"
              >
                Se connecter
              </button>
            </form>
  
            {/* Signup Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Pas de compte ? {' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Login;
