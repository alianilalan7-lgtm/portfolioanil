import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The brutalist/terminal design uses "//" as an intentional UI label prefix
      // (e.g. `// SYSTEM_INFO`, `[03] // PROJECTS`) rendered as visible text, not as
      // JS comments. This rule misreads that motif as a stray comment, so disable it.
      "react/jsx-no-comment-textnodes": "off",
    },
  },
]);

export default eslintConfig;
