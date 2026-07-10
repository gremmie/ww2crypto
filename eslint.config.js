import eslintConfigPrettier from "eslint-config-prettier/flat";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },
  {
    files: ["src/routes/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // E2E specs must import `test`/`expect` from ./fixtures.ts, not directly
    // from @playwright/test — the fixture stubs window.Audio so the click sound
    // is silenced on WebKit, which has no launch flag to mute audio.
    files: ["e2e/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@playwright/test",
              message:
                'Import { test, expect } from "./fixtures.ts" instead so audio is silenced on WebKit.',
            },
          ],
        },
      ],
    },
  },
  {
    // fixtures.ts is the one place allowed to import @playwright/test directly.
    files: ["e2e/fixtures.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  eslintConfigPrettier,
]);
