import config from './config.js'; // Load environment variables at the very beginning
import logger from './utils/logger.js';
import express from 'express';
import standardizedResponse from './middlewares/standardResponseMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';
import meteoRoute from './routes/meteoRoute.js';
import { swaggerSetup } from './swagger.js';
import authenticateToken from './middlewares/auth.js';
logger.info('Service is starting...');

const app = express();
const port = config.backendPort;
swaggerSetup(app);

app.use(express.json());
app.use(standardizedResponse);
app.use(authenticateToken);

app.use('/api', meteoRoute);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  logger.info(`API documentation is available at http://localhost:${port}/api-docs`);
  logger.debug('Debugging is enabled');
  logger.info('Service has started successfully');
});

export default app;
