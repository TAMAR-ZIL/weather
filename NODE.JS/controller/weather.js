import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables (like API_KEY) securely from a .env file
dotenv.config();
// Define constants for the API key and the base API URL
const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = process.env.WEATHER_API_URL;
/**
 * Fetches weather data for a specific city using the Weather API.
 * 
 * @param {string} city - The name of the city for which weather data is requested.
 * @returns {Object|null} - Returns the weather data if successful, or null in case of errors or missing API key.
 */
export const getWeather = async (city) => {
  try {
    // Check if the API_KEY is available, return null if missing
    if (!apiKey||!apiUrl) {
      console.error("url and key are required");
      return null;
    }

    // Construct the full request URL with the city, API key, and query parameters
    const requestUrl = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;

    // Perform the asynchronous API request using axios
    const response = await axios.get(requestUrl);

    // Return the data from the API response
    return response.data;

  } catch (error) {
    // In case of an error (e.g., network failure or invalid response), return null
    return null;
  }
}