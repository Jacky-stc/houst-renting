import { defineConfig } from "vitest/config";
// const defineConfig = require("vitest/config");
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
