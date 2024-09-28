import express from 'express';
import { addComment, getComment, getAllComments, updateComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateComment } from '../middleware/validationMiddleware.js';

const router = express.Router();

//
router.post('/:postId', validateComment, protect, addComment);
router.get('/:id', getComment);
router.get('/', getAllComments);
router.put('/:id', validateComment, protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;