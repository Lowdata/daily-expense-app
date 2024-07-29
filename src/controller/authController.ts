import { Request, Response } from 'express';
import { register, login, getUserDetails } from '../services/authServices';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
        const newUser = await register(email, password, name);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error: Cannot register the user",error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: "Error: Cannot Login the user", error });
    }
};


export const getUser = async (req: AuthenticatedRequest, res: Response) => {
    const { email } = req.user!;
    try {
        const user = await getUserDetails(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error: Cannot retrieve the user", error });
    }
};