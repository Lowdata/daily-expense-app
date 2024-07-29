import { Router } from 'express';
import { registerUser, loginUser, getUser } from '../controller/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

//user endpoints
router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUser); 

export default router;