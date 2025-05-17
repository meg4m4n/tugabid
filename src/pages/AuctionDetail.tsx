import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Heart, User, DollarSign, AlertCircle } from 'lucide-react';

// Mock data - would come from API in real implementation
const mockAuction = {
  id: '1',
  title: 'Vintage Camera Collection',
  description: 'Rare collection of vintage cameras from the 1950s in excellent condition. This set includes 3 film cameras with original cases and manuals. Perfect for collectors or photography enthusiasts who appreciate the craftsmanship of classic cameras.\n\nIncludes:\n- Leica M3 (1954)\n- Canon VII (1952)\n- Nikon S2 (1955)\n\nAll cameras have been tested and are in working condition. The Leica has some minor cosmetic wear, but the Canon and Nikon are in near-mint condition.',
  startPrice: 300,
  currentPrice: 450,
  imageUrl: 'https://images.pexels.com/photos/821738/pexels-photo-821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  startDate: new Date(Date.now() - 604800000), // 7 days ago
  endDate: new Date(Date.now() + 172800000), // 2 days from now
  seller: {
    id: 'user1',
    username: 'vintagecollector',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.8,
    joinedDate: 'Jan 2021'
  },
  bids: [
    { id: 'bid1', amount: 450, timestamp: new Date(Date.now() - 86400000), user: { username: 'camerafan', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' } },
    { id: 'bid2', amount: 425, timestamp: new Date(Date.now() - 172800000), user: { username: 'photogeek', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' } },
    { id: 'bid3', amount: 400, timestamp: new Date(Date.now() - 259200000), user: { username: 'collector99', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' } },
    { id: 'bid4', amount: 375, timestamp: new Date(Date.now() - 345600000), user: { username: 'vintagelover', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' } },
    { id: 'bid5', amount: 350, timestamp: new Date(Date.now() - 432000000), user: { username: 'antiques4ever', avatar: 'https://randomuser.me/api/portraits/women/66.jpg' } }
  ]
};

const AuctionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bidAmount, setBidAmount] = useState<number>((mockAuction.currentPrice || 0) + 25);
  const [showBidConfirm, setShowBidConfirm] = useState(false);
  
  // Helper functions
  const formatTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Auction ended';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handlePlaceBid = () => {
    // Here you would make an API call to place the bid
    setShowBidConfirm(false);
    alert(`Bid of $${bidAmount} placed successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Auction details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image section */}
            <div className="md:w-1/2">
              <img 
                src={mockAuction.imageUrl} 
                alt={mockAuction.title} 
                className="w-full h-[300px] md:h-full object-cover"
              />
            </div>
            
            {/* Details section */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{mockAuction.title}</h1>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-4 flex items-center">
                <Clock className="w-5 h-5 text-amber-600 mr-2" />
                <span className="font-medium">
                  {formatTimeLeft(mockAuction.endDate)}
                </span>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 text-sm">Current bid:</p>
                <p className="text-3xl font-bold text-indigo-700">
                  ${mockAuction.currentPrice}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Started at ${mockAuction.startPrice} · {mockAuction.bids.length} bids
                </p>
              </div>
              
              <div className="mt-6">
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseInt(e.target.value))}
                    min={mockAuction.currentPrice + 1}
                    step={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button 
                    onClick={() => setShowBidConfirm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Place Bid
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>Enter ${mockAuction.currentPrice + 1} or more</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={mockAuction.seller.avatar} 
                    alt={mockAuction.seller.username} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{mockAuction.seller.username}</p>
                    <p className="text-sm text-gray-500">
                      Seller rating: {mockAuction.seller.rating} · Member since {mockAuction.seller.joinedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description and bids section */}
          <div className="p-6 md:flex gap-6">
            {/* Description */}
            <div className="md:w-2/3">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="prose max-w-none">
                {mockAuction.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Auction Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Auction started</p>
                    <p>{formatDate(mockAuction.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Auction ends</p>
                    <p>{formatDate(mockAuction.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Item ID</p>
                    <p>{mockAuction.id}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bid history */}
            <div className="md:w-1/3 mt-6 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Bid History</h2>
              
              {mockAuction.bids.length === 0 ? (
                <p className="text-gray-500">No bids yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {mockAuction.bids.map(bid => (
                    <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src={bid.user.avatar} 
                          alt={bid.user.username} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm font-medium">{bid.user.username}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${bid.amount}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(bid.timestamp).toLocaleDateString()} {new Date(bid.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bid confirmation modal */}
      {showBidConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Your Bid</h3>
            <p className="mb-4">You are about to place a bid of <span className="font-bold">${bidAmount}</span> on:</p>
            <p className="font-medium mb-6">{mockAuction.title}</p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" />
                <p>
                  By placing this bid, you are committing to purchase this item if you are the winning bidder.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowBidConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handlePlaceBid}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;