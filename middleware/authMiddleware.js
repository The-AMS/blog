import jwt from 'jsonwebtoken';
import User from '../models/userModel';

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Require Admin Role!' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


