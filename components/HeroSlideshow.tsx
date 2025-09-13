"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
  priorityFirst?: boolean;
}

export default function HeroSlideshow({ images, intervalMs = 3000, priorityFirst = true }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  // autoplay
  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [images.length, intervalMs]);

  // Ensure current index is valid when images change
  useEffect(() => {
    if (index >= images.length) setIndex(0);
  }, [images.length, index]);

  // Crossfade stack
  return (
    <div className="relative w-full overflow-hidden" aria-label="Slideshow" role="region">
      <div className="relative aspect-[3/2] sm:aspect-[16/10] lg:aspect-[16/9]">
        {images.map((img, i) => {
          const isActive = i === index;
          const isFirst = i === 0;
          return (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                className="object-cover"
                priority={priorityFirst && isFirst}
              />
              {/* Subtle overlay for legibility; disabled pointer events so it never blocks */}
              <div className="pointer-events-none absolute inset-0 bg-black/30 sm:bg-black/25 md:bg-black/20" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
