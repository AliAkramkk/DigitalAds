import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';   
import connectDB from './config/db.js';


const app = express();
dotenv.config();    
connectDB();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


