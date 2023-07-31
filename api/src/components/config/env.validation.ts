import { plainToClass } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

export class EnvVariables {
  @IsNotEmpty()
  NODE_ENV: string;

  @IsNotEmpty()
  MONGO_URI: string;

  @IsNotEmpty()
  ETHERSCAN_API_HOST: string;
  @IsNotEmpty()
  ETHERSCAN_API_KEY: string;
}

export function validate(config: Record<string, unknown>): EnvVariables {
  const validatedConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
