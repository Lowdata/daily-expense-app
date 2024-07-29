import { Router } from 'express';
import { addExpenseController } from '../controller/expenseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authMiddleware,addExpenseController);


export default router;