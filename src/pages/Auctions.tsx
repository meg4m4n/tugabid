import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AuctionCard from '../components/AuctionCard';

// Mock data - would come from API in real implementation
const mockAuctions = [
  {
    id: '1',
    title: 'Vintage Camera Collection',
    description: 'Rare collection of vintage cameras from the 1950s',
    currentPrice: 450,
    imageUrl: 'https://images.pexels.com/photos/821738/pexels-photo-821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 172800000), // 2 days from now
    bidsCount: 12,
    seller: {
      username: 'vintagecollector',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: '2',
    title: 'Gaming Console Bundle',
    description: 'Latest gaming console with 3 controllers and 5 games',
    currentPrice: 650,
    imageUrl: 'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 86400000), // 1 day from now
    bidsCount: 24,
    seller: {
      username: 'gamermike',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  },
  {
    id: '3',
    title: 'Antique Wooden Desk',
    description: 'Beautiful mahogany desk from the early 1900s',
    currentPrice: 1200,
    imageUrl: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 345600000), // 4 days from now
    bidsCount: 5,
    seller: {
      username: 'antiquedealer',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  },
  {
    id: '4',
    title: 'Luxury Watch Collection',
    description: 'Set of 3 luxury watches in excellent condition',
    currentPrice: 3200,
    imageUrl: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 259200000), // 3 days from now
    bidsCount: 18,
    seller: {
      username: 'luxuryitems',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  },
  {
    id: '5',
    title: 'Handmade Pottery Set',
    description: 'Complete set of handmade ceramic dinnerware',
    currentPrice: 180,
    imageUrl: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 172800000), // 2 days from now
    bidsCount: 8,
    seller: {
      username: 'craftypotter',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    }
  }
];

const Auctions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter auctions based on search term
  const filteredAuctions = mockAuctions.filter(auction => 
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Browse Auctions</h1>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 md:w-auto w-full"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {['all', 'electronics', 'collectibles', 'clothing', 'art', 'furniture'].map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Auction Status</h3>
                <div className="space-y-2">
                  {['all', 'ending soon', 'newly listed', 'highest price'].map(status => (
                    <div key={status} className="flex items-center">
                      <input
                        type="radio"
                        id={status}
                        name="status"
                        className="h-4 w-4 text-indigo-600"
                      />
                      <label htmlFor={status} className="ml-2 text-gray-700 capitalize">
                        {status === 'all' ? 'All' : status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2">
                Reset
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Auction listings */}
      <div className="container mx-auto px-4">
        {filteredAuctions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No auctions found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;