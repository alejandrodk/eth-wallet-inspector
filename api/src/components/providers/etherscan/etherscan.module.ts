import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvObjects, IEnvObjects } from 'src/components/config/env.config';
import { EtherscanService } from './etherscan.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { apiHost } = configService.get<IEnvObjects['EtherscanConfig']>(
          EnvObjects.ETHERSCAN_CONFIG,
        );
        return {
          baseURL: `${apiHost}/`,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EtherscanService],
  exports: [EtherscanService],
})
export class EtherscanModule {}
