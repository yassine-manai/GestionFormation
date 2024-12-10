import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  EyeOff, 
  Eye, 
  XCircle 
} from 'lucide-react';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 7) strength++;
    if (pass.match(/[a-z]+/)) strength++;
    if (pass.match(/[A-Z]+/)) strength++;
    if (pass.match(/[0-9]+/)) strength++;
    if (pass.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Faible', 'Moyen', 'Fort', 'Très Fort'];
  const strengthColors = [
    'bg-red-500', 
    'bg-yellow-500', 
    'bg-green-500', 
    'bg-green-700'
  ];

  return (
    <div className="mt-2">
      <div className="flex space-x-1 h-1">
        {[1, 2, 3, 4].map((level) => (
          <div 
            key={level} 
            className={`flex-1 ${
              strength >= level 
                ? strengthColors[level - 1] 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-xs mt-1 text-gray-600">
        Force du mot de passe : {strengthLabels[strength - 1] || 'Très Faible'}
      </p>
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
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

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Signup Data:', formData);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Créer un compte
          </h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Input */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none 
                    ${errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                    }`}
                />
                {errors.name && (
                  <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                )}
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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
              <PasswordStrengthIndicator password={formData.password} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-600 mb-2">Rôle</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="candidate">Candidat</option>
                <option value="trainer">Formateur</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
                         hover:bg-blue-700 transition duration-300 transform 
                         hover:scale-[1.02] active:scale-100"
            >
              S'inscrire
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Vous avez déjà un compte ? {' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
