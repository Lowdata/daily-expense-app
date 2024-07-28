import { Router } from 'express';
import { registerUser, loginUser } from '../controller/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: "This is a protected route." });
});

export default router;