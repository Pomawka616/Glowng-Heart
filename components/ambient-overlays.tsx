export function AmbientOverlays() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,61,110,0.22),rgba(255,61,110,0.08)_34%,transparent_72%)] blur-3xl animate-pulseGlow" />
        <div className="absolute left-1/2 top-[54%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,132,176,0.16),transparent_70%)] blur-[100px]" />
      </div>

      <div className="grain-overlay absolute -inset-[12%] animate-grain" />
      <div className="vignette-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,0,81,0.06))]" />
    </>
  );
}
