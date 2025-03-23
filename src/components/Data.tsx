"use client";

import { useState, useEffect } from "react";
import { SearchForm } from "@/components/search-form";
import { Clock } from "@/components/clock";
import { SunInfo } from "@/components/sun-info";
import { WeatherInfo } from "@/components/weather-info";
import { Nav } from "./nav";
// import { TimeZones } from "./time-zones";

interface WeatherData {
  main?: { temp: number; humidity: string };
  wind?: { speed: string };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: string; lat: string };
  name?: string;
}

export function Data() {
  const [city, setCity] = useState<string>("London");
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [error, setError] = useState<Error | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  useEffect(() => {
    if (!city) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd848f8597bb9b1938a469ca1800dedb`
    )
      .then((res) => res.json())
      .then(setWeatherData)
      .catch(setError);
  }, [city]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* <SearchForm city={city} setCity={setCity} /> */}
      <Nav city={city} setCity={setCity} />
      <main className="max-w-6xl mx-auto">
        <Clock is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
        <SunInfo
          sunrise={weatherData.sys?.sunrise || 0}
          sunset={weatherData.sys?.sunset || 0}
        />
        <div className="border-t border-gray-100 pt-6 mx-6"></div>
        <WeatherInfo weatherData={weatherData} />
        {/* <TimeZones
          is24Hour={is24Hour}
          currentCity={weatherData.name || "London"}
        /> */}
      </main>
    </div>
  );
}
