import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Ignore files or directories
    ignores: ["dist", "node_modules", "*.config.js"],
  },
  {
    // Extend recommended configurations
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"], // Apply rules to TypeScript files
    languageOptions: {
      ecmaVersion: 2022, // Latest ECMAScript features (optional chaining, nullish coalescing)
      sourceType: "module", // Support ES Modules
      globals: {
        ...globals.browser, // Use browser-specific global variables
        serviceWorker: true, // Add service worker globals
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hooks rules
      "react-refresh/only-export-components": [
        "warn", // Warn for invalid component exports in Fast Refresh
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn", // Enable unused variable checks with warnings
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }, // Allow unused variables prefixed with "_"
      ],
      "no-console": "warn", // Warn for console.log (useful in production-ready code)
      "no-debugger": "error", // Disallow debugger statements
      "eqeqeq": ["error", "always"], // Enforce strict equality
      "curly": ["error", "all"], // Require braces for all control statements
      "no-restricted-globals": [
        "error",
        {
          name: "self",
          message: "Use 'self' carefully in service workers to avoid scope issues.",
        },
      ],
    },
  }
);
