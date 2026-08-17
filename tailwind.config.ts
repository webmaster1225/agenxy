import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#010101",
        mute: "#a8a5a5",
        paper: "#f7f0f0",
        snow: "#ffffff",
        ember: "#f57445",
        blood: "#910a0a",
        mist: "#bfbfbf",
        lime: "#81ff28",
        night: "#050609",
        footer: "#2d3134",
      },
      fontFamily: {
        display: ["var(--font-antonio)", "sans-serif"],
        koulen: ["var(--font-koulen)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        display: "-6px",
      },
    },
  },
  plugins: [],
};

export default config;
