import jwt from 'jsonwebtoken';
import { APP_TOKEN_EXPIRES, APP_TOKEN_REFRESH_EXPIRES, APP_TOKEN_REFRESH_SECRET, APP_TOKEN_SECRET } from '../config/dotenvConfig.js';

export const generateAccessToken = ({ id, username }) => {
    return jwt.sign({ id, username }, APP_TOKEN_SECRET, { expiresIn: APP_TOKEN_EXPIRES });
};

const generateRefreshToken = ({ id, username }) => {
    return jwt.sign({ id, username }, APP_TOKEN_REFRESH_SECRET, { expiresIn: APP_TOKEN_REFRESH_EXPIRES });
};

export const generateTokens = (user) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user)
    };
};