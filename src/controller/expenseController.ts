import { Request, Response } from "express";
import { addExpense } from "../services/expenseServices";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Expense } from "../model/expenses";


export const addExpenseController = async (req: AuthenticatedRequest, res: Response) => {
    const expenseData:Expense = req.body;
    try {
        // Ensure user information is available
        if (!req.user) {
            throw new Error('User information is missing');
        }

        // Add the user as a participant if not already included
        const userIsParticipant = expenseData.participants.some(p => p.userId === req.user.id);
        if (!userIsParticipant) {
            expenseData.participants.push({
                userId: req.user.id,
                amountOwed: 0
            });
        }

        const expenseId = addExpense(expenseData);
        res.status(201).json({ id: expenseId, message: "Expense recorded Successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};