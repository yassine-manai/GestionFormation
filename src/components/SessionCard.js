import React from 'react';

const SessionCard = ({ startDate, endDate, sessionId, maxCandidates, currentCandidates }) => (
  <div className="border p-4 rounded-lg shadow-md hover:bg-gray-100">
    <p><strong>Date de début:</strong> {startDate}</p>
    <p><strong>Date de fin:</strong> {endDate}</p>
    <p><strong>Max Candidats:</strong> {maxCandidates}</p>
    <p><strong>Actuellement inscrits:</strong> {currentCandidates}</p>
    <button disabled={currentCandidates >= maxCandidates} className="bg-blue-600 text-white p-2 rounded mt-2">
      {currentCandidates >= maxCandidates ? 'Inscription Fermée' : 'S’inscrire'}
    </button>
  </div>
);

export default SessionCard;
