import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, Lock, EyeOff, Eye,
  Phone, MapPin, Building, Briefcase, Calendar,
  ChevronRight, ChevronLeft, Check, GraduationCap,
  FileText, Clock, Award
} from 'lucide-react'; 

const steps = {
  candidate: [
    { id: 1, title: 'Compte' },
    { id: 2, title: 'Personnel' },
    { id: 3, title: 'Professionnel' },
    { id: 4, title: 'Validation' }
  ],
  trainer: [
    { id: 1, title: 'Compte' },
    { id: 2, title: 'Personnel' },
    { id: 3, title: 'Expertise' },
    { id: 4, title: 'Validation' }
  ]
};

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`flex-1 rounded-full ${index <= strength ? 'bg-blue-600' : 'bg-gray-200'
              }`}
          />
        ))}
      </div>
      <p className="text-xs mt-1 text-gray-500">
        {strength === 0 && 'Très faible'}
        {strength === 1 && 'Faible'}
        {strength === 2 && 'Moyen'}
        {strength === 3 && 'Fort'}
        {strength === 4 && 'Très fort'}
        {strength === 5 && 'Excellent'}
      </p>
    </div>
  );
};

const StepIndicator = ({ currentStep, steps }) => (
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
          <span className={`text-xs mt-2 ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
            }`}>
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className={`w-20 h-0.5 mx-2 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const FormField = ({ icon: Icon, error, ...props }) => (
  <div className="space-y-1">
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        {...props}
        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    // Candidate specific fields
    company: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    interests: '',
    // Trainer specific fields
    expertise: '',
    certifications: '',
    teachingExperience: '',
    availability: '',
    preferredSubjects: '',
    methodology: '',
    ratePerHour: ''
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const isTrainer = formData.role === 'trainer';

    if (currentStep === 1) {
      if (!formData.email) {
        newErrors.email = "L'email est requis";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }

      if (!formData.password) {
        newErrors.password = "Le mot de passe est requis";
      } else if (formData.password.length < 8) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
      if (!formData.lastName) newErrors.lastName = "Le nom est requis";
      if (!formData.phone) {
        newErrors.phone = "Le téléphone est requis";
      } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
        newErrors.phone = "Format de téléphone invalide";
      }
    }

    if (currentStep === 3) {
      if (isTrainer) {
        if (!formData.expertise) newErrors.expertise = "Le domaine d'expertise est requis";
        if (!formData.teachingExperience) newErrors.teachingExperience = "L'expérience en formation est requise";
        if (!formData.availability) newErrors.availability = "Les disponibilités sont requises";
        if (!formData.ratePerHour) newErrors.ratePerHour = "Le tarif horaire est requis";
      } else {
        if (!formData.education) newErrors.education = "L'éducation est requise";
        if (!formData.experience) newErrors.experience = "L'expérience est requise";
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        // Here you would typically make an API call to register the user
        console.log('Form submitted:', formData);
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors(prev => ({
          ...prev,
          submit: "Une erreur est survenue lors de l'inscription"
        }));
      }
    }
  };

  const renderFormFields = () => {
    const isTrainer = formData.role === 'trainer';

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              icon={Mail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse email"
              error={errors.email}
            />

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500 
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <PasswordStrengthIndicator password={formData.password} />


            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                error={errors.confirmPassword}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500 
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-gray-300"
              >
                <option value="candidate">Candidat</option>
                <option value="trainer">Formateur</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                icon={User}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Prénom"
                error={errors.firstName}
              />
              <FormField
                icon={User}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Nom"
                error={errors.lastName}
              />
            </div>

            <FormField
              icon={Phone}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              error={errors.phone}
            />

            <FormField
              icon={Calendar}
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
            />

            <FormField
              icon={MapPin}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse"
              error={errors.address}
            />
          </div>
        );

      case 3:
        return isTrainer ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <textarea
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Domaines d'expertise"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24 
                  ${errors.expertise ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.expertise && <p className="text-red-500 text-sm">{errors.expertise}</p>}
            </div>

            <FormField
              icon={Award}
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="Certifications et accréditations"
              error={errors.certifications}
            />

            <div className="space-y-1">
              <textarea
                name="teachingExperience"
                value={formData.teachingExperience}
                onChange={handleChange}
                placeholder="Expérience en formation"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24 
                  ${errors.teachingExperience ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.teachingExperience && <p className="text-red-500 text-sm">{errors.teachingExperience}</p>}
            </div>

            <FormField
              icon={Clock}
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Disponibilités"
              error={errors.availability}
            />

            <FormField
              icon={FileText}
              type="text"
              name="preferredSubjects"
              value={formData.preferredSubjects}
              onChange={handleChange}
              placeholder="Matières préférées"
              error={errors.preferredSubjects}
            />

            <FormField
              icon={GraduationCap}
              type="text"
              name="methodology"
              value={formData.methodology}
              onChange={handleChange}
              placeholder="Méthodologie d'enseignement"
              error={errors.methodology}
            />

            <FormField
              icon={Briefcase}
              type="number"
              name="ratePerHour"
              value={formData.ratePerHour}
              onChange={handleChange}
              placeholder="Tarif horaire"
              error={errors.ratePerHour}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <FormField
              icon={Building}
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Entreprise actuelle"
              error={errors.company}
            />

            <FormField
              icon={Briefcase}
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Poste actuel"
              error={errors.position}
            />

            <div className="space-y-1">
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Expérience professionnelle"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24 
                    ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>

            <div className="space-y-1">
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Formation et diplômes"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24 
                    ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
            </div>

            <div className="space-y-1">
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Compétences"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 h-24 
                    ${errors.skills ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
            </div>
          </div>
        );

        case 4:
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-lg divide-y divide-gray-200">
                {/* Account Section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations du compte</h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Type de compte</dt>
                      <dd className="mt-1 text-sm text-gray-900">{isTrainer ? 'Formateur' : 'Candidat'}</dd>
                    </div>
                  </dl>
                </div>
  
                {/* Personal Info Section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                      <dd className="mt-1 text-sm text-gray-900">{`${formData.firstName} ${formData.lastName}`}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.dateOfBirth}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formData.address || 'Non spécifié'}</dd>
                    </div>
                  </dl>
                </div>
  
                {/* Professional Info Section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {isTrainer ? 'Informations du formateur' : 'Informations professionnelles'}
                  </h3>
                  <dl className="grid grid-cols-1 gap-4">
                    {isTrainer ? (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Domaines d'expertise</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.expertise || 'Non spécifié'}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Certifications</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.certifications || 'Non spécifié'}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Expérience en formation</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.teachingExperience || 'Non spécifié'}</dd>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Disponibilités</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formData.availability || 'Non spécifié'}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Tarif horaire</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {formData.ratePerHour ? `${formData.ratePerHour}€/h` : 'Non spécifié'}
                            </dd>
                          </div>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Méthodologie</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.methodology || 'Non spécifié'}</dd>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Entreprise</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formData.company || 'Non spécifié'}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Poste</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formData.position || 'Non spécifié'}</dd>
                          </div>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Formation</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.education || 'Non spécifié'}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Expérience</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.experience || 'Non spécifié'}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Compétences</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.skills || 'Non spécifié'}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>
              </div>
  
              {errors.submit && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                </div>
              )}
            </div>
          );
  
        default:
          return null;
      }
    }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8">
        <StepIndicator currentStep={currentStep} steps={steps[formData.role]} />

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {steps[formData.role][currentStep - 1].title}
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
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg ml-auto hover:bg-blue-700 transition-colors"
              >
                Suivant
                <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg ml-auto hover:bg-green-700 transition-colors"
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