import { useState, useEffect } from "react";
import "./index.css";

const KEY = "6c251eec568a46dea19173345252610";

function App() {
  const [city, setCity] = useState("Chisinau");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
      const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`);

      if (!res.ok) {
        throw new Error(`Not valid city name ${res.status} ${res.statusText}`)
      }

      const data = await res.json();
      console.log(data);
      setWeatherData(data);
      } catch(err) {
        console.log(err)
        setError(err.message);
      }
    }
    getData();
  }, [])


  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">{error}Weather Widget</h1>
          <div className="search-container">
            <input type="text" placeholder="Enter city name" className="search-input" />
          </div>
        </div>
        <div className="weather-card">
          <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>
          <img src={weatherData?.current.condition.icon} alt="icon" className="weather-icon" />
          <p className="temperature">{Math.round(weatherData?.current.temp_c)}C</p>
          <p className="condition">{weatherData?.current.condition.text}</p>
          <div className="weather-details">
            <p>Humidity: {weatherData?.current.humidity}%</p>
            <p>Wind: {weatherData?.current.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
