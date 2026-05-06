import { useState, useEffect, useRef } from "react";

export const useResponsive = () => {
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(1000);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(e => setContainerW(e[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = containerW < 520;
  const isNarrow = containerW < 820;

  const sizes = {
    BIG_BALL_SIZE: isMobile ? 92 : isNarrow ? 116 : 148,
    TRAY_BALL_SIZE: isMobile ? 46 : isNarrow ? 54 : 64,
    TRAY_SLOT_SIZE: isMobile ? 54 : isNarrow ? 62 : 76,
    GRID_BALL_SIZE: isMobile ? 26 : isNarrow ? 36 : 44,
    LEFT_PANEL_W: isNarrow ? 210 : 340,
  };

  return {
    containerRef,
    containerW,
    isMobile,
    isNarrow,
    sizes
  };
};