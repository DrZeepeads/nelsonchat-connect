export default {
  plugins: {
    // Tailwind CSS for utility-first styling
    tailwindcss: {},

    // Autoprefixer for adding vendor prefixes automatically
    autoprefixer: {},

    // Conditional PurgeCSS plugin for production to remove unused CSS
    ...(process.env.NODE_ENV === 'production' && {
      '@fullhuman/postcss-purgecss': {
        content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'], // Files to scan for class usage
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [], // CSS class extraction
        safelist: ['html', 'body'], // Prevent purging of key elements
      },
    }),
  },
};