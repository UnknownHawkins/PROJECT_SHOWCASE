import type * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-36 resize-none rounded-2xl border border-foreground/10 bg-foreground/5/[0.07] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/15",
        className
      )}
      {...props}
    />
  );
}
