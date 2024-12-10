import React from 'react';
import { Link } from 'react-router-dom';

const TrainingCard = ({ title, description, id }) => (
  <div className="border p-4 rounded-lg shadow-md hover:bg-gray-100">
    <h3 className="text-xl font-bold">{title}</h3>
    <p>{description}</p>
    <Link to={`/formation/${id}`} className="text-blue-600">Voir les détails</Link>
  </div>
);

export default TrainingCard;
