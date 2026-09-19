import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'gothic': ['Cinzel', 'serif'],
				'ancient': ['Crimson Text', 'serif'],
				'mystical': ['UnifrakturMaguntia', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				ornament: 'hsl(var(--ornament))',
				parchment: 'hsl(var(--parchment))',
				'ancient-text': 'hsl(var(--ancient-text))',
				'mystical-glow': 'hsl(var(--mystical-glow))',
				'shadow-deep': 'hsl(var(--shadow-deep))'
			},
			backgroundImage: {
				'gradient-mystical': 'var(--gradient-mystical)',
				'gradient-ancient': 'var(--gradient-ancient)',
			},
			boxShadow: {
				'ornament': 'var(--shadow-ornament)',
				'mystical': 'var(--shadow-mystical)',
			},
			transitionTimingFunction: {
				'mystical': 'var(--transition-mystical)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Vrana prileti od leve zgoraj in se umiri na svojem mestu
				'vrana-prilet': {
					'0%': { opacity: '0', transform: 'translate(-60vw, -30vh) rotate(-18deg) scale(0.5)' },
					'60%': { opacity: '1', transform: 'translate(12px, 8px) rotate(4deg) scale(1.04)' },
					'100%': { opacity: '1', transform: 'translate(0, 0) rotate(0) scale(1)' }
				},
				'vrana-lebdi': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'prikazi': {
					from: { opacity: '0', transform: 'translateY(12px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'vrana-prilet': 'vrana-prilet 1.8s cubic-bezier(0.22, 1, 0.36, 1) both',
				'vrana-lebdi': 'vrana-lebdi 4s ease-in-out 2.4s infinite',
				'prikazi': 'prikazi 0.9s ease-out both'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
