import express from 'express';
import { getForecast } from '../controllers/forecastController.js';

const router = express.Router();

router.get('/v1/forecast', getForecast);

export default router;
