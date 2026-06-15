import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#0B0B0F",
        smoke: "#18181B",
        ember: "#B91C1C",
        flame: "#F97316",
        gold: "#FACC15",
        bone: "#FAFAF9",
      },
      boxShadow: {
        glow: "0 18px 60px rgba(249, 115, 22, 0.18)",
        "inner-ember": "inset 0 1px 0 rgba(250, 250, 249, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
