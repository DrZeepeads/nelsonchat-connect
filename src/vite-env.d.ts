/// <reference types="vite/client" />

interface Window {
  location: Location;
}

declare global {
  var location: Location | undefined;
  interface GlobalThis {
    location?: Location;
  }
}

export {};