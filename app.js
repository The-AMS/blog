import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { error } from "console";
// routers 
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
// import commentRoutes from './routes/commnetRoutes.js';
// import reactionRoutes from './routes/reactionRoute.js';
// import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

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

//app.use('/api/', );
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/posts', authRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/reaction', reactionRoutes);
