"use client";

import { useState } from "react";
import type { GitHubContributionCalendar } from "@/types";

type Props = {
  calendar: GitHubContributionCalendar;
  className?: string;
};

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ContributionHeatmap({ calendar, className = "" }: Props) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const weeks = calendar.weeks;

  // Build month labels
  const monthLabels: { month: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ month: MONTHS[month] ?? "", colIndex: i });
      lastMonth = month;
    }
  });

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Month labels */}
      <div className="relative flex" style={{ paddingLeft: "2.5rem" }}>
        {monthLabels.map(({ month, colIndex }) => (
          <span
            key={`${month}-${colIndex}`}
            className="absolute text-xs text-foreground/40 font-medium"
            style={{ left: `calc(2.5rem + ${colIndex} * 15px)` }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] pr-1">
          {DAYS.map((day, i) => (
            <span
              key={day}
              className="h-[12px] text-[10px] text-foreground/30 leading-[12px]"
              style={{ visibility: i % 2 === 0 ? "hidden" : "visible" }}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div
          className="heatmap-grid relative"
          onMouseLeave={() => setTooltip(null)}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="heatmap-col">
              {week.contributionDays.map((day) => {
                const level = getLevel(day.contributionCount);
                return (
                  <div
                    key={day.date}
                    className={`heatmap-cell heatmap-level-${level}`}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY,
                      });
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-foreground/40">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className={`heatmap-cell heatmap-level-${l} flex-shrink-0`} />
        ))}
        <span>More</span>
        <span className="ml-auto font-medium text-foreground/60">
          {calendar.totalContributions.toLocaleString()} total contributions
        </span>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-lg text-xs font-medium bg-black/90 text-foreground border border-foreground/10 backdrop-blur-sm whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y - 36,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
