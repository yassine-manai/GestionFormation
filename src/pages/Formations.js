import React, { useState } from 'react';
import TrainingCard from '../components/TrainingCard';

const Formations = () => {
  const [search, setSearch] = useState('');
  const formations = [
    { id: 1, title: 'Java', description: 'Formation Java Backend', tags: ['java', 'backend'] },
    { id: 2, title: 'React', description: 'Formation React Frontend', tags: ['react', 'frontend'] },
  ];

  const filteredFormations = formations.filter((f) =>
    f.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <input
        type="text"
        placeholder="Rechercher par mot clé..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {filteredFormations.map((formation) => (
          <TrainingCard key={formation.id} {...formation} />
        ))}
      </div>
    </div>
  );
};

export default Formations;