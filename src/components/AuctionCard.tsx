import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';

interface Seller {
  username: string;
  avatar: string;
}

interface Auction {
  id: string;
  title: string;
  description: string;
  currentPrice: number;
  imageUrl: string;
  endDate: Date;
  bidsCount: number;
  seller: Seller;
}

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  // Calculate time left
  const getTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return 'Ended';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h left`;
    } else {
      return `${hours}h left`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/auctions/${auction.id}`} className="block">
        <div className="relative h-48">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <button className="p-1.5 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/auctions/${auction.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-indigo-600 transition-colors">
            {auction.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {auction.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg text-indigo-700">${auction.currentPrice}</p>
            <p className="text-xs text-gray-500">{auction.bidsCount} bids</p>
          </div>
          
          <div className="flex items-center text-sm bg-amber-50 text-amber-800 px-2 py-1 rounded">
            <Clock className="h-4 w-4 mr-1" />
            <span>{getTimeLeft(auction.endDate)}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <img
            src={auction.seller.avatar}
            alt={auction.seller.username}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-xs text-gray-500">{auction.seller.username}</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;