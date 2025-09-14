"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface CollaboratorsMarqueeProps {
  collaborators: string[];
  speedPxPerSec?: number; // default 20
}

export default function CollaboratorsMarquee({ collaborators, speedPxPerSec = 20 }: CollaboratorsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const y = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Handle prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  // Duplicate list for seamless looping
  // const loopItems = useMemo(() => {
  //   if (!collaborators || collaborators.length === 0) return [] as string[];
  //   return [...collaborators, ...collaborators];
  // }, [collaborators]);

  // Auto-scroll using a simple loop; reset after one group height
  useAnimationFrame((t, delta) => {
    if (paused || reduced) return;
    const current = y.get();
    const groupHeight = groupRef.current?.offsetHeight ?? 0;
    const next = current - (speedPxPerSec * (delta / 1000));
    if (Math.abs(next) >= groupHeight && groupHeight > 0) {
      // Reset to 0 to loop seamlessly
      y.set(0);
    } else {
      y.set(next);
    }
  });

  if (!collaborators || collaborators.length === 0) {
    return <div className="text-white/60">—</div>;
  }

  // For very small lists, avoid marquee and show static
  if (collaborators.length < 8 || reduced) {
    return (
      <ul className="space-y-2">
        {collaborators.map((name, idx) => (
          <li key={idx} className="text-white/80 hover:text-white transition-colors duration-150 text-xs">
            {name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks top/bottom */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent" />

      <motion.div style={{ y }} aria-hidden={paused ? undefined : true}>
        <div ref={groupRef}>
          <ul className="space-y-2">
            {collaborators.map((name, idx) => (
              <li key={`a-${idx}`} className="text-white/80 hover:text-white transition-colors duration-150 text-xs">
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-2">
            {collaborators.map((name, idx) => (
              <li key={`b-${idx}`} className="text-white/80 hover:text-white transition-colors duration-150 text-xs">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
