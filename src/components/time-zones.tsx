"use client";

import { useState, useEffect } from "react";

interface TimeZone {
  city: string;
  country?: string;
  offset: number;
  time?: string;
  isDaytime?: boolean;
}

interface TimeZonesProps {
  is24Hour: boolean;
  currentCity: string;
}

export function TimeZones({ is24Hour, currentCity }: TimeZonesProps) {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([
    { city: "Los Angeles", offset: -8 },
    { city: "New York", offset: -5 },
    { city: "London", country: "United Kingdom", offset: 0 },
    { city: "Paris", offset: 1 },
  ]);

  useEffect(() => {
    const updateTimeZones = () => {
      const now = new Date();
      const updatedTimeZones = timeZones.map((tz) => {
        const tzTime = new Date(now.getTime() + tz.offset * 60 * 60 * 1000);
        const tzHours = tzTime.getUTCHours();

        let displayTzHours = tzHours;
        if (!is24Hour && tzHours > 12) {
          displayTzHours = tzHours - 12;
        } else if (!is24Hour && tzHours === 0) {
          displayTzHours = 12;
        }

        const tzMinutes = String(tzTime.getUTCMinutes()).padStart(2, "0");
        const isDaytime = tzHours >= 6 && tzHours < 18;

        return {
          ...tz,
          time: `${String(displayTzHours).padStart(2, "0")}:${tzMinutes}`,
          isDaytime,
        };
      });

      setTimeZones(updatedTimeZones);
    };

    updateTimeZones();
    const interval = setInterval(updateTimeZones, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {timeZones.map((tz, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl ${
            tz.city === currentCity ? "bg-black text-white" : "bg-gray-50"
          }`}
        >
          <div className="text-xs mb-1">
            {tz.city}
            <span className="ml-2 text-gray-400">
              UTC{tz.offset >= 0 ? "+" : ""}
              {tz.offset}
            </span>
          </div>
          <div className="text-3xl font-bold">{tz.time}</div>
          <div className="flex items-center mt-1">
            {tz.isDaytime ? (
              <>
                <span className="text-yellow-400">☀️</span>
                <span className="text-xs ml-1">Day</span>
              </>
            ) : (
              <>
                <span className="text-blue-400">🌙</span>
                <span className="text-xs ml-1">Night</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
