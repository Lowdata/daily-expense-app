import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import { tokenToString } from 'typescript';

const users: User[] = [];

export const register = async(
    email:string, 
    password:string, 
    name:string):Promise<User>=>{

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = {email, password:hashedPassword,name};
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