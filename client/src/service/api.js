import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchWeatherData = async (city) => {
    if (!city) return null;

    try {
        const response = await axios.get(API_URL, {
            params: { city },
        });
        return response.data;
    } catch (err) {
        throw new Error("Cannot get weather data");
    }
};