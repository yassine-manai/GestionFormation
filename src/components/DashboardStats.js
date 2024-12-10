import React from 'react';

const DashboardStats = ({ totalCandidates, totalTrainers, totalSessions }) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    <div className="bg-gray-100 p-4 rounded-lg">
      <h4 className="text-lg font-semibold">Total Candidats</h4>
      <p>{totalCandidates}</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h4 className="text-lg font-semibold">Total Formateurs</h4>
      <p>{totalTrainers}</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h4 className="text-lg font-semibold">Total Sessions</h4>
      <p>{totalSessions}</p>
    </div>
  </div>
);

export default DashboardStats;
