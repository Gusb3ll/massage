import daisyui from 'daisyui'
import defaultTheme from 'daisyui/src/theming/themes'
import { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scenes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        massage: {
          ...defaultTheme.light,
          primary: '#702D0A',
          '.btn': {
            animation: 0,
          },
        },
      },
    ],
  },
} satisfies Config

export default config
