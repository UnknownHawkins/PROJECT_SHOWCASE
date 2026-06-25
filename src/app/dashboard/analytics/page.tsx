import type { Metadata } from "next";
import { BarChart3, Users, Clock, Globe, ArrowUpRight, Monitor, Compass, ShieldCheck } from "lucide-react";
import { getVisitorSnapshot } from "@/services/analytics";
import { VisitorChart } from "@/components/analytics/VisitorChart";
import { WorldMap } from "@/components/analytics/WorldMap";

export const metadata: Metadata = { title: "Visitor Analytics" };

export default function DashboardAnalyticsPage() {
  const analytics = getVisitorSnapshot();

  return (
    <div className="space-y-8 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-300" />
            Visitor Analytics
          </h1>
          <p className="text-sm text-foreground/40 mt-0.5">Real-time visitor patterns and referral logs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot active" />
          <span className="text-xs text-foreground/40">Tracking live views</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Live Visitors", value: analytics.liveVisitors, icon: Users, color: "text-cyan-300" },
          { label: "Today's Visitors", value: analytics.todayVisitors, icon: ArrowUpRight, color: "text-green-400" },
          { label: "Total Views", value: analytics.totalVisitors.toLocaleString(), icon: Globe, color: "text-blue-400" },
          { label: "Bounce Rate", value: "34.2%", icon: Clock, color: "text-violet-400" },
        ].map((card) => (
          <div key={card.label} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-foreground/40 font-bold uppercase tracking-wider">{card.label}</span>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="text-3xl font-black text-foreground">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Main Views Chart */}
      <div className="dark-panel grain rounded-3xl p-6">
        <h2 className="text-lg font-black text-foreground mb-6">Traffic Views over time</h2>
        <VisitorChart data={analytics.pageViews} />
      </div>

      {/* Two-Column Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Geo Distribution */}
        <div className="glass-card rounded-3xl p-6">
          <WorldMap countries={analytics.countries} />
        </div>

        {/* Traffic Sources */}
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-5">Traffic Sources</h3>
          <div className="space-y-4">
            {analytics.traffic.map((source) => (
              <div key={source.source} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground/80 w-24">{source.source}</span>
                <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden border border-white/[0.04]">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${source.value}%` }}
                  />
                </div>
                <span className="text-xs text-foreground/40 w-8 text-right">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Breakdown */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Devices */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Devices</h3>
          </div>
          <div className="space-y-3">
            {analytics.devices.map((device) => (
              <div key={device.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground/60">{device.name}</span>
                <span className="font-semibold text-foreground">{device.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-4 h-4 text-violet-300" />
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Browsers</h3>
          </div>
          <div className="space-y-3">
            {analytics.browsers.map((browser) => (
              <div key={browser.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground/60">{browser.name}</span>
                <span className="font-semibold text-foreground">{browser.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* OS */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-green-300" />
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Operating Systems</h3>
          </div>
          <div className="space-y-3">
            {analytics.os.map((os) => (
              <div key={os.name} className="flex items-center justify-between text-xs">
                <span className="text-foreground/60">{os.name}</span>
                <span className="font-semibold text-foreground">{os.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Landing Pages */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <h2 className="text-lg font-black text-foreground">Top Visited Pages</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Page Path</th>
              <th className="text-right">Page Views</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topPages.map((page) => (
              <tr key={page.path}>
                <td className="font-mono text-xs text-foreground/70">{page.path}</td>
                <td className="text-right font-semibold text-cyan-300">{page.views.toLocaleString()} views</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
