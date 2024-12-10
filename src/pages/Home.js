import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Monitor, 
  Briefcase, 
  Award, 
  Globe 
} from 'lucide-react';

const CategoryCard = ({ category, icon: Icon, description }) => (
  <Link
    to={`/formations?category=${category}`}
    className="group border-2 border-blue-200 rounded-lg p-6 transition-all 
               duration-300 hover:border-blue-400 hover:shadow-lg 
               hover:scale-105 flex flex-col items-center text-center"
  >
    <Icon 
      className="mb-4 text-blue-600 group-hover:text-blue-800 
                 transition-colors duration-300" 
      size={48} 
    />
    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-800">
      {category}
    </h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Link>
);

const Home = () => {
  const categories = [
    {
      name: 'Développement',
      icon: Monitor,
      description: 'Formations en programmation et technologies numériques'
    },
    {
      name: 'Gestion',
      icon: Briefcase,
      description: 'Programmes de management et administration'
    },
    {
      name: 'Design',
      icon: BookOpen,
      description: 'Créativité et design graphique et UX/UI'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Bienvenue à l'ISET de Rades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explorez nos formations innovantes et préparez-vous à réussir 
            dans votre carrière professionnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category.name}
              icon={category.icon}
              description={category.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users size={40} className="mx-auto text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">
                + de 1000 Étudiants
              </h4>
              <p className="text-gray-600">
                Une communauté dynamique et en croissance
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award size={40} className="mx-auto text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">
                Formations Certifiantes
              </h4>
              <p className="text-gray-600">
                Diplômes reconnus par l'État
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe size={40} className="mx-auto text-blue-600 mb-4" />
              <h4 className="font-semibold text-lg mb-2">
                Opportunités Internationales
              </h4>
              <p className="text-gray-600">
                Partenariats avec des universités européennes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;