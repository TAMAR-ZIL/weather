import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './router/weather.js';

// Load environment variables (like PORT) securely from a .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to allow cross-origin resource sharing (CORS) for the app
app.use(cors()); // Enable CORS to allow requests from different origins

// Use the weatherRouter to handle weather-related routes
app.use(weatherRouter);

// Define the port the server will listen on, defaulting to 5000 if not specified in the environment
const port = process.env.PORT || 5000;

// Start the server and log a message to indicate it's running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
