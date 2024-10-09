import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import animate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme: (prop: string) => string) => ({
        terminal: {
          css: {
            color: theme("colors.green.500"),
            backgroundColor: theme("colors.black"),
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.green.400"),
            },
            a: {
              color: theme("colors.green.400"),
              "&:hover": {
                color: theme("colors.green.300"),
              },
            },
            code: {
              color: theme("colors.green.300"),
              backgroundColor: theme("colors.black"),
              padding: "2px 4px",
              borderRadius: theme("borderRadius.lg"),
            },
            pre: {
              color: theme("colors.green.300"),
              backgroundColor: theme("colors.gray.900"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              color: theme("colors.green.300"),
            },
            strong: {
              color: theme("colors.green.500"),
            },
            blockquote: {
              color: theme("colors.green.200"),
              borderLeftColor: theme("colors.green.500"),
            },
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
}
export default config
