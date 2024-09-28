import { body, validationResult } from 'express-validator';

export const validatePost = [
    body('title').notEmpty().trim().isLength({ min: 3, max: 200 }),
    body('content').notEmpty().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateCategory = [
    body('name').notEmpty().trim().isLength({ min: 3, max: 200 }),
    body('content').notEmpty().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateComment = [
    body('content').notEmpty().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]