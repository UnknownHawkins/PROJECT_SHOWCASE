import type * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 rounded-2xl border border-foreground/10 bg-foreground/5/[0.07] px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/15",
        className
      )}
      {...props}
    />
  );
}
