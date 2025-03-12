// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import SkeletonWeather from "./components/skeletonWeather"; // Componente skeleton
import FallbackMap from "./components/FallbackMap"; // Componente para búsqueda de ubicación
import { thunderstorm, rain, drizzle, clouds, clear, snow, atmosphere } from "../public";

const API_KEY = "620494b4ac3504341ca873a822c28566";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const climate_codes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804],
};

const climate_icons = {
  thunderstorm,
  drizzle,
  rain,
  snow,
  atmosphere,
  clear,
  clouds,
};

function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Intentamos obtener la ubicación automáticamente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCoords({ lat: coords.latitude, lon: coords.longitude });
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Sorry, there was an unknown error. Can you tell us what city you are located in?.");
        }
      );
    } else {
      setError("Geolocation not supported by the browser.");
    }
  }, []);

  useEffect(() => {
    if (coords) {
      axios
        .get(
          `${BASE_URL}lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=es&appid=${API_KEY}`
        )
        .then((res) => {
          const idCode = res.data.weather[0].id;
          const keys = Object.keys(climate_codes);
          const iconKey = keys.find((key) => climate_codes[key].includes(idCode));

          setWeather({
            city: res.data.name,
            country: res.data.sys.country,
            temp: res.data.main.temp,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
            icon: climate_icons[iconKey] || clear,
            humidity: res.data.main.humidity,
            description: res.data.weather[0].description,
            wind_speed: res.data.wind.speed,
            clouds: res.data.clouds.all,
            pressure: res.data.main.pressure,
          });
        })
        .catch((err) => {
          console.error("Error getting weather:", err);
          setError("Tell us what city you are from.");
        });
    }
  }, [coords]);

  // Si hay error y no hay coordenadas, mostramos el FallbackMap
  if (error && !coords) {
    return <FallbackMap setCoords={setCoords} error={error} />;
  }

  // Mientras no se carguen los datos del clima, mostramos el Skeleton
  if (!weather) {
    return <SkeletonWeather />;
  }

  return (
    <div>
      <Weather weather={weather} />
    </div>
  );
}

export default App;
