import jwt from 'jsonwebtoken';
import { APP_TOKEN_SECRET } from '../config/dotenvConfig.js';
import { users } from '../models/user.js';

export const verifyToken = (req, res, next) => {
    const headerAuthorization = req.headers['authorization'];
    if (!headerAuthorization) return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    const token = headerAuthorization.split(' ')[1];
    jwt.verify(token, APP_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido.' });
        const user = users.find(u => u.username === decoded.username && u.accessToken === token);
        if (!user) return res.status(401).json({ message: 'Acceso denegado. Token revocado.' });
        req.user = decoded;
        next();
    });
};