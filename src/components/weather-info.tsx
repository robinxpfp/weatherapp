"use client";

import { Values } from "@/components/values";

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
  // Si weatherData.sys o sus propiedades son undefined, usamos 0 como valor por defecto
  const sunriseTimestamp = weatherData.sys?.sunrise ?? 0;
  const sunsetTimestamp = weatherData.sys?.sunset ?? 0;

  // Creamos objetos Date con los timestamps, asegurándonos de que sean válidos
  const sunrise = new Date(sunriseTimestamp * 1000);
  const sunset = new Date(sunsetTimestamp * 1000);

  // Calculamos la temperatura, manejando el caso undefined
  const temp = weatherData.main?.temp
    ? (weatherData.main.temp - 273.15).toFixed(1)
    : "...";

  // Formateamos las horas y minutos, manejando el caso de fechas inválidas
  const sunriseHours = sunriseTimestamp ? sunrise.getHours() : "...";
  const sunriseMinutes = sunriseTimestamp
    ? String(sunrise.getMinutes()).padStart(2, "0")
    : "...";
  const sunsetHours = sunsetTimestamp ? sunset.getHours() : "...";
  const sunsetMinutes = sunsetTimestamp
    ? String(sunset.getMinutes()).padStart(2, "0")
    : "...";

  return (
    <div className="flex sm:flex-row flex-col  sm:justify-between p-6">
      <div className="w-1/3 mb-12">
        <div className="text-sm text-gray-400 mb-2">Current</div>
        <h2 className="text-5xl font-bold leading-tight">
          {weatherData.name || "City"},
          <br />
          {weatherData.sys?.country || "Country"}
        </h2>
        <span className="text-3xl font-semibold">{temp}°</span>
      </div>
      <div className="sm:w-2/3 w-full grid sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-4">
        <Values texto="Speed" valor={weatherData.wind?.speed || "..."} />
        <Values
          texto="Humidity"
          valor={`${weatherData.main?.humidity || "..."}%`}
        />
        <Values texto="Longitude" valor={weatherData.coord?.lon || "..."} />
        <Values texto="Latitude" valor={weatherData.coord?.lat || "..."} />
        <Values
          texto="Sunrise"
          valor={sunriseTimestamp ? `${sunriseHours}:${sunriseMinutes}` : "..."}
        />
        <Values
          texto="Sunset"
          valor={sunsetTimestamp ? `${sunsetHours}:${sunsetMinutes}` : "..."}
        />
      </div>
    </div>
  );
}
