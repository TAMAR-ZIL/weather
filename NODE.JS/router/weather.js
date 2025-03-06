import express from 'express';


import { getWeather } from '../controller/weather.js';  


// Initialize the express router for routing HTTP requests
const router = express.Router();

/**
 * Route to fetch weather data for a given city.
 * 
 * @route GET /weather
 * @param {string} city - The city name passed as a query parameter.
 * @returns {Object} - Returns the weather data as a JSON response, or an error message if something goes wrong.
 */
router.get('/weather', async (req, res) => {
  const city = req.query.city;  // Extract the city name from query parameters

  // If the city parameter is not provided, return a 400 error with a relevant message
  if (!city) {
    return res.status(400).json({ error: "נא לספק שם עיר" });
  }

  try {
    // Call the getWeather function to fetch weather data for the provided city
    const weatherData = await getWeather(city);  

    // If weather data is not available, return a 500 error
    if (!weatherData) {
      return res.status(500).json({ error: "לא ניתן לקבל נתוני מזג אוויר" });
    }

    // If successful, return the weather data as a JSON response
    res.json(weatherData);  

  } catch (error) {
    // Catch any unexpected errors and return a 500 server error
    res.status(500).json({ error: "שגיאה פנימית בשרת" });
  }
});

// Export the router for use in other parts of the application
export default router;
