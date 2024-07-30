import { expenses, users } from "./authServices";
import { Expense } from "../model/expenses";
import { generateUniqueId } from "../helper/uniqueId";
import { calculateAmounts } from "../middleware/expenseMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

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
export const addExpense = (expenseData: Expense, creatorId:string): string|undefined => {
    validateExpense(expenseData);
    calculateAmounts(expenseData);
    const expenseId = generateUniqueId();

    expenses.push({ ...expenseData, id: expenseId, createdAt: new Date(), updatedAt: new Date(), creatorId: creatorId });
    return expenseId;
};

// Service to retrieve individual user expenses
export const getUserExpenses = (userId: string): Expense[] => {
    return expenses.filter(expense => expense.participants.some(p => p.userId === userId));
};


// Service to retrieve overall expenses
export const getOverallExpenses = (): Expense[] => {
    return expenses;
};

// Service to generate balance sheet for a specific user
export const generateUserBalanceSheet = (userId: string, userEmail: string): { [key: string]: number } => {
    const balanceSheet: { [key: string]: number } = {};

    expenses.forEach(expense => {
        // Check if the user is the creator of the expense
        if (expense.creatorId === userId) {
            expense.participants.forEach(participant => {
                const participantId = participant.userId || participant.email;
                if (participantId) {
                    if (!balanceSheet[participantId]) {
                        balanceSheet[participantId] = 0;
                    }
                    balanceSheet[participantId] += participant.amountOwed || 0;
                }
            });
        }

        // Check if the user is a participant in the expense
        const userIsParticipant = expense.participants.some(p => p.userId === userId || p.email === userEmail);
        if (userIsParticipant) {
            const participant = expense.participants.find(p => p.userId === userId || p.email === userEmail);
            if (participant) {
                if (!balanceSheet[userId]) {
                    balanceSheet[userId] = 0;
                }
                balanceSheet[userId] -= participant.amountOwed || 0; 
            }
        }
    });

    return balanceSheet;
};