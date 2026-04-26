import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    plugins: ["typescript", "react", "import", "nextjs"],
    categories: {},
    env: {
      builtin: true,
    },
    settings: {
      react: {
        version: "19.2.5",
      },
      tailwindcss: {
        callees: ["clsx", "cva", "cn"],
      },
    },
    ignorePatterns: ["node_modules/", "dist/"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
