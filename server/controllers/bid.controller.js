import prisma from '../models/prisma.js';

// Create bid
export const createBid = async (req, res, next) => {
  try {
    const { amount, auctionId } = req.body;

    // Check if auction exists
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId }
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found'
      });
    }

    // Check if auction is active
    if (auction.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Auction is not active'
      });
    }

    // Check if auction has ended
    if (new Date(auction.endDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Auction has ended'
      });
    }

    // Check if bid amount is higher than current price
    if (amount <= auction.currentPrice) {
      return res.status(400).json({
        success: false,
        message: 'Bid amount must be higher than current price'
      });
    }

    // Check if user is not the seller
    if (auction.sellerId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot bid on your own auction'
      });
    }

    // Create bid
    const bid = await prisma.bid.create({
      data: {
        amount,
        userId: req.user.id,
        auctionId
      }
    });

    // Update auction current price
    await prisma.auction.update({
      where: { id: auctionId },
      data: { currentPrice: amount }
    });

    res.status(201).json({
      success: true,
      data: bid
    });
  } catch (error) {
    next(error);
  }
};

// Get all bids for an auction
export const getAuctionBids = async (req, res, next) => {
  try {
    const { auctionId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    // Check if auction exists
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId }
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found'
      });
    }

    // Get bids
    const bids = await prisma.bid.findMany({
      where: { auctionId },
      orderBy: { amount: 'desc' },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    const total = await prisma.bid.count({ where: { auctionId } });

    res.status(200).json({
      success: true,
      data: bids,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};