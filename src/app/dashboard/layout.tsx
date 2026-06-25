import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  description: "Admin dashboard for managing portfolio content, analytics, and settings.",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch (error) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      {/* Main content — pushed by sidebar width */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: "260px" }}
      >
        <main className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
