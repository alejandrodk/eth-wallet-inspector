import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenvFlow from 'dotenv-flow';
import * as dotenv from 'dotenv';
import {
  EnvObjects,
  IEnvObjects,
  envConfiguration,
} from '../config/env.config';
import { validate } from '../config/env.validation';
import { EtherscanModule } from '../providers/etherscan/etherscan.module';
import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrenciesModule } from 'src/modules/currencies/currencies.module';
import { FreeCurrencyModule } from '../providers/freeCurrency/freeCurrency.module';

dotenv.config();
dotenvFlow.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => envConfiguration(process.env)],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { uri } = configService.get<IEnvObjects['MongoConfig']>(
          EnvObjects.MONGO_CONFIG,
        );
        return { uri };
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    EtherscanModule,
    FreeCurrencyModule,
    WalletsModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
