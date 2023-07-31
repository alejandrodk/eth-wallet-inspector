export enum EnvObjects {
  APP_CONFIG = 'AppConfig',
  MONGO_CONFIG = 'MongoConfig',
  ETHERSCAN_CONFIG = 'EtherscanConfig',
  FREE_CURRENCY_CONFIG = 'FreeCurrencyConfig',
}

export interface IEnvObjects {
  [EnvObjects.APP_CONFIG]: {
    port: number;
  };
  [EnvObjects.MONGO_CONFIG]: {
    uri: string;
  };
  [EnvObjects.ETHERSCAN_CONFIG]: {
    apiHost: string;
    apiKey: string;
  };
  [EnvObjects.FREE_CURRENCY_CONFIG]: {
    apiHost: string;
    apiKey: string;
  };
}

export const envConfiguration = (
  processEnv: Record<string, string>,
): IEnvObjects => ({
  [EnvObjects.APP_CONFIG]: {
    port: parseInt(processEnv.PORT, 10) || 3000,
  },
  [EnvObjects.MONGO_CONFIG]: {
    uri: processEnv.MONGO_URI,
  },
  [EnvObjects.ETHERSCAN_CONFIG]: {
    apiHost: processEnv.ETHERSCAN_API_HOST,
    apiKey: processEnv.ETHERSCAN_API_KEY,
  },
  [EnvObjects.FREE_CURRENCY_CONFIG]: {
    apiHost: processEnv.FREE_CURRENCY_API_HOST,
    apiKey: processEnv.FREE_CURRENCY_API_KEY,
  },
});
