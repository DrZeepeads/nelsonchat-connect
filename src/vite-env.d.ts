/// <reference types="vite/client" />

interface Window {
  location: Location;
}

declare global {
  interface GlobalThis {
    location?: Location;
  }
}

export {};