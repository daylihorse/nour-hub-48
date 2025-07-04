
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
				brown: {
					50: 'hsl(30, 20%, 96%)',
					100: 'hsl(30, 15%, 90%)',
					200: 'hsl(30, 20%, 82%)',
					300: 'hsl(28, 40%, 75%)',
					400: 'hsl(28, 40%, 65%)',
					500: 'hsl(25, 47%, 35%)',
					600: 'hsl(25, 47%, 30%)',
					700: 'hsl(25, 47%, 25%)',
					800: 'hsl(25, 47%, 20%)',
					900: 'hsl(25, 47%, 15%)',
				}
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
				'gentle-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 4px 14px 0 hsla(25, 47%, 35%, 0.15)'
					},
					'50%': {
						transform: 'scale(1.02)',
						boxShadow: '0 10px 25px -3px hsla(25, 47%, 35%, 0.2)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite'
			},
			boxShadow: {
				'brown': '0 4px 14px 0 hsla(25, 47%, 35%, 0.15)',
				'brown-lg': '0 10px 25px -3px hsla(25, 47%, 35%, 0.2), 0 4px 6px -2px hsla(25, 47%, 35%, 0.1)',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: { addUtilities: any }) {
			const newUtilities = {
				'.rtl': {
					direction: 'rtl',
				},
				'.ltr': {
					direction: 'ltr',
				},
				'.text-start': {
					'text-align': 'start',
				},
				'.text-end': {
					'text-align': 'end',
				},
				'.float-start': {
					float: 'inline-start',
				},
				'.float-end': {
					float: 'inline-end',
				},
				'.clear-start': {
					clear: 'inline-start',
				},
				'.clear-end': {
					clear: 'inline-end',
				},
				'.ms-auto': {
					'margin-inline-start': 'auto',
				},
				'.me-auto': {
					'margin-inline-end': 'auto',
				},
				'.ps-2': {
					'padding-inline-start': '0.5rem',
				},
				'.pe-2': {
					'padding-inline-end': '0.5rem',
				},
				'.ps-3': {
					'padding-inline-start': '0.75rem',
				},
				'.pe-3': {
					'padding-inline-end': '0.75rem',
				},
				'.ps-4': {
					'padding-inline-start': '1rem',
				},
				'.pe-4': {
					'padding-inline-end': '1rem',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
