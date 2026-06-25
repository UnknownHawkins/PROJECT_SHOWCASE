"use client";

type Props = {
  data: Array<{ date: string; value: number }>;
  className?: string;
};

export function VisitorChart({ data, className = "" }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-48 text-foreground/30 text-sm ${className}`}>
        No data available
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min;

  // Chart dimensions
  const width = 600;
  const height = 180;
  const padding = 20;

  const points = data
    .map((d, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = data.length > 0
    ? `${padding},${height - padding} ${points} ${width - padding},${height - padding}`
    : "";

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative w-full h-48">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(125,249,255,0.25)" />
              <stop offset="100%" stopColor="rgba(125,249,255,0)" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7df9ff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding + ratio * (height - padding * 2);
            return (
              <line
                key={ratio}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            );
          })}

          {/* Area */}
          {areaPoints && (
            <polygon points={areaPoints} fill="url(#areaGradient)" />
          )}

          {/* Line */}
          {points && (
            <polyline
              points={points}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {data.map((d, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((d.value - min) / range) * (height - padding * 2);

            return (
              <g key={d.date} className="group/dot cursor-pointer">
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#030712"
                  stroke="#7df9ff"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover/dot:r-6"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="rgba(125,249,255,0.2)"
                  className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-300"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between px-2 text-[10px] text-foreground/35 font-bold uppercase tracking-wider">
        <span>{data[0]?.date}</span>
        <span>{data[Math.floor(data.length / 2)]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  );
}
