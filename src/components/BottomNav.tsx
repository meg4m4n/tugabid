import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden z-10">
      <div className="container mx-auto flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${isActive('/') ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/auctions" 
          className={`flex flex-col items-center ${isActive('/auctions') ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Browse</span>
        </Link>
        
        <Link 
          to="/create-auction" 
          className={`flex flex-col items-center ${isActive('/create-auction') ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <div className="bg-indigo-600 rounded-full p-1.5 -mt-6">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs mt-1">Sell</span>
        </Link>
        
        <Link 
          to="/watchlist" 
          className={`flex flex-col items-center ${isActive('/watchlist') ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Watchlist</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center ${isActive('/profile') ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;