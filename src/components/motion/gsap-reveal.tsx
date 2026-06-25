"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function GsapReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: 28, filter: "blur(12px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", delay, duration: 0.8, ease: "power3.out" }
    );
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
