import express from 'express';
import { 
  getAuctions, 
  getAuction, 
  createAuction, 
  updateAuction, 
  deleteAuction 
} from '../controllers/auction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAuctions);
router.get('/:id', getAuction);
router.post('/', protect, createAuction);
router.put('/:id', protect, updateAuction);
router.delete('/:id', protect, deleteAuction);

export default router;