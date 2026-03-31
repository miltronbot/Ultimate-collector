import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#0f1117",
        lane: "#6366f1",
        partner: "#0ea5e9",
      },
    },
  },
  plugins: [],
};
export default config;
