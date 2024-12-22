import React from 'react';
import { Link } from 'react-router-dom';
import SessionCard from '../components/SessionCard';

const FormationDetail = ({ match }) => {
 // const formationId = match.params.id; 
  const formation = {
    title: 'Java',
    description: 'Formation Java Backend',
    sessions: [
      { sessionId: 1, startDate: '01/01/2024', endDate: '01/03/2024', maxCandidates: 15, currentCandidates: 5 },
      { sessionId: 2, startDate: '02/01/2025', endDate: '02/03/2025', maxCandidates: 15, currentCandidates: 10 },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">{formation.title}</h2>
      <p className="mb-4">{formation.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {formation.sessions.map((session) => (
          <SessionCard key={session.sessionId} {...session} />
        ))}
      </div>
      <Link to={`/formations`} className="text-blue-600">Retour aux formations</Link>
    </div>
  );
};

export default FormationDetail;
