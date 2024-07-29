import { expenses } from "./authServices";
import { Expense } from "../model/expenses";
import { generateUniqueId } from "../helper/uniqueId";
import { calculateAmounts } from "../middleware/expenseMiddleware";

// Data Validation
const validateExpense = (expenseData: Expense) => {
    const totalAmount = expenseData.amount;

    if (expenseData.splitMethod === 'percentage') {
        const totalPercentage = expenseData.participants.reduce((sum, p) => sum + (p.percentage || 0), 0);
        if (totalPercentage !== 100) {
            throw new Error('Percentages must add up to 100%');
        }
    } else if (expenseData.splitMethod === 'exact') {
        const totalExactAmount = expenseData.participants.reduce((sum, p) => sum + (p.amountOwed || 0), 0);
        if (totalExactAmount !== totalAmount) {
            throw new Error('Exact amounts must add up to the total expense amount');
        }
    }
};


//service to add an expense
export const addExpense = (expenseData: Expense): string|undefined => {
    validateExpense(expenseData);
    calculateAmounts(expenseData);
    const expenseId = generateUniqueId();

    expenses.push({ ...expenseData, id: expenseId, createdAt: new Date(), updatedAt: new Date() });

    return expenseId;
};

