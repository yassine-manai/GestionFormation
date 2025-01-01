import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen } from 'lucide-react';

const TrainerSpace = ({ onLogout }) => {
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  // Sample data for training sessions
  const sampleSessions = [
    {
      id: 1,
      title: 'Formation React Avancée',
      startDate: '2024-01-15',
      duration: '3 jours',
      participants: [
        { id: 1, name: 'Alice Dupont', email: 'alice.dupont@example.com', progress: 80 },
        { id: 2, name: 'Jean Dupuis', email: 'jean.dupuis@example.com', progress: 60 },
      ],
      progress: 70,
      status: 'En cours',
    },
    {
      id: 2,
      title: 'Introduction à Node.js',
      startDate: '2024-02-10',
      duration: '5 jours',
      participants: [
        { id: 3, name: 'Marie Curie', email: 'marie.curie@example.com', progress: 50 },
        { id: 4, name: 'Louis Pasteur', email: 'louis.pasteur@example.com', progress: 30 },
      ],
      progress: 40,
      status: 'Planifié',
    },
    {
      id: 3,
      title: 'Maîtrise de Docker',
      startDate: '2024-03-05',
      duration: '2 jours',
      participants: [
        { id: 5, name: 'Albert Einstein', email: 'albert.einstein@example.com', progress: 100 },
        { id: 6, name: 'Isaac Newton', email: 'isaac.newton@example.com', progress: 95 },
      ],
      progress: 97,
      status: 'Terminé',
    },
  ];

  useEffect(() => {
    const fetchSessions = () => {
      // Simulate API call
      setTrainingSessions(sampleSessions);
      setLoading(false);
    };

    fetchSessions();
  }, []);

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
          <h2 className="text-3xl font-bold text-gray-900">Formations Encadrées</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{session.title}</h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Début: {session.startDate}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Durée: {session.duration}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Participants: {session.participants.length}</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progression globale</span>
                      <span className="text-sm font-medium text-gray-700">{session.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        session.status === 'En cours'
                          ? 'bg-green-100 text-green-800'
                          : session.status === 'Planifié'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {session.status}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedSession(selectedSession?.id === session.id ? null : session)
                      }
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {selectedSession?.id === session.id
                        ? 'Masquer participants'
                        : 'Voir participants'}
                    </button>
                  </div>

                  {selectedSession?.id === session.id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Liste des participants</h4>
                      <div className="space-y-3">
                        {session.participants.map((participant) => (
                          <div key={participant.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{participant.name}</span>
                              <span className="text-sm text-gray-600">{participant.progress}%</span>
                            </div>
                            <div className="text-sm text-gray-600">{participant.email}</div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${participant.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {trainingSessions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune formation</h3>
            <p className="mt-1 text-sm text-gray-500">
              Vous n'encadrez aucune formation pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerSpace;
