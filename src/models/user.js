import bcrypt from 'bcryptjs';

export const users = [
    {
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        accessToken: null,
        refreshToken: null,
    }
];