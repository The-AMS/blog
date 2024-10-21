import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setAsync, delAsync } from '../app.js';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            const token = generateToken(user._id);
            await setAsync(`auth_${token}`, JSON.stringify(user), 'EX', 86400); //expire in 24 hours

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: token,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            await setAsync(`auth_${token}`, JSON.stringify(user), 'EX', 86400);//expire in 24 hours

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            await delAsync(`auth_${token}`);
        }
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: `Logout failed`, error: error.message });
    }

};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};










