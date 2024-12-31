// server.js

import express from 'express';
import dotenv from 'dotenv';
import standardizedResponse from './middlewares/standardResponseMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';
import meteoRoute from './routes/meteoRoute.js';
import { swaggerSetup } from './swagger.js';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(standardizedResponse);

app.use('/api', meteoRoute);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(errorHandler);

swaggerSetup(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API documentation is available at http://localhost:${port}/api-docs`);
});

export default app;
