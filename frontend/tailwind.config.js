/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        dark: {
          bg:            "#0D0D13",   // fond principal — bleu-nuit profond
          surface:       "#13131C",   // cartes / surfaces
          elevated:      "#1A1A25",   // surfaces surélevées (modals, dropdowns)
          text:          "#EEEEF5",   // texte principal ~17:1 AAA ✓
          textSecondary: "#9A9AB0",   // texte secondaire ~8:1 AAA ✓
          border:        "#26263A",   // bordure par défaut
          borderHover:   "#42426A",   // bordure au survol
        },
      },
      boxShadow: {
        card:       "0 1px 4px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
        "card-lg":  "0 4px 12px rgba(0,0,0,0.6), 0 12px 40px rgba(0,0,0,0.4)",
        glow:       "0 0 28px rgba(99,102,241,0.18)",
        "glow-lg":  "0 0 48px rgba(99,102,241,0.28)",
        inner:      "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "surface-shine":   "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in":     "fadeIn 0.25s ease-out both",
        "slide-up":    "slideUp 0.3s ease-out both",
        "scale-in":    "scaleIn 0.2s ease-out both",
        "pulse-slow":  "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34,1.56,0.64,1)",
      },
    },
  },
  plugins: [],
};
