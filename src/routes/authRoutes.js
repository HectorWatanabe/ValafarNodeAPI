import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyTokenMiddleware.js';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/refresh-token', verifyToken, refreshToken);
authRoutes.post('/logout', verifyToken, logout);

export default authRoutes;