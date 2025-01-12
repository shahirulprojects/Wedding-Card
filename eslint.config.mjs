import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Disable the unused variables rule for both ESLint and TypeScript
      "no-unused-vars": "off", // Disable base rule
      "@typescript-eslint/no-unused-vars": "off", // Disable TypeScript-specific rule
    },
  }),
];

export default eslintConfig;
