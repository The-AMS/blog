import express from 'express';
import { getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUser);
router.put('/profile', protect, updateUser);
router.delete('/profile', protect, deleteUser);
router.get('/all', protect, admin, getAllUsers);

export default router;