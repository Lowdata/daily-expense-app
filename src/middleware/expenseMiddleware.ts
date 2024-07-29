import { Expense } from "../model/expenses";


// Data Validation and Adjustment
const validateAndAdjustExpense = (expenseData: Expense) => {
    const totalAmount = expenseData.amount;

    if (expenseData.splitMethod === 'percentage') {
        const totalPercentage = expenseData.participants.reduce((sum, p) => sum + (p.percentage || 0), 0);
        if (totalPercentage !== 100) {
            throw new Error('Percentages must add up to 100%');
        }
        expenseData.participants.forEach(p => {
            p.amountOwed = (totalAmount * (p.percentage || 0)) / 100;
        });
    } else if (expenseData.splitMethod === 'exact') {
        const totalExactAmount = expenseData.participants.reduce((sum, p) => sum + (p.amountOwed || 0), 0);
        if (totalExactAmount !== totalAmount) {
            throw new Error('Exact amounts must add up to the total expense amount');
        }
    } else if (expenseData.splitMethod === 'equal') {
        const splitAmount = totalAmount / expenseData.participants.length;
        expenseData.participants.forEach(p => {
            p.amountOwed = splitAmount;
        });
    }
};