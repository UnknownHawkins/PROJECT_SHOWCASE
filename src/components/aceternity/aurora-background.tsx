export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-glow" />
      <div className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      {children}
    </div>
  );
}
