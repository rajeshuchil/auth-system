import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

const _filename = fileURLToPath(import.meta.url);
const _dirname= path.dirname(_filename);

app.use('/api',authRoutes);

app.use(express.static(path.join(_dirname,'public')));

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`The server is running on http://localhost:${PORT}`);
})

