import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvObjects, IEnvObjects } from 'src/components/config/env.config';
import { FreeCurrencyService } from './freeCurrency.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { apiHost, apiKey } = configService.get<
          IEnvObjects['FreeCurrencyConfig']
        >(EnvObjects.FREE_CURRENCY_CONFIG);
        return {
          baseURL: apiHost,
          headers: {
            'Content-Type': 'application/json',
            apikey: apiKey,
          },
          timeout: 5000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [FreeCurrencyService],
  exports: [FreeCurrencyService],
})
export class FreeCurrencyModule {}
