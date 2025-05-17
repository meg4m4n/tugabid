import express from 'express';
import { createBid, getAuctionBids } from '../controllers/bid.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBid);
router.get('/auction/:auctionId', getAuctionBids);

export default router;