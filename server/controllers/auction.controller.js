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
    } else {
      // By default, only show active auctions
      query.where.status = 'ACTIVE';
    }

    // Sort
    if (sort) {
      const [field, order] = sort.split(':');
      query.orderBy[field] = order.toLowerCase() === 'desc' ? 'desc' : 'asc';
    } else {
      // Default sort by end date ascending (ending soonest first)
      query.orderBy.endDate = 'asc';
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
    const { title, description, imageUrl, startPrice, startDate, endDate } = req.body;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be in the future'
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Create auction
    const auction = await prisma.auction.create({
      data: {
        title,
        description,
        imageUrl,
        startPrice: parseFloat(startPrice),
        currentPrice: parseFloat(startPrice),
        startDate: start,
        endDate: end,
        status: start <= now ? 'ACTIVE' : 'PENDING',
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