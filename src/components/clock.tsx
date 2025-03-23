"use client";

import { useState, useEffect } from "react";

type ClockProps = {
  is24Hour: boolean;
  setIs24Hour: (value: boolean) => void;
};

export function Clock({ is24Hour, setIs24Hour }: ClockProps) {
  const [time, setTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const hours = is24Hour ? hours24 : hours24 % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const periodIndicator = !is24Hour ? (hours24 < 12 ? "AM" : "PM") : "";
      setTime(`${String(hours).padStart(2, "0")}:${minutes}:${seconds}`);
      setPeriod(periodIndicator);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-baseline gap-2">
        <span className="text-7xl md:text-8xl font-bold tracking-tighter">
          {time}
        </span>
        <span className="text-2xl md:text-3xl font-bold">{period}</span>
      </div>
      <div className="flex gap-2 mt-8">
        <button
          onClick={() => setIs24Hour(false)}
          className={`px-4 py-1 rounded-full text-sm ${
            !is24Hour ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          12h
        </button>
        <button
          onClick={() => setIs24Hour(true)}
          className={`px-4 py-1 rounded-full text-sm ${
            is24Hour ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          24h
        </button>
      </div>
    </div>
  );
}
