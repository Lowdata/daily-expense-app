import express from 'express';
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(express.json());

//authetication 
app.use('/auth', authRoutes)

app.get('/', (req,res)=>{
    res.send("Hello")
})

export default app;