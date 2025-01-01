import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, BookOpenCheck } from 'lucide-react';

const CandidateSpace = ({ onLogout }) => {
  const [userFormations, setUserFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample formations data - replace with actual API call
  const sampleFormations = [
    {
      id: 1,
      title: 'Formation React',
      startDate: '2024-01-15',
      duration: '2 mois',
      instructor: 'John Doe',
      status: 'En cours',
      progress: 60,
      completedModules: 3,
      totalModules: 5,
      nextSession: '2024-01-20',
      materials: [
        { id: 1, name: 'Introduction à React', completed: true },
        { id: 2, name: 'Components & Props', completed: true },
        { id: 3, name: 'State & Lifecycle', completed: true },
        { id: 4, name: 'Hooks', completed: false },
        { id: 5, name: 'Advanced Patterns', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Formation Node.js',
      startDate: '2024-02-01',
      duration: '3 mois',
      instructor: 'Jane Smith',
      status: 'À venir',
      progress: 0,
      completedModules: 0,
      totalModules: 6,
      nextSession: '2024-02-01',
      materials: [
        { id: 1, name: 'Basics of Node.js', completed: false },
        { id: 2, name: 'Express Framework', completed: false },
        { id: 3, name: 'Database Integration', completed: false },
        { id: 4, name: 'Authentication', completed: false },
        { id: 5, name: 'API Development', completed: false },
        { id: 6, name: 'Deployment', completed: false }
      ]
    }
  ];

  useEffect(() => {
    // Simulate fetching user's formations
    const fetchFormations = () => {
      setTimeout(() => {
        setUserFormations(sampleFormations);
        setLoading(false);
      }, 1000); // Simulate API delay
    };

    fetchFormations();
  }, []);

  const [expandedFormation, setExpandedFormation] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Mes Formations</h2>
            <p className="mt-2 text-gray-600">Suivez votre progression et accédez à vos formations</p>
          </div>
          
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userFormations.map((formation) => (
            <div
              key={formation.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{formation.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Début: {formation.startDate}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Durée: {formation.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Formateur: {formation.instructor}</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progression</span>
                      <span className="text-sm font-medium text-gray-700">
                        {formation.completedModules}/{formation.totalModules} modules
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${formation.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formation.status === 'En cours' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {formation.status}
                    </span>
                    <button
                      onClick={() => setExpandedFormation(expandedFormation === formation.id ? null : formation.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {expandedFormation === formation.id ? 'Masquer détails' : 'Voir détails'}
                    </button>
                  </div>

                  {expandedFormation === formation.id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Modules de formation</h4>
                      <div className="space-y-2">
                        {formation.materials.map(material => (
                          <div 
                            key={material.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                          >
                            <div className="flex items-center">
                              <BookOpenCheck className={`h-5 w-5 mr-2 ${
                                material.completed ? 'text-green-500' : 'text-gray-400'
                              }`} />
                              <span className={material.completed ? 'text-gray-900' : 'text-gray-600'}>
                                {material.name}
                              </span>
                            </div>
                            {material.completed && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Complété
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Prochaine session:</span> {formation.nextSession}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {userFormations.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune formation</h3>
            <p className="mt-1 text-sm text-gray-500">Vous n'êtes inscrit à aucune formation pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateSpace;