import express from 'express';
import { uploadImage, getImage, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.get('/:filename', getImage);
router.delete('/:filename', protect, deleteImage);

export default router;