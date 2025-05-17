import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShieldCheck, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Unique Items at Great Prices</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Join thousands of users finding deals on rare collectibles, electronics, and more through our secure auction platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/auctions"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center"
            >
              Browse Auctions <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors flex items-center justify-center"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Package className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Selection</h3>
              <p className="text-gray-600">
                Find items you can't get anywhere else from trusted sellers around the world.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Bidding</h3>
              <p className="text-gray-600">
                Our platform ensures safe transactions with verification and buyer protection.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-amber-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Never miss a bid with instant notifications when you're outbid or when auctions end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create an account now to start bidding on thousands of unique items or list your own items for auction.
          </p>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;