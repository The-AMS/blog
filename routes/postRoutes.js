import express from 'express';
import { createPost, getPost, updatePost, deletePost, getAllPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validatePost } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/create', protect, validatePost, createPost);
router.get('/:id', getPost);
router.put('/:id', protect, validatePost, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/', getAllPosts);

export default router;