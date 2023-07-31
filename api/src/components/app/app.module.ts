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
    EtherscanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
