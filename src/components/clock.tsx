"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
        <span className="text-7xl sm:text-8xl font-bold tracking-tighter">
          {time}
        </span>
        <span className="text-2xl sm:text-3xl font-bold">{period}</span>
      </div>

      <Tabs
        value={is24Hour ? "24h" : "12h"}
        onValueChange={(value) => setIs24Hour(value === "24h")}
        className="mt-8"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
          <TabsTrigger value="12h">12h</TabsTrigger>
          <TabsTrigger value="24h">24h</TabsTrigger>
        </TabsList>
        <TabsContent value="12h">
          <div className="hidden" />{" "}
        </TabsContent>
        <TabsContent value="24h">
          <div className="hidden" />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
}
