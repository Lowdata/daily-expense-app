import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import { Expense } from '../model/expenses';
import { createUserFromEmail, isEmailInExpenses } from '../helper/unregisteredUser';
export const users: User[] = [];
export const expenses: Expense[] = []; 




export const register = async(
    email:string, 
    password:string, 
    name:string):Promise<User>=>{
    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) throw new Error('User already exists');

    // Check if the email is already in use in the expenses array as an unregistered participant
    const associatedInExpenses = isEmailInExpenses(email);

    let user:User;

    if(associatedInExpenses.length > 0){
        user = await createUserFromEmail(email, name, password);

        user.expenses = associatedInExpenses.map(expense => ({
            ...expense,
            participants: expense.participants.map(participant =>
                participant.email === email
                    ? { ...participant, userId: user.id } // Set userId for registered users
                    : participant
            ),
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt
        }));
        
    }
    else{
        user = await createUserFromEmail(email, name, password);
    }
    return user;
};


export const login = async (email: string, password: string): Promise<string> => {
    const user = users.find(user => user.email === email);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
    return token;
};

export const getUserDetails = async (email: string): Promise<User | undefined> => {
    return users.find(user => user.email === email);
};