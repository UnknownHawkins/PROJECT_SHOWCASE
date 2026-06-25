import type { VisitorSnapshot } from "@/types";

export function getVisitorSnapshot(): VisitorSnapshot {
  return {
    liveVisitors: 12,
    totalVisitors: 18420,
    todayVisitors: 284,
    countries: [
      { name: "India", value: 52 },
      { name: "United States", value: 20 },
      { name: "Germany", value: 9 },
      { name: "United Kingdom", value: 8 }
    ],
    devices: [
      { name: "Desktop", value: 61 },
      { name: "Mobile", value: 34 },
      { name: "Tablet", value: 5 }
    ],
    browsers: [
      { name: "Chrome", value: 68 },
      { name: "Safari", value: 16 },
      { name: "Edge", value: 10 },
      { name: "Firefox", value: 6 }
    ],
    os: [
      { name: "Windows", value: 45 },
      { name: "macOS", value: 35 },
      { name: "Linux", value: 12 },
      { name: "iOS", value: 5 },
      { name: "Android", value: 3 }
    ],
    traffic: [
      { source: "GitHub", value: 38 },
      { source: "Direct", value: 31 },
      { source: "LinkedIn", value: 18 },
      { source: "Search", value: 13 }
    ],
    pageViews: Array.from({ length: 14 }, (_, index) => ({
      date: `D-${13 - index}`,
      value: 700 + Math.round(Math.sin(index / 2) * 180 + index * 42)
    })),
    topPages: [
      { path: "/", views: 1420 },
      { path: "/projects", views: 980 },
      { path: "/github", views: 560 },
      { path: "/blog", views: 420 },
      { path: "/ai", views: 240 }
    ]
  };
}
