"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LottieHero({ className }: { className?: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    // Fetch a neutral, open-source Lottie animation JSON at runtime.
    // Using runtime fetch avoids bundling large JSON into the repo.
    let mounted = true;
    fetch("https://assets1.lottiefiles.com/packages/lf20_touohxv0.json")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setAnimationData(data);
      })
      .catch(() => {
        // ignore fetch errors in dev; animation will be absent
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!animationData) {
    return <div className={className + " bg-gradient-to-br from-blue-900 to-cyan-800 rounded-2xl"} style={{ minHeight: 320 }} />;
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
