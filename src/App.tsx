import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';

// Components
import BottomNav from './components/BottomNav';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                BidMaster
              </Link>
              
              {/* Search - Desktop */}
              <div className="hidden md:flex relative flex-grow max-w-md mx-8">
                <input
                  type="text"
                  placeholder="Search for auctions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              
              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/auctions" className="text-gray-700 hover:text-indigo-600">
                  Browse
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link to="/create-auction" className="text-gray-700 hover:text-indigo-600">
                      Sell
                    </Link>
                    <div className="relative">
                      <Bell className="w-5 h-5 text-gray-700 hover:text-indigo-600 cursor-pointer" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-700">User</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 focus:outline-none"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-3">
                <nav className="flex flex-col gap-3">
                  <Link
                    to="/auctions"
                    className="text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse
                  </Link>
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/create-auction"
                        className="text-gray-700 hover:text-indigo-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sell
                      </Link>
                      <Link
                        to="/notifications"
                        className="text-gray-700 hover:text-indigo-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Notifications
                      </Link>
                      <Link
                        to="/profile"
                        className="text-gray-700 hover:text-indigo-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="text-left text-red-600 hover:text-red-800 py-2"
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-indigo-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        to="/register"
                        className="text-gray-700 hover:text-indigo-600 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
          </Routes>
        </main>
        
        {/* Bottom Navigation - Mobile */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;