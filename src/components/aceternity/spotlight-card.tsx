"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "panel grain relative overflow-hidden rounded-[2rem] p-6 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,0%),rgba(125,249,255,.18),transparent_16rem)]",
        className
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
