import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        child: {
          primary: "#6366f1",
          secondary: "#ec4899",
          accent: "#f59e0b",
          bg: "#fefce8",
        },
        parent: {
          primary: "#1e293b",
          secondary: "#475569",
          accent: "#0ea5e9",
          bg: "#f8fafc",
        },
      },
      fontFamily: {
        child: ["Nunito", "system-ui", "sans-serif"],
        parent: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        pop: "pop 0.3s ease-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
