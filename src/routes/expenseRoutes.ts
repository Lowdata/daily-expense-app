import { Router } from 'express';
import { addExpenseController, downloadBalanceSheetController, getOverallExpensesController, getUserExpensesController } from '../controller/expenseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.post('/add', authMiddleware, addExpenseController);
router.get('/user', authMiddleware, getUserExpensesController);
router.get('/overall', getOverallExpensesController);
router.get('/balance-sheet', authMiddleware, downloadBalanceSheetController);


export default router;