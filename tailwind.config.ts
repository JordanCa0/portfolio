import type { Config } from 'tailwindcss';

// Palette values live in src/index.css as CSS variables (:root = light, .dark = dark)
// so the same utility classes work in both themes. No hardcoded hex in components.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        desktop: 'var(--color-desktop)',
        glass: 'var(--color-glass)',
        chrome: 'var(--color-chrome)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          soft: 'var(--color-accent-soft)',
          contrast: 'var(--color-accent-contrast)',
        },
        body: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
        edge: 'var(--color-border)',
        'snap-preview': 'color-mix(in srgb, var(--color-accent) 25%, transparent)',
        term: {
          green: '#6fbf73',
          pink: '#d4889a',
          amber: '#e0a23c',
          close: '#c0392b',
          max: '#4caf6e',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
