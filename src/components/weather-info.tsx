import { Wind, Droplets, MapPin, Sunrise, Sunset, Sun } from "lucide-react";
import { WeatherCard } from "@/components/weather-card";

type WeatherData = {
  main?: { temp: number; humidity: number };
  wind?: { speed: number; deg: number };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: number; lat: number };
  name?: string;
  weather?: { main: string; description: string }[];
};

type WeatherInfoProps = {
  weatherData: WeatherData;
};

export function WeatherInfo({ weatherData }: WeatherInfoProps) {
  const sunriseTimestamp = weatherData.sys?.sunrise ?? 0;
  const sunsetTimestamp = weatherData.sys?.sunset ?? 0;

  const sunrise = new Date(sunriseTimestamp * 1000);
  const sunset = new Date(sunsetTimestamp * 1000);

  // Calcular dawn (30 minutos antes del amanecer) y dusk (30 minutos después del atardecer)
  const dawnTimestamp = sunriseTimestamp ? sunriseTimestamp - 30 * 60 : 0;
  const duskTimestamp = sunsetTimestamp ? sunsetTimestamp + 30 * 60 : 0;
  const dawn = new Date(dawnTimestamp * 1000);
  const dusk = new Date(duskTimestamp * 1000);

  const dawnHours = dawnTimestamp ? dawn.getHours() : "...";
  const dawnMinutes = dawnTimestamp
    ? String(dawn.getMinutes()).padStart(2, "0")
    : "...";
  const duskHours = duskTimestamp ? dusk.getHours() : "...";
  const duskMinutes = duskTimestamp
    ? String(dusk.getMinutes()).padStart(2, "0")
    : "...";

  const temp = weatherData.main?.temp
    ? (weatherData.main.temp - 273.15).toFixed(1)
    : "...";

  const sunriseHours = sunriseTimestamp ? sunrise.getHours() : "...";
  const sunriseMinutes = sunriseTimestamp
    ? String(sunrise.getMinutes()).padStart(2, "0")
    : "...";
  const sunsetHours = sunsetTimestamp ? sunset.getHours() : "...";
  const sunsetMinutes = sunsetTimestamp
    ? String(sunset.getMinutes()).padStart(2, "0")
    : "...";

  // Velocidad y dirección del viento
  const windSpeed = weatherData.wind?.speed ?? 0;
  const windDeg = weatherData.wind?.deg ?? 0;
  const getWindDirection = (deg: number) => {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest",
    ];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };
  const windDirection = getWindDirection(windDeg);
  const windDescription =
    windSpeed < 1
      ? "Calm"
      : windSpeed < 5
      ? "Light breeze"
      : windSpeed < 12
      ? "Moderate breeze"
      : "Strong wind";
  const windProgress = Math.min((windSpeed / 20) * 100, 100);

  // Humedad
  const humidity = weatherData.main?.humidity ?? 0;
  const humidityDescription =
    humidity < 30
      ? "Low moisture content in air"
      : humidity < 60
      ? "Moderate moisture content in air"
      : "High moisture content in air";
  const humidityProgress = humidity;

  // Descripción del clima
  const weatherDescription = weatherData.weather?.[0]?.description || "Unknown";

  // Calcular el Weather Rating
  const tempValue = temp !== "..." ? parseFloat(temp) : 0; // Convertimos temp a número
  const tempScore = (tempValue / 40) * 5; // Ahora tempValue es un número
  const humidityScore = (1 - Math.abs(humidity - 50) / 50) * 3; // humidity ya es un número
  const windScore = (1 - windSpeed / 20) * 2; // windSpeed ya es un número
  const weatherRatingNumber = Math.min(
    Math.max(tempScore + humidityScore + windScore, 0),
    10
  );
  const weatherRating = weatherRatingNumber.toFixed(1); // Convertimos a string con 1 decimal
  const weatherRatingProgress = (weatherRatingNumber / 10) * 100; // Usamos el número directamente
  const weatherRatingDescription =
    weatherRatingNumber < 3
      ? "Poor day for outdoor activities"
      : weatherRatingNumber < 7
      ? "Moderate day for outdoor activities"
      : "Good day for outdoor activities";

  // Asegurarnos de que sunriseHours y sunsetHours sean números para las comparaciones
  const sunriseDescription =
    typeof sunriseHours === "number" && sunriseHours < 6
      ? "Early morning sunrise"
      : "Morning sunrise";
  const sunsetDescription =
    typeof sunsetHours === "number" && sunsetHours < 18
      ? "Early afternoon sunset"
      : "Evening sunset";

  return (
    <div className="mb-8 px-4 md:px-8">
      <h3 className="text-sm text-gray-500 mb-2">Current</h3>
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* City and Temperature Card */}
        <div className="bg-white rounded-3xl shadow-sm p-6 w-full md:w-1/3">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-1">
              {weatherData.name || "City"},{" "}
              {weatherData.sys?.country || "Country"}
            </h2>
            <p className="text-5xl font-bold mb-4">{temp}°</p>
            <p className="text-gray-600 capitalize">{weatherDescription}</p>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-2/3">
          {/* Wind Speed Card */}
          <WeatherCard
            title="Wind Speed"
            value={`${windSpeed} m/s`}
            description={`${windDescription} from ${windDirection.toLowerCase()}`}
            icon={Wind}
            progress={{
              value: windProgress,
              minLabel: "Low",
              maxLabel: "High",
              color: "bg-blue-500",
            }}
          />

          {/* Humidity Card */}
          <WeatherCard
            title="Humidity"
            value={`${humidity}%`}
            description={humidityDescription}
            icon={Droplets}
            progress={{
              value: humidityProgress,
              minLabel: "Dry",
              maxLabel: "Humid",
              color: "bg-blue-500",
            }}
          />

          {/* Coordinates Card */}
          <WeatherCard
            title="Coordinates"
            value=""
            description={
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-500">Longitude</p>
                  <p className="font-bold">{weatherData.coord?.lon || "..."}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Latitude</p>
                  <p className="font-bold">{weatherData.coord?.lat || "..."}</p>
                </div>
              </div>
            }
            icon={MapPin}
          />

          {/* Sunrise Card */}
          <WeatherCard
            title="Sunrise"
            value={
              sunriseTimestamp ? `${sunriseHours}:${sunriseMinutes}` : "..."
            }
            description={sunriseDescription}
            icon={Sunrise}
            extraInfo={{
              label: `Dawn begins at ${dawnHours}:${dawnMinutes}`,
              dotColor: "bg-orange-500",
            }}
          />

          {/* Sunset Card */}
          <WeatherCard
            title="Sunset"
            value={sunsetTimestamp ? `${sunsetHours}:${sunsetMinutes}` : "..."}
            description={sunsetDescription}
            icon={Sunset}
            extraInfo={{
              label: `Dusk ends at ${duskHours}:${duskMinutes}`,
              dotColor: "bg-orange-500",
            }}
          />

          {/* Weather Rating Card */}
          <WeatherCard
            title="Weather Rating"
            value={weatherRating} // weatherRating ya es un string
            description={weatherRatingDescription}
            icon={Sun}
            progress={{
              value: weatherRatingProgress,
              minLabel: "Poor",
              maxLabel: "Excellent",
              color: "bg-yellow-500",
            }}
          />
        </div>
      </div>
    </div>
  );
}
