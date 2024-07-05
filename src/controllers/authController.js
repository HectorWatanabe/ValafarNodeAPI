import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_TOKEN_EXPIRES, APP_TOKEN_REFRESH_SECRET } from "../config/dotenvConfig.js";
import { users } from "../models/user.js";
import { generateAccessToken, generateTokens } from '../helpers/jwtHelper.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ message: 'Error con las credenciales.' });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'Error con las credenciales.' });

    const { accessToken, refreshToken } = generateTokens(user);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    res.json({ accessToken, refreshToken, expiresIn: APP_TOKEN_EXPIRES, tokenType: 'Bearer' });
};

export const refreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Refresh token no proporcionado.' });

    jwt.verify(refreshToken, APP_TOKEN_REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Refresh token inválido.' });
        const user = users.find(u => u.username === decoded.username);
        if (!user) return res.status(401).json({ message: 'Acceso denegado.' });
        const accessToken = generateAccessToken(decoded);
        user.accessToken = accessToken;
        res.json({ accessToken: accessToken });
    });
};

export const logout = async (req, res) => {
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(401).json({ message: 'Acceso denegado. Token revocado.' });
    user.accessToken = null;
    user.refreshToken = null;
    res.json({ message: 'Logout exitoso.' });
};