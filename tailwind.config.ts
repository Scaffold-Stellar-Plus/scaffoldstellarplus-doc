import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            '[class~="lead"]': {
              color: 'hsl(var(--muted-foreground))',
            },
            a: {
              color: '#9333ea',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            'ol > li': {
              position: 'relative',
            },
            'ol > li::before': {
              content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
              position: 'absolute',
              fontWeight: '400',
              color: 'hsl(var(--muted-foreground))',
            },
            'ul > li': {
              position: 'relative',
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: 'hsl(var(--muted-foreground))',
              borderRadius: '50%',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
              borderTopWidth: 1,
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'hsl(var(--foreground))',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#9333ea',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            h1: {
              color: 'hsl(var(--foreground))',
              fontWeight: '800',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h4: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            'figure figcaption': {
              color: 'hsl(var(--muted-foreground))',
            },
            code: {
              color: '#9333ea',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            'a code': {
              color: '#9333ea',
            },
            pre: {
              color: '#f8fafc',
              backgroundColor: '#0f172a',
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              padding: '1rem 1.25rem',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.75rem',
              border: '1px solid hsl(var(--border))',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            thead: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
              borderBottomWidth: '1px',
              borderBottomColor: 'hsl(var(--border))',
            },
            'thead th': {
              verticalAlign: 'bottom',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'hsl(var(--border))',
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              verticalAlign: 'baseline',
            },
            tfoot: {
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.875em',
            },
            'tfoot td': {
              verticalAlign: 'top',
            },
            'tbody td, tfoot td': {
              paddingTop: '0.5714286em',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
          },
        },
        invert: {
          css: {
            color: 'hsl(var(--foreground))',
            '[class~="lead"]': {
              color: 'hsl(var(--muted-foreground))',
            },
            a: {
              color: '#a855f7',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            'ol > li::before': {
              color: 'hsl(var(--muted-foreground))',
            },
            'ul > li::before': {
              backgroundColor: 'hsl(var(--muted-foreground))',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            blockquote: {
              color: 'hsl(var(--foreground))',
              borderLeftColor: '#a855f7',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            'figure figcaption': {
              color: 'hsl(var(--muted-foreground))',
            },
            code: {
              color: '#a855f7',
            },
            'a code': {
              color: '#a855f7',
            },
            pre: {
              color: '#e2e8f0',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
            },
            thead: {
              color: 'hsl(var(--foreground))',
              borderBottomColor: 'hsl(var(--border))',
            },
            'tbody tr': {
              borderBottomColor: 'hsl(var(--border))',
            },
            tfoot: {
              color: 'hsl(var(--muted-foreground))',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
