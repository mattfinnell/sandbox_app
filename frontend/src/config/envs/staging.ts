import { defineConfig } from "../defineConfig";

export const createStagingConfig = () => {
  return defineConfig({
    apiURL: "https://host.docker.internal:8000",
  });
};
