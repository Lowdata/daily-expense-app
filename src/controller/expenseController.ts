import { Request, Response } from "express";
import { addExpense, generateUserBalanceSheet, getOverallExpenses, getUserExpenses } from "../services/expenseServices";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Expense } from "../model/expenses";
import {parse} from 'json2csv';
import { expenses, users } from "../services/authServices";

export const addExpenseController = async (req: AuthenticatedRequest, res: Response) => {
    const expenseData:Expense = req.body;
    try {
        const creatorEmail = req.user.email;
        const creator = users.find(u => u.email == creatorEmail);
        const creatorId = creator?.id
        if (!creatorId) { return res.status(400).json({ message: "error" }) }
        const expenseData = req.body;
        const expenseId = addExpense(expenseData,creatorId);
        const expense = expenses.find(exp => exp.id === expenseId);
        if (!expense) {
            throw new Error('Expense not found');
        }

        const user = users.find(u => u.id === creatorId);
        if (user) {
            if (!user.expenses) {
                user.expenses = [];
            }
            user.expenses.push(expense);
        } else {
            throw new Error('User not found');
        }
        res.status(201).json({ id: expenseId, message: "Expense recorded Successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};


// Retrieve individual user expenses
export const getUserExpensesController = (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const userExpenses = getUserExpenses(userId);
        res.status(200).json(userExpenses);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

// Retrieve overall expenses
export const getOverallExpensesController = (req: Request, res: Response) => {
    try {
        const overallExpenses = getOverallExpenses();
        res.status(200).json(overallExpenses);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};


// Controller to handle balance sheet download
export const downloadBalanceSheetController = (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const userEmail = req.user.email;

        const balanceSheet = generateUserBalanceSheet(userId, userEmail);

        const fields = ['User', 'Amount Owed'];
        const csvData = Object.entries(balanceSheet).map(([user, amountOwed]) => ({
            User: user,
            'Amount Owed': amountOwed
        }));

        const csv = parse(csvData, { fields });

        res.header('Content-Type', 'text/csv');
        res.attachment('balance-sheet.csv');
        res.send(csv);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};