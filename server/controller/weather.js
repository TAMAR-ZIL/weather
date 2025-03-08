import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables (like API_KEY) securely from a .env file
dotenv.config();
// Define constants for the API key and the base API URL
const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = process.env.WEATHER_API_URL;

export const getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "Provide a city" });
  }
  try {
    if (!apiKey || !apiUrl) {
      console.error();
      return res.status(500).json("url and key are requierd");
    }
    const requestUrl = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;

    // Perform the asynchronous API request using axios
    const response = await axios.get(requestUrl);
    if (!response)
      return res.status(500).json({ error: "Failed provied weather data" });
    // Return the data from the API response
    return res.json(response.data);

  } catch (error) {
    return res.status(500).json({ error: "An internal server error" });
  }
}