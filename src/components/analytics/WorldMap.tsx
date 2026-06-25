import React from "react";

type CountryData = {
  name: string;
  value: number;
  code?: string;
};

type Props = {
  countries: CountryData[];
  className?: string;
};

export function WorldMap({ countries, className = "" }: Props) {
  const maxVal = Math.max(...countries.map((c) => c.value), 1);

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider">
        Top Locations
      </h3>
      <div className="space-y-3">
        {countries.map((country) => {
          const percentage = Math.round((country.value / maxVal) * 100);
          return (
            <div key={country.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground/80">{country.name}</span>
                <span className="text-foreground/40">{country.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden border border-white/[0.04]">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
