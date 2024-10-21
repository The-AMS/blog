import jwt from 'jsonwebtoken';
import { getAsync } from '../app.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from Redis
            const userJson = await getAsync(`auth_${token}`)
            if (!userJson) {
                return res.status(401).json({ message: 'Not authorized, session expired' })
            }
            req.user = JSON.parse(userJson);

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
