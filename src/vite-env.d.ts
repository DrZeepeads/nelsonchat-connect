/// <reference types="vite/client" />

// Define environment variables available in the project
interface ImportMetaEnv {
  /** The application title used in the browser tab or elsewhere */
  readonly VITE_APP_TITLE: string;

  /** Toggle the dark mode feature (can be 'true', 'false', or a boolean for better DX) */
  readonly VITE_ENABLE_DARK_MODE: 'true' | 'false' | boolean;

  /** The base API URL for backend communication */
  readonly VITE_API_URL: string;

  /** Example: A secret key for authentication or other sensitive tasks */
  readonly VITE_SECRET_KEY: string;

  // Add more env variables as needed
}

// Define the import.meta object, which holds environment variables
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend the Window interface to include custom properties or methods
interface Window {
  /** Location object */
  location: Location;

  /** Example: Extend window object with a custom method */
  customMethod?: () => void;

  /** Example: A custom global variable (e.g., for feature toggles) */
  customProperty?: string | number | boolean;

  /** Add any other custom properties or methods to the window object */
}