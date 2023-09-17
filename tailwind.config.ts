import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],

  theme: {
    extend: {},
    typography: {
      quoteless: {
        css: {
          "blockquote p:first-of-type::before": { content: "none" },
          "blockquote p:first-of-type::after": { content: "none" },
        },
      },
    },
  },
  plugins: [typography],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;

export default config;
