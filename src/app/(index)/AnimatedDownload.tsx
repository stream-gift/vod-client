"use client";

import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";
import { useState, useEffect } from "react";

export default function AnimatedDownload() {
  const [value, setValue] = useState<number>(17);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) =>
        prevValue >= 100 ? 3 : Math.min(prevValue + Math.random() * 20, 100)
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      max={100}
      value={value}
      min={0}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgb(79 70 100)"
    />
  );
}
