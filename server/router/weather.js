import express from 'express';
import { getWeather } from '../controller/weather.js';

// Initialize the express router for routing HTTP requests
const router = express.Router();
router.get('/weather', getWeather)
export default router;
