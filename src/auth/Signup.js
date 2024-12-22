import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, EyeOff, Eye,
  Phone, MapPin, Building, Briefcase, Calendar,
  ChevronRight, ChevronLeft, Check
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Compte' },
  { id: 2, title: 'Personnel' },
  { id: 3, title: 'Professionnel' },
  { id: 4, title: 'Validation' }
];

const PasswordStrengthIndicator = ({ password }) => {
  // ... (keeping your existing PasswordStrengthIndicator component)
};

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {steps.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
            ${currentStep >= step.id 
              ? 'border-blue-600 bg-blue-600 text-white' 
              : 'border-gray-300 text-gray-400'}`}
          >
            {currentStep > step.id ? (
              <Check size={20} />
            ) : (
              step.id
            )}
          </div>
          <span className={`text-xs mt-2 ${
            currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
          }`}>
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className={`w-20 h-0.5 mx-2 ${
            currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account Info
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate',
    
    // Personal Info
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    
    // Professional Info
    company: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    interests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.email) newErrors.email = "L'email est requis";
      if (!formData.password) newErrors.password = "Le mot de passe est requis";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }
    
    if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
      if (!formData.lastName) newErrors.lastName = "Le nom est requis";
      if (!formData.phone) newErrors.phone = "Le téléphone est requis";
    }
    
    if (currentStep === 3) {
      if (!formData.education) newErrors.education = "L'éducation est requise";
      if (!formData.experience) newErrors.experience = "L'expérience est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Form submitted:', formData);
      navigate('/login');
    }
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/* Email Input */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Adresse email"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              
              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Role Selection */}
              <div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="candidate">Candidat</option>
                  <option value="trainer">Formateur</option>
                </select>
              </div>
            </div>
          </>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Adresse"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Entreprise actuelle"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Poste actuel"
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Expérience professionnelle"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
              />
            </div>
            
            <div>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Formation et diplômes"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24"
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Vérifiez vos informations</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Nom complet:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Téléphone:</strong> {formData.phone}</p>
              <p><strong>Rôle:</strong> {formData.role === 'candidate' ? 'Candidat' : 'Formateur'}</p>
              <p><strong>Entreprise:</strong> {formData.company}</p>
              <p><strong>Poste:</strong> {formData.position}</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8">
        <StepIndicator currentStep={currentStep} />
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {steps[currentStep - 1].title}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderFormFields()}
          
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={20} className="mr-2" />
                Précédent
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg ml-auto hover:bg-blue-700"
              >
                Suivant
                <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg ml-auto hover:bg-green-700"
              >
                Confirmer l'inscription
                <Check size={20} className="ml-2" />
              </button>
            )}
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Vous avez déjà un compte ? {' '}
            <Link to="/login" className="text-blue-600 hover:underline font-bold">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;