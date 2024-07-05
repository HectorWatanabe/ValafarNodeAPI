import app from './app.js';
import { APP_PORT } from './config/dotenvConfig.js';

app.listen(APP_PORT, () => console.log(`Server running on port ${APP_PORT}`));