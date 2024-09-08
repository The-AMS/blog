import { body, validationResult } from 'express-validator';

export const validatePost = [
    body('title').notEmpty().trim().isLength({ min: 3, max: 200 }),
    body('content').notEmpty().trim(),
    body('category').notEmpty().isMongoId(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Add more validation middleware for other routes as needed