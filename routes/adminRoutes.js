import express from 'express';
import { getDashboardStats, manageUsers, managePosts } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/users', protect, admin, manageUsers);
router.get('/posts', protect, admin, managePosts);

export default router;