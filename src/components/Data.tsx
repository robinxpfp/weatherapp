"use client";

import { useState } from "react";
import useSWR from "swr";
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

export function Data() {
  const [city, setCity] = useState<string>("London");
  const [is24Hour, setIs24Hour] = useState<boolean>(true);

  // Use SWR to get data from API
  const { data: weatherData, error } = useSWR<WeatherData, Error>(
    city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd848f8597bb9b1938a469ca1800dedb`
      : null,
    fetcher
  );

  // function to render content
  const renderContent = () => {
    // Verify if there is an error
    if (error !== undefined && error !== null) {
      return (
        <div className="p-6 text-center">
          <p className="text-red-500 mb-4">{error.message}</p>
          <p className="text-gray-600">
            Try searching for another city using the search bar above.
          </p>
        </div>
      );
    }

    // verify if data is undefined
    if (weatherData === undefined) {
      let message: string;
      if (city !== "" && city !== undefined && city !== null) {
        message = "Loading weather data...";
      } else {
        message = "Please enter a city name.";
      }
      return (
        <div className="p-6 text-center">
          <p className="text-gray-600">{message}</p>
        </div>
      );
    }

    // if data is defined render content
    return (
      <div>
        <Clock is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
        <SunInfo
          sunrise={weatherData.sys?.sunrise ?? 0}
          sunset={weatherData.sys?.sunset ?? 0}
        />
        <WeatherInfo weatherData={weatherData} />
      </div>
    );
  };

  return (
    <div>
      <Nav city={city} setCity={setCity} />
      <main className="mx-auto">{renderContent()}</main>
    </div>
  );
}
