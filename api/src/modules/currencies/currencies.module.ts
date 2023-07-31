import { Module } from '@nestjs/common';
import { EtherscanModule } from 'src/components/providers/etherscan/etherscan.module';
import { CurrenciesController } from './currencies.controllers';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [EtherscanModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesRepository, CurrenciesService],
})
export class CurrenciesModule {}
