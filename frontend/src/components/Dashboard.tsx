import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Star, 
  User, 
  Bell, 
  Heart, 
  Trophy,
  Menu,
  X 
} from 'lucide-react';
import { useUserContext } from '../context/UserContext';
// Team Configuration
// Type definition for IPL Teams
type IPLTeam = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  description: string;
};

type IPLTeamsType = {
  [key: string]: IPLTeam;
};

const IPL_TEAMS: IPLTeamsType = {
  RCB: {
    name: 'Royal Challengers Bangalore',
    primaryColor: '#red',
    secondaryColor: '#gold',
    logo: '/rcb-logo.png',
    description: 'Royal Challengers Bangalore team details'
  },
  CSK: {
    name: 'Chennai Super Kings',
    primaryColor: '#yellow',
    secondaryColor: '#blue',
    logo: '/csk-logo.png',
    description: 'Chennai Super Kings team details'
  },
  MI: {
    name: 'Mumbai Indians',
    primaryColor: '#blue',
    secondaryColor: '#gold',
    logo: '/mi-logo.png',
    description: 'Mumbai Indians team details'
  },
  DC: {
    name: 'Delhi Capitals',
    primaryColor: '#blue',
    secondaryColor: '#red',
    logo: '/dc-logo.png',
    description: 'Delhi Capitals team details'
  },
  GT: {
    name: 'Gujarat Titans',
    primaryColor: '#blue',
    secondaryColor: '#white',
    logo: '/gt-logo.png',
    description: 'Gujarat Titans team details'
  }
};
const Dashboard = () => {
  
  const { user} = useUserContext();

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const team = IPL_TEAMS[user.team || 'please login at /login'];

  // Sample product data
  const featuredProducts = [
    {
      id: 1,
      name: `${team.name} Jersey`,
      price: 2999,
      image: `./rcb-jershy.jpeg`
    },
    {
      id: 2,
      name: `${team.name} Cap`,
      price: 799,
      image: `./rcb-cap.jpeg`
    },
    {
      id: 3,
      name: `${team.name} Supporter Kit`,
      price: 4999,
      image: `./rcb-suppoter-kit.jpg`
    }
  ];

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className="min-h-screen p-6 bg-gray-900" 
      style={{ 
        backgroundColor: '#121212', 
        color: team.primaryColor 
      }}
    >
      {/* Header */}
      <header 
        className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg shadow-lg mb-6 relative"
        style={{ 
          backgroundColor: '#1E1E1E', 
          color: 'white' 
        }}
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center space-x-4">
            <img 
              src={team.logo} 
              alt={`${team.name} Logo`} 
              className="h-12 w-12 rounded-full"
            />
            <h1 className="text-2xl font-bold hidden md:block text-white">
              Welcome to {team.name} Fan Store
            </h1>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-white">
          <a 
            href="#" 
            className="hover:text-opacity-80 flex items-center"
            style={{ color: team.primaryColor }}
          >
            <ShoppingCart className="mr-2" /> Shop
          </a>
          <a 
            href="#" 
            className="hover:text-opacity-80 flex items-center"
            style={{ color: team.primaryColor }}
          >
            <Heart className="mr-2" /> Wishlist
          </a>
          <a 
            href="#" 
            className="hover:text-opacity-80 flex items-center"
            style={{ color: team.primaryColor }}
          >
            <User className="mr-2" /> Profile
          </a>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav 
            className="md:hidden absolute top-full left-0 w-full bg-opacity-75 backdrop-blur-lg z-40"
            style={{ 
              backgroundColor: '#1E1E1E' 
            }}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              <a 
                href="#" 
                className="text-white flex items-center w-full justify-center py-2 hover:bg-opacity-90"
                style={{ 
                  backgroundColor: `${team.primaryColor}20`,
                  color: team.primaryColor
                }}
              >
                <ShoppingCart className="mr-2" /> Shop
              </a>
              <a 
                href="#" 
                className="text-white flex items-center w-full justify-center py-2 hover:bg-opacity-90"
                style={{ 
                  backgroundColor: `${team.primaryColor}20`,
                  color: team.primaryColor
                }}
              >
                <Heart className="mr-2" /> Wishlist
              </a>
              <a 
                href="#" 
                className="text-white flex items-center w-full justify-center py-2 hover:bg-opacity-90"
                style={{ 
                  backgroundColor: `${team.primaryColor}20`,
                  color: team.primaryColor
                }}
              >
                <User className="mr-2" /> Profile
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* User Welcome Section */}
      <section 
        className="p-6 rounded-lg mb-6 flex flex-col md:flex-row flex-wrap items-center justify-between"
        style={{ 
          backgroundColor: '#1A1A1A', 
          borderLeft: `5px solid ${team.primaryColor}` 
        }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">
            Hey {user.name}! 👋
          </h2>
          <p className="text-gray-300">
            {team.description}
          </p>
        </div>
        <div className="flex space-x-4 mt-5">
          <div 
            className="p-4 rounded-lg text-center"
            style={{ 
              backgroundColor: '#2A2A2A', 
              color: team.primaryColor 
            }}
          >
            <Trophy className="mx-auto mb-2" style={{ color: team.primaryColor }} />
            <span>Team Stats</span>
          </div>
          <div 
            className="p-4 rounded-lg text-center"
            style={{ 
              backgroundColor: '#2A2A2A', 
              color: team.primaryColor 
            }}
          >
            <Star className="mx-auto mb-2" style={{ color: team.primaryColor }} />
            <span>Fan Points</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 
          className="text-2xl font-bold mb-6"
          style={{ color: team.primaryColor }}
        >
          Featured Team Merchandise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover"
              />
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#1E1E1E', 
                  borderTop: `3px solid ${team.primaryColor}` 
                }}
              >
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: team.primaryColor }}
                >
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span 
                    className="text-lg font-bold"
                    style={{ color: team.primaryColor }}
                  >
                    ₹{product.price}
                  </span>
                  <button 
                    className="px-4 py-2 rounded-full font-bold transition hover:opacity-90"
                    style={{ 
                      backgroundColor: `${team.primaryColor}20`,
                      color: team.primaryColor
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;