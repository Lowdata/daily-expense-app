import { Router } from 'express';
import { registerUser, loginUser, getUser } from '../controller/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

//user endpoints

// create a user
router.post('/register',registerUser);
//login using email and password
router.post('/login', loginUser);
//get user details
router.get('/user', authMiddleware, getUser); 

export default router;