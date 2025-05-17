import prisma from '../models/prisma.js';

// Get all auctions
export const getAuctions = async (req, res, next) => {
  try {
    const { status, sort, limit = 10, page = 1 } = req.query;

    // Build query
    const query = {
      where: {},
      orderBy: {},
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        _count: {
          select: { bids: true }
        }
      }
    };

    // Filter by status
    if (status) {
      query.where.status = status;
    }

    // Sort
    if (sort) {
      const [field, order] = sort.split(':');
      query.orderBy[field] = order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    } else {
      query.orderBy.createdAt = 'desc';
    }

    // Execute query
    const auctions = await prisma.auction.findMany(query);
    const total = await prisma.auction.count({ where: query.where });

    res.status(200).json({
      success: true,
      data: auctions,
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

// Get single auction
export const getAuction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auction.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        bids: {
          orderBy: {
            amount: 'desc'
          },
          take: 5,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: auction
    });
  } catch (error) {
    next(error);
  }
};

// Create auction
export const createAuction = async (req, res, next) => {
  try {
    const { title, description, startPrice, imageUrl, startDate, endDate } = req.body;

    const auction = await prisma.auction.create({
      data: {
        title,
        description,
        startPrice,
        currentPrice: startPrice,
        imageUrl,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        sellerId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      data: auction
    });
  } catch (error) {
    next(error);
  }
};

// Update auction
export const updateAuction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, endDate, status } = req.body;

    // Check if auction exists
    let auction = await prisma.auction.findUnique({
      where: { id }
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found'
      });
    }

    // Check if user is owner
    if (auction.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this auction'
      });
    }

    // Update auction
    auction = await prisma.auction.update({
      where: { id },
      data: {
        title: title || auction.title,
        description: description || auction.description,
        imageUrl: imageUrl || auction.imageUrl,
        endDate: endDate ? new Date(endDate) : auction.endDate,
        status: status || auction.status
      }
    });

    res.status(200).json({
      success: true,
      data: auction
    });
  } catch (error) {
    next(error);
  }
};

// Delete auction
export const deleteAuction = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if auction exists
    const auction = await prisma.auction.findUnique({
      where: { id }
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: 'Auction not found'
      });
    }

    // Check if user is owner
    if (auction.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this auction'
      });
    }

    // Check if auction has bids
    const bidsCount = await prisma.bid.count({
      where: { auctionId: id }
    });

    if (bidsCount > 0) {
      // If auction has bids, just mark it as cancelled
      await prisma.auction.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });
    } else {
      // If no bids, delete the auction
      await prisma.auction.delete({
        where: { id }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Auction removed successfully'
    });
  } catch (error) {
    next(error);
  }
};