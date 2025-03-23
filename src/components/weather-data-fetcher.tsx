"use client";

import { useState } from "react";
import useSWR from "swr";
import { WeatherClock } from "@/components/weather-clock";
import { SunInfo } from "@/components/sun-info";
import { WeatherInfo } from "@/components/weather-info";
import { Header } from "@/components/header";

type WeatherData = {
  main?: { temp: number; humidity: number };
  wind?: { speed: number; deg: number };
  sys?: { country: string; sunrise: number; sunset: number };
  coord?: { lon: number; lat: number };
  name?: string;
  weather?: { main: string; description: string }[];
};

// Fetcher SWR
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(
          data.message === "city not found"
            ? `The city "${data.city}" was not found. Please try another city.`
            : data.message ?? "Failed to fetch weather data"
        );
      }
      return data;
    });

export function WeatherDataFetcher() {
  const [city, setCity] = useState<string>("London");
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  // Use environment variables for the API URL and key
  const API_BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  // Use SWR to get data from API
  const { data: weatherData, error } = useSWR<WeatherData, Error>(
    city ? `${API_BASE_URL}?q=${city}&appid=${API_KEY}` : null,
    fetcher
  );

  // Function to render content
  const renderContent = () => {
    // Verify if there is an error
    if (error !== undefined && error !== null) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-500 mb-4">{error.message}</p>
          <p>Try searching for another city using the search bar above.</p>
        </div>
      );
    }

    // Verify if data is undefined
    if (weatherData === undefined) {
      let message: string;
      if (city !== "" && city !== undefined && city !== null) {
        message = "Loading weather data...";
      } else {
        message = "Please enter a city name.";
      }
      return (
        <div className="p-6 text-center">
          <p>{message}</p>
        </div>
      );
    }

    // if data is defined render content
    return (
      <div>
        <WeatherClock is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
        <SunInfo />
        <WeatherInfo weatherData={weatherData} />
      </div>
    );
  };

  return (
    <div>
      <Header city={city} setCity={setCity} />
      <main className="mx-auto">{renderContent()}</main>
    </div>
  );
}
