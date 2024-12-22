import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Monitor, Briefcase, Award, Globe, Camera,
  Pencil, Database, Network, Building2, GraduationCap,
  Lightbulb, Megaphone, Activity, Shield, ChevronRight
} from 'lucide-react';

const CategoryCard = ({ category, icon: Icon, description }) => (
  <Link
    to={`/formations?category=${category}`}
    className="group relative overflow-hidden rounded-xl p-8 transition-all 
               duration-500 hover:shadow-2xl bg-white border border-blue-100
               hover:border-blue-300 flex flex-col items-center text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon 
      className="mb-6 text-blue-600 group-hover:text-blue-800 
                 transition-all duration-500 group-hover:scale-110" 
      size={56} 
    />
    <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-800">
      {category}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <ChevronRight className="text-blue-600" />
    </div>
  </Link>
);

const StatCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl 
                  transform hover:-translate-y-1 transition-all duration-300">
    <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
      <Icon size={32} className="text-blue-600" />
    </div>
    <h4 className="font-bold text-xl mb-3 text-gray-800">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  const categories = [
    {
      name: 'Développement',
      icon: Monitor,
      description: 'Formations en programmation, web et mobile'
    },
    {
      name: 'Gestion',
      icon: Briefcase,
      description: 'Management, finance et administration'
    },
    {
      name: 'Design',
      icon: Pencil,
      description: 'Design graphique, UX/UI et multimédia'
    },
    {
      name: 'Réseaux',
      icon: Network,
      description: 'Infrastructure réseau et cybersécurité'
    },
    {
      name: 'Systèmes',
      icon: Database,
      description: 'Administration système et cloud computing'
    },
    {
      name: 'Multimédia',
      icon: Camera,
      description: 'Production audiovisuelle et animation'
    },
    {
      name: 'Architecture',
      icon: Building2,
      description: 'Architecture et design d\'intérieur'
    },
    {
      name: 'Innovation',
      icon: Lightbulb,
      description: 'Entrepreneuriat et innovation technologique'
    },
    {
      name: 'Marketing',
      icon: Megaphone,
      description: 'Marketing digital et communication'
    }
  ];

  const stats = [
    {
      icon: Users,
      title: '+ de 1000 Étudiants',
      description: 'Une communauté dynamique et en croissance'
    },
    {
      icon: Award,
      title: 'Formations Certifiantes',
      description: 'Diplômes reconnus par lÉtat'
    },
    {
      icon: Globe,
      title: 'Partenariats Internationaux',
      description: 'Collaborations avec des universités européennes'
    },
    {
      icon: GraduationCap,
      title: '95% de Réussite',
      description: 'Un excellent taux de diplômés'
    },
    {
      icon: Activity,
      title: 'Stage Garantis',
      description: 'Partenariats avec + de 100 entreprises'
    },
    {
      icon: Shield,
      title: 'Accréditation',
      description: 'Reconnu par les organismes internationaux'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section with enhanced styling */}
      <div className="p-6 sm:p-8 lg:p-12">
      <div className="bg-gradient-to-r from-yellow-400 to-blue-900 text-white py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0 opacity-10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight">
            ISET de Rades
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto text-blue-100 leading-relaxed mb-12">
            Façonnez votre avenir avec une formation d'excellence en technologie et innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold 
                         hover:bg-blue-50 transition-all duration-300 text-base sm:text-lg
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              S'inscrire maintenant
            </Link>
            <Link
              to="/formations"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold 
                         hover:bg-blue-600 transition-all duration-300 text-base sm:text-lg
                         border border-blue-400 hover:border-blue-300
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Découvrir nos programmes
            </Link>
          </div>
        </div>

        {/* Optional decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>
    </div>

      {/* Main Content with improved spacing and layout */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Categories Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Programmes de Formation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
              Découvrez nos formations innovantes conçues pour répondre aux besoins 
              du marché et vous préparer aux défis de demain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category.name}
                icon={category.icon}
                description={category.description}
              />
            ))}
          </div>

          {/* Stats Section with enhanced visual appeal */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ISET en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
              Notre engagement envers l'excellence se reflète dans nos résultats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                icon={stat.icon}
                title={stat.title}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;