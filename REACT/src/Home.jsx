import FetchWeather from "./FetchWeather";
import { useState } from "react";
import FintaxImage from "./FintaxImage";

const Home = () => {
    const [city, setCity] = useState("");
    const [submittedCity, setSubmittedCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = () => {
        setSubmittedCity(city);
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return "";

        const [datePart, timePart] = dateTimeString.split(" ");
        const [year, month, day] = datePart.split("-"); // Splitting date part into day, month, and year
        return `${day}/${month}/${year} at ${timePart}`; // Format it as desired
    };

    return (
        <div className="container">
            <div className="left-side">
                <FintaxImage />
                <h1>Use our weather app <br />to see the weather<br />around the world</h1>
                <div className="search-area">
                    <label className="input-text" htmlFor="enter-a-city">City name</label>
                    <div className="search-wrapper">
                        <input id="enter-a-city" type="text" onChange={(e) => setCity(e.target.value)} />
                        <input className="check-button" type="button" value="Check" onClick={handleSubmit} />
                    </div>
                    {weatherData && (
                        <div className="coordinates">
                            <p>Latitude: {weatherData.location.lat} Longitude: {weatherData.location.lon}</p>
                            <p>Accurate to: {formatDateTime(weatherData.location.localtime)}</p>
                        </div>
                    )}
                </div>
            </div>

            {submittedCity && <FetchWeather city={submittedCity} setWeatherData={setWeatherData} formatDateTime={formatDateTime} />}
        </div>
    );
};

export default Home;
