import { defineConfig } from "eslint/config";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // 🔥 import sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 0. SIDE EFFECT IMPORTS (dotenv)
            ["^\\u0000"],

            // 1. Node built-in (fs, path)
            ["^node:"],

            // 2. npm paketi
            ["^@?\\w"],

            // 3. alias
            ["^@/"],

            // 4. relative
            ["^\\."],

            // 5. styles
            ["\\.scss$", "\\.css$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
]);
