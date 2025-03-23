import { Wind, Droplets, MapPin, Sunrise, Sunset, Sun } from "lucide-react";
import { WeatherCard } from "@/components/weather-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type WeatherData = {
  main?: { temp: number; humidity: number };
  wind?: { speed: number; deg: number };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: number; lat: number };
  name?: string;
  weather?: { main: string; description: string }[];
};

const getTime = (timestamp: number) => {
  if (!timestamp) return { hours: "...", minutes: "..." };
  const date = new Date(timestamp * 1000);
  return {
    hours: date.getHours(),
    minutes: String(date.getMinutes()).padStart(2, "0"),
  };
};

const getWindDirection = (deg: number) =>
  [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ][Math.round(deg / 45) % 8];

export const WeatherInfo = ({ weatherData }: { weatherData: WeatherData }) => {
  const { sunrise = 0, sunset = 0 } = weatherData.sys ?? {};
  const { hours: sunriseHours, minutes: sunriseMinutes } = getTime(sunrise);
  const { hours: sunsetHours, minutes: sunsetMinutes } = getTime(sunset);
  const { hours: dawnHours, minutes: dawnMinutes } = getTime(
    sunrise ? sunrise - 30 * 60 : 0
  );
  const { hours: duskHours, minutes: duskMinutes } = getTime(
    sunset ? sunset + 30 * 60 : 0
  );

  const temp = weatherData.main?.temp
    ? (weatherData.main.temp - 273.15).toFixed(1)
    : "...";
  const windSpeed = weatherData.wind?.speed ?? 0;
  const windDirection = getWindDirection(weatherData.wind?.deg ?? 0);
  const windDesc =
    windSpeed < 1
      ? "Calm"
      : windSpeed < 5
      ? "Light breeze"
      : windSpeed < 12
      ? "Moderate breeze"
      : "Strong wind";
  const humidity = weatherData.main?.humidity ?? 0;
  const humidityDesc =
    humidity < 30
      ? "Low moisture content in air"
      : humidity < 60
      ? "Moderate moisture content in air"
      : "High moisture content in air";
  const weatherDesc = weatherData.weather?.[0]?.description || "Unknown";

  const tempScore = ((temp !== "..." ? parseFloat(temp) : 0) / 40) * 5;
  const humidityScore = (1 - Math.abs(humidity - 50) / 50) * 3;
  const windScore = (1 - windSpeed / 20) * 2;
  const ratingNum = Math.min(
    Math.max(tempScore + humidityScore + windScore, 0),
    10
  );
  const rating = ratingNum.toFixed(1);
  const ratingDesc =
    ratingNum < 3
      ? "Poor day for outdoor activities"
      : ratingNum < 7
      ? "Moderate day for outdoor activities"
      : "Good day for outdoor activities";

  return (
    <div className="mb-8 px-4 sm:px-8">
      <h3 className="text-sm text-gray-500 mb-2">Current</h3>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <Card className="w-full sm:w-1/3">
          <CardHeader>
            <h2 className="text-3xl font-bold">
              {weatherData.name || "City"},{" "}
              {weatherData.sys?.country || "Country"}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold mb-2">{temp}°</p>
            <p className="text-gray-600 capitalize">{weatherDesc}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full sm:w-2/3">
          <WeatherCard
            title="Wind Speed"
            value={`${windSpeed} m/s`}
            description={`${windDesc} from ${windDirection.toLowerCase()}`}
            icon={Wind}
            progress={{
              value: Math.min((windSpeed / 20) * 100, 100),
              minLabel: "Low",
              maxLabel: "High",
              color: "bg-blue-500",
            }}
          />
          <WeatherCard
            title="Humidity"
            value={`${humidity}%`}
            description={humidityDesc}
            icon={Droplets}
            progress={{
              value: humidity,
              minLabel: "Dry",
              maxLabel: "Humid",
              color: "bg-blue-500",
            }}
          />
          <WeatherCard
            title="Coordinates"
            value=""
            description={
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <Label className="text-xs text-gray-500">Longitude</Label>
                  <p className="font-bold">{weatherData.coord?.lon || "..."}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Latitude</Label>
                  <p className="font-bold">{weatherData.coord?.lat || "..."}</p>
                </div>
              </div>
            }
            icon={MapPin}
          />
          <WeatherCard
            title="Sunrise"
            value={sunrise ? `${sunriseHours}:${sunriseMinutes}` : "..."}
            description={
              typeof sunriseHours === "number" && sunriseHours < 6
                ? "Early morning sunrise"
                : "Morning sunrise"
            }
            icon={Sunrise}
            extraInfo={{
              label: `Dawn begins at ${dawnHours}:${dawnMinutes}`,
              dotColor: "bg-orange-500",
            }}
          />
          <WeatherCard
            title="Sunset"
            value={sunset ? `${sunsetHours}:${sunsetMinutes}` : "..."}
            description={
              typeof sunsetHours === "number" && sunsetHours < 18
                ? "Early afternoon sunset"
                : "Evening sunset"
            }
            icon={Sunset}
            extraInfo={{
              label: `Dusk ends at ${duskHours}:${duskMinutes}`,
              dotColor: "bg-orange-500",
            }}
          />
          <WeatherCard
            title="Weather Rating"
            value={rating}
            description={ratingDesc}
            icon={Sun}
            progress={{
              value: (ratingNum / 10) * 100,
              minLabel: "Poor",
              maxLabel: "Excellent",
              color: "bg-yellow-500",
            }}
          />
        </div>
      </div>
    </div>
  );
};
