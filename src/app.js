import express from 'express';
import { APP_CORS } from './config/dotenvConfig.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config/swaggerConfig.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: APP_CORS,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/api/auth', authRoutes);

export default app;



