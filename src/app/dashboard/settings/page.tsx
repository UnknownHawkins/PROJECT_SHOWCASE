import type { Metadata } from "next";
import { Settings, User, Shield, Sparkles } from "lucide-react";
import { Github } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Admin Settings" };

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8 page-enter">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-300" />
          Settings
        </h1>
        <p className="text-sm text-foreground/40 mt-0.5">Manage portfolio variables, integrations, and profile details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <div className="dark-panel grain rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-cyan-300" />
            Profile Information
          </h2>
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">Name</label>
              <input
                type="text"
                defaultValue={siteConfig.name}
                className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground outline-none focus:border-cyan-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">Email Address</label>
              <input
                type="email"
                defaultValue={siteConfig.links.email}
                className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground/50 outline-none cursor-not-allowed"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">Job Title</label>
              <input
                type="text"
                defaultValue="Full-Stack Developer"
                className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground outline-none focus:border-cyan-300"
              />
            </div>
          </div>
          <Button size="sm" className="mt-4">
            Save Profile
          </Button>
        </div>

        {/* GitHub Integration */}
        <div className="dark-panel grain rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-2">
            <Github className="w-4 h-4 text-cyan-300" />
            GitHub Sync Settings
          </h2>
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">GitHub Username</label>
              <input
                type="text"
                defaultValue="UnknownHawkins"
                className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground outline-none focus:border-cyan-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">Cache TTL (minutes)</label>
              <input
                type="number"
                defaultValue={30}
                className="rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground outline-none focus:border-cyan-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-foreground/40 font-bold uppercase">Sync Status</label>
              <div className="flex items-center justify-between bg-foreground/5 rounded-xl border border-foreground/10 px-4 py-2 text-xs">
                <span className="text-foreground/60">Last synced 12 minutes ago</span>
                <span className="text-green-400 font-bold">CONNECTED</span>
              </div>
            </div>
          </div>
          <Button size="sm" variant="secondary" className="mt-4">
            Sync Now
          </Button>
        </div>

        {/* SEO & PWA Configurations */}
        <div className="dark-panel grain rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            SEO &amp; PWA Configuration
          </h2>
          <div className="space-y-4">
            {[
              { id: "indexing", label: "Search Engine Indexing", desc: "Allow robots.txt to index staging/production pages", checked: true },
              { id: "sitemap", label: "Sitemap Autogen", desc: "Rebuild sitemap.xml on content changes", checked: true },
              { id: "offline", label: "PWA Offline Cache", desc: "Enable client service worker to cache static assets", checked: true },
            ].map((setting) => (
              <div key={setting.id} className="flex items-start justify-between">
                <div className="max-w-[80%]">
                  <p className="text-sm font-bold text-foreground">{setting.label}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">{setting.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer mt-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security Guard Settings */}
        <div className="dark-panel grain rounded-3xl p-6 space-y-4">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-cyan-300" />
            Security Preferences
          </h2>
          <div className="space-y-4">
            {[
              { id: "clerk", label: "Clerk Authentication", desc: "Guard admin pages with Clerk middlewares", checked: true },
              { id: "limiter", label: "Rate Limiting (Redis)", desc: "Enable Upstash token bucket on api/contact routes", checked: true },
              { id: "headers", label: "Strict Content-Security-Policy", desc: "Enforce XSS and framing protection headers", checked: true },
            ].map((setting) => (
              <div key={setting.id} className="flex items-start justify-between">
                <div className="max-w-[80%]">
                  <p className="text-sm font-bold text-foreground">{setting.label}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">{setting.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer mt-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
