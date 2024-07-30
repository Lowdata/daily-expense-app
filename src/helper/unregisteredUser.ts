import { expenses } from "../services/authServices";
import User from "../model/User";
import { generateUniqueId } from "./uniqueId";
import bcrypt from 'bcryptjs';
import { users } from "../services/authServices";
import { Expense } from "../model/expenses";

// check for unregistered participants in the bill
export const isEmailInExpenses = (email: string): Expense[] => {
    return expenses.filter(expense =>
        expense.participants.some(participant => participant.email === email)
    );
};


// create user from the email
export const createUserFromEmail = async (email: string, name: string, password: string): Promise<User>=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: generateUniqueId(),
        email,
        password: hashedPassword,
        name,
        expenses: []
    };
    users.push(newUser);
    return newUser;
};
