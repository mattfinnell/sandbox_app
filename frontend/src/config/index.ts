import { createLocalConfig } from "./envs/local";
import { createProdConfig } from "./envs/prod";
import { createStagingConfig } from "./envs/staging";

export const getConfig = () => {
  switch (process.env.REACT_APP_ENV) {
    case "production":
      return createProdConfig();
    case "staging":
      return createStagingConfig();
    case "local":
      return createLocalConfig();
    default:
      throw new Error(`Invalid APP_ENV "${process.env.APP_ENV}"`);
  }
};
