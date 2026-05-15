"use client";

import dynamic from "next/dynamic";

const LandingExperience = dynamic(
  () =>
    import("@/components/landing-experience").then(
      (module) => module.LandingExperience
    ),
  {
    ssr: false,
    loading: () => (
      <main className="scene-shell relative min-h-screen overflow-hidden bg-canvas">
        <div className="grain-overlay absolute -inset-[12%]" />
        <div className="vignette-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-[clamp(3rem,9vw,7rem)] font-semibold tracking-[-0.06em] text-white">
              Love you.
            </p>
          </div>
        </div>
      </main>
    )
  }
);

export function HomeClient() {
  return <LandingExperience />;
}
