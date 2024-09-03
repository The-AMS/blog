import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { error } from "console";

const app = express();

app.use(bodyParser.json());


dotenv.config();
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB Successfuly!")
        app.listen(port, () => {
            console.log(`Listening on Port ${port}`);
        })
    })
    .catch((error), () => {
        console.log(error)
    });
