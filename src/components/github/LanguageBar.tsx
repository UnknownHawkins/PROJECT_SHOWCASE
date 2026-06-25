import type { GitHubLanguage } from "@/types";

type Props = {
  languages: GitHubLanguage[];
  showLabels?: boolean;
  className?: string;
};

const DEFAULT_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  CSS: "#663399",
  HTML: "#e34c26",
  Shell: "#89e051",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Dart: "#00b4ab",
};

export function LanguageBar({ languages, showLabels = true, className = "" }: Props) {
  const total = languages.reduce((s, l) => s + l.size, 0) || 1;

  const topLangs = languages.slice(0, 8).map((lang) => ({
    ...lang,
    color: lang.color ?? DEFAULT_COLORS[lang.name] ?? `hsl(${lang.name.charCodeAt(0) * 13}, 70%, 55%)`,
    pct: lang.percentage ?? Math.round((lang.size / total) * 100),
  }));

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Bar */}
      <div className="language-bar">
        {topLangs.map((lang) => (
          <div
            key={lang.name}
            className="language-segment"
            style={{
              flex: lang.pct,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.pct}%`}
          />
        ))}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {topLangs.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs font-medium text-foreground/70">{lang.name}</span>
              <span className="text-xs text-foreground/40">{lang.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
