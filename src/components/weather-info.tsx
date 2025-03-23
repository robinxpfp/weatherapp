"use client";

import { Wind, Droplets, MapPin, Sunrise, Sunset, Sun } from "lucide-react";

type WeatherData = {
  main?: { temp: number; humidity: string };
  wind?: { speed: string };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: string; lat: string };
  name?: string;
};

type WeatherInfoProps = {
  weatherData: WeatherData;
};

export function WeatherInfo({ weatherData }: WeatherInfoProps) {
  const sunriseTimestamp = weatherData.sys?.sunrise ?? 0;
  const sunsetTimestamp = weatherData.sys?.sunset ?? 0;

  const sunrise = new Date(sunriseTimestamp * 1000);
  const sunset = new Date(sunsetTimestamp * 1000);

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
            <p className="text-gray-600">Partly cloudy with light winds</p>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-2/3">
          {/* Wind Speed Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Wind Speed</h3>
              </div>
              <span className="text-xl font-bold">
                {weatherData.wind?.speed || "..."}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Light breeze from southwest</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">Low</span>
              <div className="h-1 w-24 bg-gray-200 rounded-full">
                <div className="h-1 w-6 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500">High</span>
            </div>
          </div>

          {/* Humidity Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Humidity</h3>
              </div>
              <span className="text-xl font-bold">
                {weatherData.main?.humidity || "..."}%
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              High moisture content in air
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">Dry</span>
              <div className="h-1 w-24 bg-gray-200 rounded-full">
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500">Humid</span>
            </div>
          </div>

          {/* Coordinates Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <h3 className="font-medium">Coordinates</h3>
              </div>
            </div>
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
          </div>

          {/* Sunrise Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium">Sunrise</h3>
              </div>
              <span className="text-xl font-bold">
                {sunriseTimestamp ? `${sunriseHours}:${sunriseMinutes}` : "..."}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Early morning sunrise</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-500">Dawn begins at 1:24</span>
            </div>
          </div>

          {/* Sunset Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium">Sunset</h3>
              </div>
              <span className="text-xl font-bold">
                {sunsetTimestamp ? `${sunsetHours}:${sunsetMinutes}` : "..."}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Early afternoon sunset</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span className="text-xs text-gray-500">Dusk ends at 14:49</span>
            </div>
          </div>

          {/* Weather Rating Card (Static for now) */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Weather Rating</h3>
              </div>
              <span className="text-xl font-bold">7.2</span>
            </div>
            <p className="text-gray-600 text-sm">
              Good day for outdoor activities
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">Poor</span>
              <div className="h-1 w-24 bg-gray-200 rounded-full">
                <div className="h-1 w-16 bg-yellow-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
