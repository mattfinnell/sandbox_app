import { defineConfig } from "../defineConfig";

export const createLocalConfig = () => {
  return defineConfig({
    apiURL: "http://localhost:8000",
  });
};
