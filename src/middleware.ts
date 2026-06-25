import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/api/admin"];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // If Clerk is configured, use it for route protection
  if (
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    isProtectedRoute(request.nextUrl.pathname)
  ) {
    const { clerkMiddleware, createRouteMatcher } = await import(
      "@clerk/nextjs/server"
    );
    const matcher = createRouteMatcher(["/dashboard(.*)", "/api/admin(.*)"]);
    return clerkMiddleware(async (auth) => {
      if (matcher(request)) await auth.protect();
      return response;
    })(request, {} as never);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"]
};
