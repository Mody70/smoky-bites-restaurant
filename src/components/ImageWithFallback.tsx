"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackClassName = "",
  priority = false,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} ${fallbackClassName} flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(185,28,28,0.42),rgba(249,115,22,0.20),rgba(24,24,27,0.96))]`}
        aria-label={alt}
        role="img"
      >
        <div className="h-16 w-16 rounded-full border border-white/15 bg-white/10 shadow-glow" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
