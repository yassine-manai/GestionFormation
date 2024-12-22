import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, BookOpen } from 'lucide-react';

const TrainingCard = ({ 
  title, 
  description, 
  id, 
  duration,
  participants,
  startDate 
}) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="border-b border-gray-500">
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-600 p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{title}</h3>
      </div>
    </div>
    
    <div className="p-6">
      <p className="text-gray-600 mb-4 line-clamp-2 h-12">{description}</p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-500">
          <Clock size={18} className="mr-2" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <Users size={18} className="mr-2" />
          <span className="text-sm">{participants} participants</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <BookOpen size={18} className="mr-2" />
          <span className="text-sm">{startDate}</span>
        </div>
      </div>

      <Link 
        to={`/formation/${id}`} 
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition-colors duration-300 font-medium
                 group-hover:shadow-md"
      >
        Voir les détails
        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  </div>
);

export default TrainingCard;