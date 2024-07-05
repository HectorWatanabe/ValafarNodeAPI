import 'dotenv/config';

export const APP_PORT = process.env.APP_PORT || 4000;
export const APP_CORS = process.env.APP_CORS || 'http://localhost';

export const APP_TOKEN_SECRET = process.env.TOKEN_SECRET || 'my_secret_valafar_token';
export const APP_TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || '1h';
export const APP_TOKEN_REFRESH_SECRET = process.env.TOKEN_REFRESH_SECRET || 'my_secret_valafar_token_refresh';
export const APP_TOKEN_REFRESH_EXPIRES = process.env.TOKEN_REFRESH_EXPIRES || '7d';