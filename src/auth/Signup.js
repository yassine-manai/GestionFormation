import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, Lock, EyeOff, Eye, Phone,
  FileText, ChevronRight, ChevronLeft, Check,
  Plus, X
} from 'lucide-react';

const steps = {
  candidat: [
    { id: 1, title: 'Compte' },
    { id: 2, title: 'Personnel' },
    { id: 3, title: 'Validation' }
  ],
  formateur: [
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

const ExpertiseField = ({ specialite, setSpecialite }) => {
  const [newDomain, setNewDomain] = useState('');
  const [newSkills, setNewSkills] = useState('');

  const handleAddExpertise = () => {
    if (newDomain && newSkills) {
      setSpecialite(prev => ({
        ...prev,
        [newDomain]: newSkills.split(',').map(skill => skill.trim())
      }));
      setNewDomain('');
      setNewSkills('');
    }
  };

  const handleRemoveDomain = (domain) => {
    const newSpecialite = { ...specialite };
    delete newSpecialite[domain];
    setSpecialite(newSpecialite);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          placeholder="Domaine d'expertise"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={newSkills}
          onChange={(e) => setNewSkills(e.target.value)}
          placeholder="Compétences (séparées par des virgules)"
          className="p-2 border rounded-lg"
        />
      </div>

      <button
        type="button"
        onClick={handleAddExpertise}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus size={16} className="mr-2" />
        Ajouter une expertise
      </button>

      <div className="mt-4 space-y-2">
        {Object.entries(specialite).map(([domain, skills]) => (
          <div key={domain} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">{domain}</h4>
              <p className="text-sm text-gray-600">{skills.join(', ')}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveDomain(domain)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    mdp: '',
    confirmPassword: '',
    role: 'candidat',
    nom: '',
    prenom: '',
    telephone: '',
    cin: '',
    photo: null,
    cv: null,
    specialite: {}
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFormData(prev => ({
          ...prev,
          [name]: base64String
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const isFormateur = formData.role === 'formateur';

    if (currentStep === 1) {
      if (!formData.email) {
        newErrors.email = "L'email est requis";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }

      if (!formData.mdp) {
        newErrors.mdp = "Le mot de passe est requis";
      } else if (formData.mdp.length < 8) {
        newErrors.mdp = "Le mot de passe doit contenir au moins 8 caractères";
      }

      if (formData.mdp !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    if (currentStep === 2) {
      if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
      if (!formData.nom) newErrors.nom = "Le nom est requis";
      if (!formData.cin) newErrors.cin = "Le CIN est requis";
      if (!formData.telephone) {
        newErrors.telephone = "Le téléphone est requis";
      }
    }

    if (currentStep === 3 && isFormateur) {
      if (Object.keys(formData.specialite).length === 0) {
        newErrors.specialite = "Au moins une expertise est requise";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        const submitData = {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          mdp: formData.mdp,
          cin: formData.cin,
          photo: formData.photo,
          telephone: formData.telephone,
          ...(formData.role === 'formateur' && {
            cv: formData.cv,
            specialite: formData.specialite
          })
        };

        const response = await fetch(`http://localhost:7050/register?role=${formData.role}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de l\'inscription');
        }

        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors(prev => ({
          ...prev,
          submit: error.message || "Une erreur est survenue lors de l'inscription"
        }));
      }
    }
  };

  const renderFormFields = () => {
    const isFormateur = formData.role === 'formateur';

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
                name="mdp"
                value={formData.mdp}
                onChange={handleChange}
                placeholder="Mot de passe"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500 
                  ${errors.mdp ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <PasswordStrengthIndicator password={formData.mdp} />

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500 
                  ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-gray-300"
              >
                <option value="candidat">Candidat</option>
                <option value="formateur">Formateur</option>
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
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom"
                error={errors.prenom}
              />
              <FormField
                icon={User}
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom"
                error={errors.nom}
              />
            </div>

            <FormField
              icon={FileText}
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleChange}
              placeholder="CIN"
              error={errors.cin}
            />

            <FormField
              icon={Phone}
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
              error={errors.telephone}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full"
              />
            </div>

            {isFormateur && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CV</label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="w-full"
                />
              </div>
            )}
          </div>
        );

      case 3:
        return isFormateur ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Ajoutez vos domaines d'expertise</h3>
            <ExpertiseField
              specialite={formData.specialite}
              setSpecialite={(newSpecialite) =>
                setFormData(prev => ({ ...prev, specialite: newSpecialite }))
              }
            />
            {errors.specialite && (
              <p className="text-red-500 text-sm">{errors.specialite}</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations du compte</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type de compte</dt>
                    <dd className="mt-1 text-sm text-gray-900">Candidat</dd>
                  </div>
                </dl>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {`${formData.prenom} ${formData.nom}`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.telephone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">CIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.cin}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Photo</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.photo ? 'Téléchargée' : 'Non téléchargée'}
                    </dd>
                  </div>
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

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations du compte</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type de compte</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.role === 'formateur' ? 'Formateur' : 'Candidat'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {`${formData.prenom} ${formData.nom}`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.telephone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">CIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.cin}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Photo</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.photo ? 'Téléchargée' : 'Non téléchargée'}
                    </dd>
                  </div>
                </dl>
              </div>

              {formData.role === 'formateur' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations du formateur</h3>
                  <dl className="grid grid-cols-1 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">CV</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.cv ? 'Téléchargé' : 'Non téléchargé'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Spécialités</dt>
                      <dd className="mt-1 space-y-2">
                        {Object.entries(formData.specialite).map(([domain, skills]) => (
                          <div key={domain} className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium">{domain}</h4>
                            <p className="text-sm text-gray-600">{skills.join(', ')}</p>
                          </div>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
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
  };

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
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={20} className="mr-2" />
                Précédent
              </button>
            )}

            {currentStep < steps[formData.role].length ? (
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