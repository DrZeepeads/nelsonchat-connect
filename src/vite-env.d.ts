/// <reference types="vite/client" />

interface Location {
  origin: string;
}

interface Window {
  location: Location;
}

declare global {
  var location: Location | undefined;
}

export {};