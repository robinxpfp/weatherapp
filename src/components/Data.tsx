"use client";

import { useState, useEffect } from "react";
import { Clock } from "@/components/clock";
import { SunInfo } from "@/components/sun-info";
import { WeatherInfo } from "@/components/weather-info";
import { Nav } from "@/components/nav";

type WeatherData = {
  main?: { temp: number; humidity: number };
  wind?: { speed: number; deg: number };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: number; lat: number };
  name?: string;
  weather?: { main: string; description: string }[];
};

export function Data() {
  const [city, setCity] = useState<string>("London");
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [error, setError] = useState<string | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  useEffect(() => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    // Limpiar el error al intentar una nueva búsqueda
    setError(null);
    setWeatherData({}); // Limpiar los datos anteriores mientras se carga la nueva ciudad

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd848f8597bb9b1938a469ca1800dedb`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          throw new Error(
            data.message === "city not found"
              ? `The city "${city}" was not found. Please try another city.`
              : data.message || "Failed to fetch weather data"
          );
        }
        setWeatherData(data);
      })
      .catch((err) => setError(err.message));
  }, [city]);

  return (
    <div>
      <Nav city={city} setCity={setCity} />
      <main className=" mx-auto">
        {error ? (
          <div className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600">
              Try searching for another city using the search bar above.
            </p>
          </div>
        ) : (
          <>
            <Clock is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
            <SunInfo
              sunrise={weatherData.sys?.sunrise || 0}
              sunset={weatherData.sys?.sunset || 0}
            />
            {Object.keys(weatherData).length > 0 ? (
              <WeatherInfo weatherData={weatherData} />
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600">Loading weather data...</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
