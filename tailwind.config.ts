import animate from "tailwindcss-animate";
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: ["class"],
    safelist: ["dark"],
    prefix: "",

    content: [],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            }
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                border: "var(--border)",
                incoming: "var(--incoming)",
                toBeAgreed: "var(--toBeAgreed)",
                inProgress: "var(--in-progress)",
                produced: "var(--produced)",
                done: "var(--done)"
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
            }
        },
    },

    plugins: [animate]
};