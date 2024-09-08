import express from 'express';
import { addReaction, removeReaction, getReactions } from '../controllers/reactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:postId', protect, addReaction);
router.delete('/:postId', protect, removeReaction);
router.get('/:postId', getReactions);

export default router;