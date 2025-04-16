import type { Config } from "tailwindcss"

export default {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            100: '#EAEAEA',
            200: '#A0A0A0',
            300: '#787878',
            400: '#545454',
            500: '#383848',
            600: '#2C2C3A',
            700: '#1E1E2A',
            800: '#14141F',
          },
          blue: {
            400: '#60A5FA',
            500: '#3B82F6',
          },
          green: {
            500: '#10B981',
          },
          yellow: {
            500: '#FBBF24',
          },
          red: {
            500: '#EF4444',
          },
        },
      },
    },
    plugins: [],
  } satisfies Config
   