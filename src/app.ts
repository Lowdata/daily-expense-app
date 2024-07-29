import express from 'express';
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes';

dotenv.config();


const app = express();
app.use(express.json());

//authetication and user  
app.use('/auth', authRoutes)

//expenses
app.use('/expenses', expenseRoutes)
app.get('/', (req,res)=>{
    res.send("Hello")
})

// Middleware to handle invalid endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Invalid endpoint' });
});
export default app;