import type { Role } from "@/types";

export type AuthContext = {
  userId: string | null;
  email: string | null;
  role: Role;
  isConfigured: boolean;
};

export async function getAuthContext(): Promise<AuthContext> {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return {
      userId: "local-admin",
      email: "local-admin@example.com",
      role: "ADMIN",
      isConfigured: false
    };
  }

  try {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const session = await auth();
    const user = await currentUser();
    const metadataRole = user?.publicMetadata?.role;

    return {
      userId: session.userId,
      email: user?.emailAddresses?.[0]?.emailAddress ?? null,
      role: metadataRole === "ADMIN" ? "ADMIN" : "VISITOR",
      isConfigured: true
    };
  } catch {
    return {
      userId: null,
      email: null,
      role: "VISITOR",
      isConfigured: true
    };
  }
}

export async function requireAdmin() {
  const context = await getAuthContext();

  if (context.role !== "ADMIN") {
    throw new Error("Admin access required.");
  }

  return context;
}
