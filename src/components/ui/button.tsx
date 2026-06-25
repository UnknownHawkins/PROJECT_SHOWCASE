import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-black uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-cyan-300 text-slate-950 shadow-[0_0_35px_rgba(125,249,255,.3)] hover:-translate-y-0.5 hover:bg-foreground/5",
        secondary: "border border-foreground/15 bg-foreground/10 text-foreground hover:-translate-y-0.5 hover:bg-foreground/15",
        ghost: "text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
