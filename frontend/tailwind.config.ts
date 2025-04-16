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
            100: 'var(--color-gray-100)',
            200: 'var(--color-gray-200)',
            300: 'var(--color-gray-300)',
            400: 'var(--color-gray-400)',
            500: 'var(--color-gray-500)',
            600: 'var(--color-gray-600)',
            700: 'var(--color-gray-700)',
            800: 'var(--color-gray-800)',
          },
          blue: {
            400: 'var(--color-blue-400)',
            500: 'var(--color-blue-500)',
          },
          green: {
            500: 'var(--color-green-500)',
          },
          yellow: {
            500: 'var(--color-yellow-500)',
          },
          red: {
            500: 'var(--color-red-500)',
          },
        },
      },
    },
    plugins: [],
  } satisfies Config
   