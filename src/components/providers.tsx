"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { LenisProvider } from "@/components/lenis-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const tree = (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <LenisProvider>{children}</LenisProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );

  if (!hasClerk) {
    return tree;
  }

  return <ClerkProvider>{tree}</ClerkProvider>;
}
