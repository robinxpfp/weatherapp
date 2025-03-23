"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      setTime(`${String(hours).padStart(2, "0")} : ${minutes} : ${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="flex items-center justify-between p-6">
      <span className="text-9xl leading-none font-bold tracking-tighter">
        {time}
      </span>
      <Tabs
        value={is24Hour ? "24h" : "12h"}
        onValueChange={(value) => setIs24Hour(value === "24h")}
        className="flex items-center"
      >
        <TabsList>
          <TabsTrigger value="12h">12h</TabsTrigger>
          <TabsTrigger value="24h">24h</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
