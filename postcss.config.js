export default {
  plugins: {
    // Tailwind CSS for utility-first styling
    tailwindcss: {},

    // Autoprefixer for adding vendor prefixes automatically
    autoprefixer: {},

    // Optional: Add other plugins if needed, such as PurgeCSS or postcss-nested
    /*
    ...(process.env.NODE_ENV === 'production' && {
      'postcss-purgecss': {
        content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    }),
    */
  },
};