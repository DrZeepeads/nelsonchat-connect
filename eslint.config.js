import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "*.config.js", "*.test.js"], // Added test files to ignores
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        serviceWorker: true,
        process: true, // Add Node.js process global
        module: true, // Add Node.js module global
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": [
        "warn",
        { allow: ["warn", "error"] }, // Allow console.warn and console.error
      ],
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-restricted-globals": [
        "error",
        {
          name: "self",
          message: "Use 'self' carefully in service workers to avoid scope issues.",
        },
      ],
      "no-var": "error", // Enforce let/const instead of var
      "prefer-const": "warn", // Suggest using const where possible
      "arrow-body-style": ["warn", "as-needed"], // Enforce concise arrow function bodies
    },
  }
);