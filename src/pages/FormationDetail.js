import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Book, 
  Target, 
  Award,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import SessionCard from '../components/SessionCard';

const FormationDetail = ({ match }) => {
  // const formationId = match.params.id;
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const formation = {
    title: 'Java Backend Development',
    shortDescription: 'Formation complète Java Backend avec Spring Boot',
    fullDescription: `Cette formation intensive couvre tous les aspects du développement backend avec Java.
    Vous apprendrez les fondamentaux de Java, la programmation orientée objet, Spring Boot, 
    les API REST, la sécurité, et les bonnes pratiques de développement.`,
    duration: '300 heures',
    level: 'Intermédiaire',
    prerequisites: ['Bases de la programmation', 'Notions de SQL', 'Concepts Web de base'],
    objectives: [
      'Maîtriser Java et la POO',
      'Développer des APIs REST avec Spring Boot',
      'Gérer la persistance des données avec JPA/Hibernate',
      'Implémenter la sécurité avec Spring Security',
      'Utiliser les outils de build et de déploiement'
    ],
    certification: 'Certification Java Developer incluse',
    sessions: [
      { 
        sessionId: 1, 
        startDate: '01/01/2024', 
        endDate: '01/03/2024', 
        maxCandidates: 15, 
        currentCandidates: 5,
        trainer: 'Marie Dubois',
        format: 'Hybride',
        schedule: 'Lundi au Vendredi, 9h-17h',
        location: 'Paris & Remote'
      },
      { 
        sessionId: 2, 
        startDate: '02/01/2025', 
        endDate: '02/03/2025', 
        maxCandidates: 15, 
        currentCandidates: 10,
        trainer: 'Jean Martin',
        format: 'Présentiel',
        schedule: 'Lundi au Vendredi, 9h-17h',
        location: 'Lyon'
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Link 
          to="/formations" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour aux formations
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{formation.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{formation.shortDescription}</p>
            
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span>{formation.duration}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                <span>{formation.level}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                <span>{formation.certification}</span>
              </div>
            </div>
            
            {/* Description */}
            <div className="prose max-w-none">
              <p className={`text-gray-600 ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {formation.fullDescription}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 mt-2 flex items-center"
              >
                {showFullDescription ? (
                  <>Voir moins <ChevronUp className="ml-1 w-4 h-4" /></>
                ) : (
                  <>Voir plus <ChevronDown className="ml-1 w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Prerequisites */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900">
                  <Book className="w-5 h-5 mr-2 text-blue-600" />
                  Prérequis
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {formation.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Objectifs
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {formation.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sessions Section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Sessions disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formation.sessions.map((session) => (
                <SessionCard key={session.sessionId} {...session} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetail;