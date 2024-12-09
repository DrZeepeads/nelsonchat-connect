import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(({ mode }) => ({
  // Server configuration for development
  server: {
    port: 8080, // Development server will run on port 8080
    host: "::", // Allow binding to IPv6 and IPv4
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Redirect API calls to backend
        changeOrigin: true,
      },
    },
  },

  // Plugins for Vite
  plugins: [
    react(), // Enable React support with JSX
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      devOptions: {
        enabled: true, // Enable PWA during development
      },
      manifest: {
        name: "Nelsonbot",
        short_name: "Nelsonbot",
        description: "AI-powered chat assistant for pediatricians and students.",
        theme_color: "#1E40AF", // Theme color for the PWA
        background_color: "#ffffff", // Background color for the splash screen
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.origin === self.location.origin; // Cache resources from the same origin
            },
            handler: "CacheFirst", // Serve static resources from the cache
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.telegram\.org\//, // Cache requests to Telegram API
            handler: "NetworkFirst", // Try network first, fallback to cache
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10, // Timeout after 10 seconds
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
        ],
      },
    }),
  ],

  // Resolve module aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut to `src` directory
    },
  },
}));