import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Formations = () => {
  const [search, setSearch] = useState('');

  const formations = [
    {
      id: 1, title: 'Java',description: 'Formation Java Backend',tags: ['java', 'backend'],duration: '3 mois',participants: 15, startDate: '01/01/2024'
    },
    {
      id: 2,
      title: 'React',
      description: 'Formation React Frontend',
      tags: ['react', 'frontend'],
      duration: '2 mois',
      participants: 10,
      startDate: '01/02/2024'
    },
    {
      id: 3,
      title: 'React',
      description: 'Formation React Frontend',
      tags: ['react', 'frontend'],
      duration: '2 mois',
      participants: 10,
      startDate: '01/02/2024'
    }
  ];

  const filteredFormations = formations.filter((f) =>
    f.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Formations Disponible</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full max-w-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormations.map((formation) => (
            <div
              key={formation.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{formation.title}</h2>
                <p className="text-gray-600 mb-4">{formation.description}</p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Duration:</span>
                      {formation.duration}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Participants:</span>
                      {formation.participants}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <span className="font-medium mr-2">Start Date:</span>
                      {formation.startDate}
                    </p>
                  </div>

                  <Link
                    to={`/formation/${formations.id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition-colors duration-300 font-medium
                 group-hover:shadow-md"
                  >
                    Voir les détails
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFormations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No formations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formations;