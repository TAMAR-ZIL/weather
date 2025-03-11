import { useState, useEffect } from "react";
import { fetchWeatherData } from "../service/api.js";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/weatherCard.css";
import "../styles/responsive.css";

function FetchWeather({ city, weatherData, setWeatherData, formatDateTime }) {
    const [error, setError] = useState("");

    useEffect(() => {
        if (!city) return;

        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(city);
                setWeatherData(data);
                setError("");
            } catch (err) {
                setError(err.message);
                setWeatherData(null);
            }
        };

        fetchData();
    }, [city, setWeatherData]);

    const Hours = () => {
        const forecastHours = weatherData.forecast.forecastday[0].hour;
        const currentHour = new Date(weatherData.location.localtime).getHours();
        const currentIndex = forecastHours.findIndex(
            (hourData) => new Date(hourData.time).getHours() === currentHour
        );

        let selectedHours = [];
        if (currentIndex !== -1) {
            selectedHours = forecastHours.slice(
                Math.max(currentIndex - 2, 0),
                Math.min(currentIndex + 2, forecastHours.length - 1) + 1
            );
            if (currentHour >= 22) {
                const nextDayHours = weatherData.forecast.forecastday[1]?.hour || [];
                selectedHours = [
                    ...selectedHours,
                    ...nextDayHours.slice(0, 5 - selectedHours.length) // add hours from next day
                ];
            }

        } else {
            selectedHours = forecastHours.slice(0, 5);
        }

        return (
            <div className="hourly-forecast">
                <div className="hours-row">
                    {selectedHours.map((hourData, index) => {
                        let hour = new Date(hourData.time).getHours();
                        if (hour >= 12) {
                            hour = hour - 12;
                        }
                        return (
                            <span key={index} className="hour">
                                {hour}:00
                            </span>
                        );
                    })}
                </div>
                <div className="temps-row">
                    {selectedHours.map((hourData, index) => (
                        <span key={index} className="temp">
                            {Math.round(hourData.temp_c)}°
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weatherData && weatherData.location && (
                <div className="right-side">
                    <div className="weather-card">
                        <div className="top-card">
                            <h2 className="location">{weatherData.location.region}</h2>
                            <p className="country">{weatherData.location.country}</p>
                            <p className="date-time">{formatDateTime(weatherData.location.localtime)}</p>
                        </div>
                        <div className="center-card">
                            <h1 className="temperature">{Math.round(weatherData.current.temp_c)}°</h1>
                            <p className="weather-status">{weatherData.current.condition.text}</p>
                        </div>
                        <div className="weather-stats">
                            <div className="weather-stats1">
                                <p className="wind">precipitation</p>
                                <p className="icon">{weatherData.current.precip_mm} mm</p>
                            </div>
                            <div className="weather-stats2">
                                <p className="wind">humidity</p>
                                <p className="icon">{weatherData.current.humidity}%</p>
                            </div>
                            <div className="weather-stats3">
                                <p className="wind">wind</p>
                                <p className="icon">{weatherData.current.wind_kph} km/h</p>
                            </div>
                        </div>
                        {weatherData.forecast &&
                            weatherData.forecast.forecastday &&
                            weatherData.forecast.forecastday[0] && <Hours />}
                    </div>
                </div>
            )}
        </>
    );
}

export default FetchWeather;
