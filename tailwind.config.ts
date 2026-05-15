import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        ink: "#f8f7f5",
        crimson: "#ff2f56",
        ember: "#ff5d52",
        neon: "#ff6ca8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"]
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        pulseGlow: "pulseGlow 5.5s ease-in-out infinite"
      },
      boxShadow: {
        halo: "0 0 35px rgba(255, 61, 110, 0.24), 0 0 110px rgba(255, 41, 94, 0.2)"
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-3%, -4%)" },
          "20%": { transform: "translate(-7%, 2%)" },
          "30%": { transform: "translate(5%, -6%)" },
          "40%": { transform: "translate(-4%, 6%)" },
          "50%": { transform: "translate(-7%, 3%)" },
          "60%": { transform: "translate(6%, 0)" },
          "70%": { transform: "translate(3%, 5%)" },
          "80%": { transform: "translate(-5%, -3%)" },
          "90%": { transform: "translate(4%, 2%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.75", transform: "scale(0.985)" },
          "50%": { opacity: "1", transform: "scale(1.015)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
