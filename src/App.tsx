import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';

// Components
import BottomNav from './components/BottomNav';

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#1D4ED8]">
              TugaBid
            </Link>
            
            {/* Search - Desktop */}
            <div className="hidden md:flex relative flex-grow max-w-md mx-8">
              <input
                type="text"
                placeholder="Procurar leilões..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/auctions" className="text-gray-700 hover:text-[#1D4ED8]">
                Explorar
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/create-auction" className="text-gray-700 hover:text-[#1D4ED8]">
                    Vender
                  </Link>
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-700 hover:text-[#1D4ED8] cursor-pointer" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-[#F97316] rounded-full"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700">{user?.username}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-[#1D4ED8]">
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-[#3B82F6] transition-colors"
                  >
                    Registar
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
                  className="text-gray-700 hover:text-[#1D4ED8] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explorar
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/create-auction"
                      className="text-gray-700 hover:text-[#1D4ED8] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Vender
                    </Link>
                    <Link
                      to="/notifications"
                      className="text-gray-700 hover:text-[#1D4ED8] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notificações
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-[#1D4ED8] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Perfil
                    </Link>
                    <button
                      className="text-left text-[#F97316] hover:text-[#F97316]/80 py-2"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Terminar Sessão
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-[#1D4ED8] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-700 hover:text-[#1D4ED8] py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registar
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
          <Route 
            path="/auctions/:id" 
            element={
              <PrivateRoute>
                <AuctionDetail />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      
      {/* Bottom Navigation - Mobile */}
      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;