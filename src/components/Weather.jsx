import { useState, useEffect } from "react";
import { thunderstorm, nubes, clear, snow, mountains } from "../assets";
import "./Weather.css";
import windSound from "../assets/soplido.mp3";
import SkeletonWeather from './skeletonWeather';

const backgrounds = [thunderstorm, nubes, clear, snow, mountains ];

function Weather({ weather }) {
  const [tempUnit, setTempUnit] = useState("C");
  const [bgIndex, setBgIndex] = useState(0);
  const convertToF = (tempC) => ((tempC * 9) / 5 + 32).toFixed(1);

  const handleClick = () => {
    // Reproduce el sonido al hacer click
    const audio = new Audio(windSound);
    audio.play();
  }

  // Cambia el fondo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!weather) {
    return <SkeletonWeather />;
  }

  return (
    <div className="background-container">
      {/* Div que muestra el fondo, se re-renderiza con key para activar la animación */}
      <div
        key={bgIndex}
        className="background-image"
        style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
      ></div>

      {/* Tarjeta del clima */}
      <div className="weather-card">
        <h1 className="weather-title">Weather App</h1>
        <p className="weather-location">
          {weather.city}, {weather.country}
        </p>
        <div>
          <img
            className="weather-icon"
            src={weather.icon}
            alt="Weather Icon"
          />
        </div>
        <h2 className="weather-description">"{weather.description}"</h2>
        <ul className="weather-list">
          <li>
            Humedad: <strong>{weather.humidity}%</strong>
          </li>
          <li>
            Viento: <strong>{weather.wind_speed} m/s</strong>
          </li>
          <li>
            Nubosidad: <strong>{weather.clouds}%</strong>
          </li>
          <li>
            Presión: <strong>{weather.pressure} hPa</strong>
          </li>
        </ul>
        {/* Solo se muestran los grados (principal) encima del botón */}
        <div className="weather-main-temp">
          {tempUnit === "C"
            ? `${weather.temp} °C`
            : `${convertToF(weather.temp)} °F`}
        </div>
        <button
          className="weather-button"
          onClick={() => { handleClick(); setTempUnit(tempUnit === "C" ? "F" : "C"); }}
        >
          {tempUnit === "C"
            ? "Change to °Fahrenheit"
            : "Change to °Celsius"}
        </button>
      </div>
    </div>
  );
}

export default Weather;
