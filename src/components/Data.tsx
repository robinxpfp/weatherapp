"use client";

import React, { useState, useEffect } from "react";
import Values from "./Values";
import { useDebounce } from "use-debounce";

interface WeatherData {
  main?: { temp: any; temp_min: any; temp_max: any; humidity: string };
  wind?: { speed: string };
  sys?: { country: string; sunrise: any; sunset: any };
  coord?: { lon: string; lat: string };
  name?: string;
  weather?: [{ main: string }];
}

const Data: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [value] = useDebounce(city, 1000);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [error, setError] = useState<Error | null>(null);

  const temperatura = weatherData.main?.temp - 273.15;
  const temperaturaMax = weatherData.main?.temp_max - 273.15;
  const temperaturaMin = weatherData.main?.temp_min - 273.15;

  let weatherDescription = "";
  switch (weatherData.weather?.[0].main) {
    case "Clear":
      weatherDescription = "Sunny";
      break;
    case "Clouds":
      weatherDescription = "Cloudy";
      break;
    case "Rain":
      weatherDescription = "Rainy";
      break;
    default:
      weatherDescription = "...";
  }

  const sunrise = new Date(weatherData.sys?.sunrise * 1000);
  const sunset = new Date(weatherData.sys?.sunset * 1000);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const currentMonth = monthNames[date.getMonth()];
  const currentDay = dayNames[date.getDay()];
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd848f8597bb9b1938a469ca1800dedb
      `
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [city]);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="flex h-screen items-center bg-gray-100 justify-center mx-auto md:w-1/2 w-full ">
      <div className="text-black md:w-3/5 w-full   mx-5 ">
        <form onSubmit={(e: any) => e.preventDefault()}>
          <div className="w-full flex space-x-2  p-4   rounded-full bg-white">
            <input
              className="bg-inherit outline-none   w-full "
              type="text"
              placeholder="Search location by city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
        <div>
          <div className="mt-2 p-10">
            <div>
              <h3 className="text-md subpixel-antialiased font-semibold">
                {weatherData.name ? weatherData.name : "City"},{"  "}
                {weatherData.sys?.country} Weather
              </h3>
              <p className="text-xs">
                {date.getDate()} {currentDay.toLowerCase()} of {currentMonth} at{" "}
                {`${currentHour}:${currentMinute}`}
              </p>
              <span className="text-4xl">
                {temperatura ? temperatura.toFixed(1) : " "}°
              </span>
            </div>
            <div className="mt-10">
              <p className="text-md subpixel-antialiased font-semibold">
                {weatherDescription}
              </p>
              <p className="text-xs">
                Weather today in {weatherData.name ? weatherData.name : "City"},{" "}
                {weatherData.sys?.country ? weatherData.sys.country : "Country"}
              </p>
            </div>
            <div className="mt-10">
              <div className="space-y-3">
                <Values
                  texto="Speed"
                  valor={weatherData.wind?.speed}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/wind--v1.png"
                />

                <Values
                  texto="Humidity"
                  valor={`${
                    weatherData.main?.humidity
                      ? `${weatherData.main?.humidity}%`
                      : "......"
                  }`}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/wet.png"
                />

                <Values
                  texto="Longitude"
                  valor={weatherData.coord?.lon}
                  img="https://img.icons8.com/ios/50/1A1A1A/longitude.png"
                />

                <Values
                  texto="Latitude"
                  valor={weatherData.coord?.lat}
                  img="https://img.icons8.com/ios/50/1A1A1A/latitude.png"
                />

                <Values
                  texto="Sunrise"
                  valor={`${sunrise.getHours() ? sunrise.getHours() : "..."}${
                    sunrise.getHours() ? ":" : ""
                  }${sunrise.getMinutes() ? sunrise.getMinutes() : "..."}`}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/sun--v1.png"
                />
                <Values
                  texto="Sunset"
                  valor={`${sunset.getHours() ? sunset.getHours() : "..."}${
                    sunset.getHours() ? ":" : ""
                  }${sunset.getMinutes() ? sunset.getMinutes() : "..."}`}
                  img="https://img.icons8.com/external-kosonicon-solid-kosonicon/48/1A1A1A/external-sunset-weather-kosonicon-solid-kosonicon.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
