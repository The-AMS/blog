import express from 'express';
import { addComment, getComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateComment } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/:postId', protect, validateComment, addComment);
router.get('/:id', getComment);
router.put('/:id', protect, validateComment, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;