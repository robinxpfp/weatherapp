"use client";

import { useState, useEffect } from "react";

type ClockProps = {
  is24Hour: boolean;
  setIs24Hour: (value: boolean) => void;
};

export function Clock({ is24Hour, setIs24Hour }: ClockProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = is24Hour ? now.getHours() : now.getHours() % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${String(hours).padStart(2, "0")}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="flex flex-col items-center mb-6">
      <span className="text-7xl md:text-8xl font-bold tracking-tighter mb-8">
        {time}
      </span>
      <div className="flex gap-2">
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
