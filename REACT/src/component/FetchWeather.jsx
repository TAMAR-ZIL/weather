import { useState, useEffect } from "react";
import { fetchWeatherData } from "../service/api.js";
import "../styles/global.css";
import "../styles/layout.css";
import "../styles/weatherCard.css";
import "../styles/responsive.css";

function FetchWeather({ city, setWeatherData, formatDateTime }) {
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!city) return;

        const fetchData = async () => {
            try {
                const data = await fetchWeatherData(city);
                setWeather(data);
                setWeatherData(data);
                setError("");
            } catch (err) {
                setWeather(null);
                setError(err.message);
            }
        };

        fetchData();
    }, [city, setWeatherData]);

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && weather.location && (
                <div className="right-side">
                    <div className="weather-card">
                        <div className="top-card">
                            <h2 className="location">{weather.location.region}</h2>
                            <p className="country">{weather.location.country}</p>
                            <p className="date-time">{formatDateTime(weather.location.localtime)}</p>
                        </div>
                        <div className="center-card">
                            <h1 className="temperature">{weather.current.temp_c}°</h1>
                            <p className="weather-status">{weather.current.condition.text}</p>
                        </div>
                        <div className="weather-stats">
                            <div className="weather-stats1">
                                <p className="wind">precipitation</p>
                                <p className="icon">{weather.current.precip_mm} mm</p>
                            </div>
                            <div className="weather-stats2">
                                <p className="wind">humidity</p>
                                <p className="icon">{weather.current.humidity}%</p>
                            </div>
                            <div className="weather-stats3">
                                <p className="wind">wind</p>
                                <p className="icon">{weather.current.wind_kph} km/h</p>
                            </div>
                        </div>
                        {weather.forecast &&
                        weather.forecast.forecastday &&
                        weather.forecast.forecastday[0] && (() => {
                            const forecastHours = weather.forecast.forecastday[0].hour;
                            const currentHour = new Date(weather.location.localtime).getHours();
                            const currentIndex = forecastHours.findIndex(
                                (hourData) => new Date(hourData.time).getHours() === currentHour
                            );
                            const selectedHours =
                                currentIndex !== -1
                                    ? forecastHours.slice(
                                          Math.max(currentIndex - 2, 0),
                                          Math.min(currentIndex + 2, forecastHours.length - 1) + 1
                                      )
                                    : forecastHours.slice(0, 5);
                            return (
                                <div className="hourly-forecast">
                                    <div className="hours-row">
                                        {selectedHours.map((hourData, index) => (
                                            <span key={index} className="hour">
                                                {new Date(hourData.time).getHours()}:00
                                            </span>
                                        ))}
                                    </div>
                                    <div className="temps-row">
                                        {selectedHours.map((hourData, index) => (
                                            <span key={index} className="temp">
                                                {hourData.temp_c}°
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </>
    );
}

export default FetchWeather;
