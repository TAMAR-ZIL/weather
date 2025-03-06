import React from "react";
import "./App.css"; // Importing the CSS file for styling
import FetchWeather from "./FetchWeather"; // Importing the FetchWeather component
import Home from "./Home"; // Importing the Home component

function App() {
  return (
    <>
      <Home />          {/* Display the Home component */}
      <FetchWeather />  {/* Display the FetchWeather component */}
    </>
  );
}

export default App;
