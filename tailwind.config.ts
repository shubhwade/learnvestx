import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Pure black/white system like FacilPay
        background: "#000000",
        foreground: "#FFFFFF",
        muted: "#999999",
        "muted-dark": "#666666",
        accent: "#3B82F6",
        "accent-hover": "#2563EB",
        success: "#10B981",
        error: "#EF4444",
        border: "#1a1a1a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["18px", { lineHeight: "28px" }],
        lg: ["20px", { lineHeight: "32px" }],
        xl: ["24px", { lineHeight: "36px" }],
        "2xl": ["32px", { lineHeight: "40px" }],
        "3xl": ["40px", { lineHeight: "48px" }],
        "4xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em" }],
        "5xl": ["72px", { lineHeight: "80px", letterSpacing: "-0.02em" }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    }
  },
  plugins: []
};

export default config;
