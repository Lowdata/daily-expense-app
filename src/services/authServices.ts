import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import { Expense } from '../model/expenses';

const users: User[] = [];
const expenses: Expense[] = []; 
//generate uniqueId for the user
const generateUniqueId = (): string => {
    return Math.random().toString(36).slice(2, 9);
};


export const register = async(
    email:string, 
    password:string, 
    name:string):Promise<User>=>{
    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { id: generateUniqueId(), email, password: hashedPassword, name, expenses: [] };
    users.push(newUser);
    return newUser;
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