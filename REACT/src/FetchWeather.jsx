import { useState, useEffect } from "react";
import axios from "axios";

function FetchWeather({ city, setWeatherData, formatDateTime }) {
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);

    // Fetch weather data whenever the city changes
    useEffect(() => {
        if (!city) return; // If no city is provided, don't fetch data
        
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/weather", {
                    params: { city },
                });
                console.log("Response from server:", response.data);
                setWeather(response.data);
                setWeatherData(response.data);
                setError("");
            } catch (err) {
                console.error(err);
                setWeather(null);
                setError("לא ניתן לקבל נתוני מזג אוויר.");
            }
        };
        
        fetchData();
    }, [city, setWeatherData]);

    return (
        <div className="right-side">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && weather.location && (
                <div className="weather-card">
                    <h2 className="location">{weather.location.region}</h2>
                    <p className="country">{weather.location.country}</p>
                    <p className="date-time">{formatDateTime(weather.location.localtime)}</p>
                    <h1 className="temperature">{weather.current.temp_c}°</h1>
                    <p className="weather-status">{weather.current.condition.text}</p>
                    <div className="weather-stats">
                        <p className="line-1">precipitation</p>
                        <p className="line-1">humidity</p>
                        <p className="line-1">wind</p>
                        <p className="line-2">{weather.current.precip_mm} mm</p>
                        <p className="line-2">{weather.current.humidity}%</p>
                        <p className="line-2">{weather.current.wind_kph} km/h</p>
                    </div>
                    {weather.forecast && weather.forecast.forecastday && weather.forecast.forecastday[0] && (
                        <div className="hourly-forecast">
                            <div className="hours-row">
                                {weather.forecast.forecastday[0].hour.slice(0, 4).map((hourData, index) => (
                                    <span key={index} className="hour">{new Date(hourData.time).getHours()}:00</span>
                                ))}
                            </div>
                            <div className="temps-row">
                                {weather.forecast.forecastday[0].hour.slice(0, 4).map((hourData, index) => (
                                    <span key={index} className="temp">{hourData.temp_c}°</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FetchWeather;
