import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Default rules
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console warnings/errors in dev

      // Development-specific rules
      ...(process.env.NODE_ENV === "development"
        ? {
            "no-debugger": "warn",
            "react/jsx-uses-react": "off",
          }
        : {}),

      // Production-specific rules
      ...(process.env.NODE_ENV === "production"
        ? {
            "no-console": "off", // Disable console warnings/errors in production
            "react/prop-types": "off", // Disable prop-types validation if not needed in prod
          }
        : {}),
    },
  },
];

export default eslintConfig;
