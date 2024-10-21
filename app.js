import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { error } from "console";
import redis from 'redis'
import { promisify } from 'util';

// routers   
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import postRoutes from './routes/postRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reactionRoutes from './routes/reactionRoute.js';
import commentRoutes from './routes/commnetRoutes.js';

const app = express();
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

// MongoDB setup 
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB Successfuly!")
        app.listen(PORT, () => {
            console.log(`Listening on Port ${PORT}`);
        })
    })
    .catch((error), () => {
        console.log(error)
    });

// Redis setup 
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

// Error Handling and Connection    
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

// Promisify Redis methods
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);
export const delAsync = promisify(redisClient.del).bind(redisClient);

// API endpoinst 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/reaction', reactionRoutes);
app.use('/api/comment', commentRoutes);
