/// <reference types="vite/client" />

// Define the environment variables available in the project
interface ImportMetaEnv {
  /** The application title to be used in the browser tab or elsewhere */
  readonly VITE_APP_TITLE: string;
  
  // Add more env variables as needed
  /** A flag to toggle the dark mode feature */
  readonly VITE_ENABLE_DARK_MODE: 'true' | 'false';
  
  /** The API URL for backend communication */
  readonly VITE_API_URL: string;
  
  /** Example: A secret key for authentication or other sensitive tasks */
  readonly VITE_SECRET_KEY: string;
}

// Define the import.meta object, which holds the environment variables
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extending the Window interface to include custom properties
interface Window {
  location: Location;
  
  // Example: Extend window object with a custom method
  customMethod?: () => void;

  // Add any other custom properties or methods to the window object
}