import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // SOFTENED DULL LUXURY SYSTEM (EYE-FRIENDLY)
        gold: {
          DEFAULT: '#C9B458', // Dull gold (was #FFD700)
          50: '#F5F3E8',
          100: '#EAE6D1',
          200: '#DED7B4',
          300: '#D3C897',
          400: '#C9B458', // Main accent
          500: '#B3A04F',
          600: '#8F7F3F',
          700: '#6B5F2F',
          800: '#473F1F',
          900: '#23200F',
        },
        pink: {
          DEFAULT: '#C27BA0', // Dull pink (was #FF1493)
          50: '#F5E8F0',
          100: '#EAD1E0',
          200: '#DEAFC7',
          300: '#D395B3',
          400: '#C27BA0', // Main accent
          500: '#AD6D8F',
          600: '#8A5772',
          700: '#674156',
          800: '#442B39',
          900: '#22161D',
        },
        blue: {
          DEFAULT: '#6DAEDB', // Soft blue accent
          50: '#E8F4FA',
          100: '#D1E9F5',
          200: '#AFDAED',
          300: '#8DCBE5',
          400: '#6DAEDB', // Main
          500: '#5D9BC4',
          600: '#4A7C9C',
          700: '#385D75',
          800: '#253E4D',
          900: '#131F27',
        },
        obsidian: {
          DEFAULT: '#151823', // Muted card surface (was #1a1a2e)
          light: '#1B1F2E', // Muted panel
          dark: '#0F1115', // Main background
        },
        deepblack: '#0F1115', // Softer main bg (was #0a0a0a)
        // NEUTRAL GRAYS (SOFTENED)
        border: '#2A2E3F', // Soft border
        input: '#1B1F2E',
        ring: '#C9B458', // Focus ring = dull gold
        background: '#0F1115', // Main bg
        foreground: '#E6E8ED', // Primary text
        primary: {
          DEFAULT: '#C9B458', // Dull gold
          foreground: '#0F1115', // Dark text on gold
        },
        secondary: {
          DEFAULT: '#C27BA0', // Dull pink
          foreground: '#E6E8ED', // Light text on pink
        },
        destructive: {
          DEFAULT: '#B87C7C', // Soft error red
          foreground: '#E6E8ED',
        },
        muted: {
          DEFAULT: '#1B1F2E', // Muted bg
          foreground: '#A7AABD', // Muted text
        },
        accent: {
          DEFAULT: '#6DAEDB', // Soft blue
          foreground: '#E6E8ED',
        },
        success: {
          DEFAULT: '#7FA87F', // Soft success green
          foreground: '#E6E8ED',
        },
        warning: {
          DEFAULT: '#BFA36A', // Soft warning amber
          foreground: '#0F1115',
        },
        popover: {
          DEFAULT: '#151823',
          foreground: '#E6E8ED',
        },
        card: {
          DEFAULT: '#151823',
          foreground: '#E6E8ED',
        },
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #0F1115 0%, #1B1F2E 100%)',
        'gradient-accent': 'linear-gradient(135deg, #C9B458 0%, #C27BA0 100%)',
        'gradient-success': 'linear-gradient(135deg, #7FA87F 0%, #6DAEDB 100%)',
      },
      boxShadow: {
        // SOFTENED 3D BRUTAL SHADOWS
        'brutal': '6px 6px 0px rgba(0, 0, 0, 0.3)',
        'heavy': '5px 5px 0px rgba(0, 0, 0, 0.3)',
        'medium': '3px 3px 0px rgba(0, 0, 0, 0.25)',
        'subtle': '2px 2px 0px rgba(0, 0, 0, 0.2)',
        'gold-brutal': '6px 6px 0px rgba(201, 180, 88, 0.4)',
        'pink-brutal': '6px 6px 0px rgba(194, 123, 160, 0.4)',
        'gold-heavy': '5px 5px 0px rgba(201, 180, 88, 0.35)',
        'pink-heavy': '5px 5px 0px rgba(194, 123, 160, 0.35)',
        'gold-medium': '3px 3px 0px rgba(201, 180, 88, 0.3)',
        'pink-medium': '3px 3px 0px rgba(194, 123, 160, 0.3)',
        'glow-primary': '0 0 20px rgba(201, 180, 88, 0.2)',
        'glow-accent': '0 0 20px rgba(194, 123, 160, 0.2)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
