import express from 'express';
import { createCategory, getCategory, updateCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateCategory } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, validateCategory, createCategory);
router.get('/:id', getCategory);
router.put('/:id', protect, admin, validateCategory, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);
router.get('/', getAllCategories);

export default router;