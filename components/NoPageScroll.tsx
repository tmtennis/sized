"use client";

import { useEffect } from "react";

export default function NoPageScroll() {
  useEffect(() => {
    const { documentElement, body } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction as string | undefined;
    const prevHtmlOverscroll = documentElement.style.overscrollBehavior as string | undefined;

    const apply = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (isDesktop) {
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none';
        documentElement.style.overscrollBehavior = 'none';
      } else {
        body.style.overflow = prevBodyOverflow || '';
        if (prevBodyTouchAction !== undefined) body.style.touchAction = prevBodyTouchAction;
        else body.style.removeProperty('touch-action');
        if (prevHtmlOverscroll !== undefined) documentElement.style.overscrollBehavior = prevHtmlOverscroll;
        else documentElement.style.removeProperty('overscroll-behavior');
      }
    };

    apply();
    const onResize = () => apply();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      body.style.overflow = prevBodyOverflow;
      if (prevBodyTouchAction !== undefined) body.style.touchAction = prevBodyTouchAction;
      else body.style.removeProperty('touch-action');
      if (prevHtmlOverscroll !== undefined) documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      else documentElement.style.removeProperty('overscroll-behavior');
    };
  }, []);
  return null;
}
