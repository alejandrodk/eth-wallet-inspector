import { Module } from '@nestjs/common';
import { EtherscanModule } from 'src/components/providers/etherscan/etherscan.module';
import { CurrenciesController } from './currencies.controllers';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesService } from './currencies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './database/currency.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
    EtherscanModule,
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesRepository, CurrenciesService],
})
export class CurrenciesModule {}
