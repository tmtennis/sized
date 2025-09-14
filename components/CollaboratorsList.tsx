"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface CollaboratorsListProps {
  collaborators: string[];
}

// Simple modulo that works for negatives
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function CollaboratorsList({ collaborators }: CollaboratorsListProps) {
  if (!collaborators || collaborators.length === 0) {
    return <p className="text-white/60">—</p>;
  }

  const ITEM_HEIGHT = 24; // px, matches h-6/leading-6
  // Responsive visible rows (odd): fewer on mobile
  const [visible, setVisible] = useState(15);
  const VISIBLE = visible;
  const HALF = Math.floor(VISIBLE / 2);

  // Fractional index of the item at the center (animated)
  const [offset, setOffset] = useState(0);
  const [target, setTarget] = useState(0);
  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const wheelSnapTimer = useRef<number | null>(null);
  const wheelAccumRef = useRef(0); // accumulate pixel-mode wheel deltas
  // Throttle for line-mode mouse wheel so one notch => one row
  const lineWheelLockRef = useRef(false);
  const lineWheelTimerRef = useRef<number | null>(null);
  const lastLineDirRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  // Update visible rows on resize for better mobile fit
  useEffect(() => {
    const decide = () => {
      const w = window.innerWidth;
      let v = w < 768 ? 11 : 15; // md breakpoint
      if (v % 2 === 0) v -= 1;
      setVisible(v);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent page scroll while interacting with the wheel
    e.preventDefault();

    const mode = (e as any).deltaMode; // 0=pixel, 1=line
    if (mode === 1) {
      // Line mode (mouse wheel notch): throttle to 1 row per physical notch burst
      const dir = Math.sign(e.deltaY);
      if (dir === 0) return;
      if (lineWheelLockRef.current && dir === lastLineDirRef.current) {
        // ignore repeated events within the same burst direction
        return;
      }
      lineWheelLockRef.current = true;
      lastLineDirRef.current = dir;
      setTarget((t) => t + dir);
      if (lineWheelTimerRef.current) window.clearTimeout(lineWheelTimerRef.current);
      lineWheelTimerRef.current = window.setTimeout(() => {
        lineWheelLockRef.current = false;
        lineWheelTimerRef.current = null;
      }, 160);
    } else {
      // Pixel mode (trackpads/mouse): accumulate until we cross one row height
      wheelAccumRef.current += e.deltaY;
      const rowsFloat = wheelAccumRef.current / ITEM_HEIGHT;
      if (Math.abs(rowsFloat) >= 1) {
        // Only move one row per event crossing to avoid multi-step jumps from a single notch
        const step = Math.sign(rowsFloat);
        wheelAccumRef.current -= step * ITEM_HEIGHT;
        setTarget((t) => t + step);
      }
    }

    // Debounced snap to nearest row after wheel settles
    if (wheelSnapTimer.current) window.clearTimeout(wheelSnapTimer.current);
    wheelSnapTimer.current = window.setTimeout(() => {
      wheelAccumRef.current = 0; // reset accumulator
      setTarget((t) => Math.round(t));
      wheelSnapTimer.current = null;
    }, 260);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    startYRef.current = e.clientY;
    startOffsetRef.current = target;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDragging(true);
  }, [target]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dy = startYRef.current - e.clientY; // drag down => negative
  const delta = dy / ITEM_HEIGHT;
  setTarget(startOffsetRef.current + delta);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    // Snap to the nearest row
    setTarget((t) => Math.round(t));
    setDragging(false);
  }, []);

  const onPointerCancel = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId); } catch {}
    setTarget((t) => Math.round(t));
    setDragging(false);
  }, []);

  // Smoothly animate offset towards target
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const diff = target - offset;
  // Simple critically-damped-ish easing
  const step = diff * 0.18;
      const next = Math.abs(step) < 0.001 ? target : offset + step;
      setOffset(next);
      if (next !== target) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, offset]);

  // Precompute the indices to render around the center
  const centerIndex = Math.floor(offset);
  const frac = offset - centerIndex;
  const slots = useMemo(() => {
    const arr: { key: string; name: string; s: number }[] = [];
    for (let s = -HALF; s <= HALF; s++) {
      const idx = mod(centerIndex + s, collaborators.length);
      arr.push({ key: `${idx}-${s}`, name: collaborators[idx], s });
    }
    return arr;
  }, [centerIndex, collaborators.length, HALF]);

  // no resize observer needed; height is explicit using VISIBLE * ITEM_HEIGHT

  return (
    <div
      className="relative select-none w-full"
      style={{ height: VISIBLE * ITEM_HEIGHT, touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab', overscrollBehavior: 'contain' }}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      tabIndex={0}
      role="listbox"
      aria-label="Collaborators"
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setTarget((t) => Math.round(t) + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setTarget((t) => Math.round(t) - 1); }
      }}
    >
      {/* Wheel viewport with vertical mask for smooth fade-out */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {slots.map(({ key, name, s }) => {
          const distance = Math.abs(s - frac);
          const y = (s - frac) * ITEM_HEIGHT;
          // Visible hierarchy across the whole viewport: center strongest, edges lighter
      const maxDist = Math.max(1, HALF);
      const t = Math.min(1, distance / maxDist);
          const falloff = 1 - t * t; // quadratic ease out
          const opacity = 0.45 + 0.55 * falloff; // center 1.0, edges ~0.45
          const isCenter = distance < 0.5;
          const scaleBase = 0.94 + 0.12 * falloff; // base scale
          const scale = isCenter ? scaleBase * 1.06 : scaleBase; // subtle extra boost for center
          return (
            <div
              key={key}
              className="absolute left-0 right-0 flex items-center justify-start px-6 md:px-8"
              style={{ top: "50%", transform: `translateY(${y - ITEM_HEIGHT / 2}px) translateY(-50%) scale(${scale})`, opacity }}
            >
        <div
          className={`h-6 leading-6 text-base ${isCenter ? 'font-black' : 'font-normal'} text-white text-left max-w-full pl-2`}
          onClick={() => {
            if (!isCenter && !dragging) {
              setTarget(Math.round(offset) + s);
            }
          }}
        >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
