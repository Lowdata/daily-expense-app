import { Request, Response } from "express";
import { addExpense } from "../services/expenseServices";


export const addExpenseController = async(
    req:Request,
    res: Response) => {
        const expenseData = req.body;
        try{
            const expenseId = addExpense(expenseData);
            res.status(201).json({id: expenseId})
        }catch(error){
            res.status(400).json({message: "Cannot add the expense",error})
        }
};