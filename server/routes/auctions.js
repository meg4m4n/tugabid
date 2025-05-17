import express from 'express';
import { 
  getAuctions, 
  getAuction, 
  createAuction
} from '../controllers/auction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAuctions);
router.get('/:id', getAuction);
router.post('/', protect, createAuction);

export default router;